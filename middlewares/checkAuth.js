const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.checkAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.substring(7)
      const decoded = jwt.verify(token, process.env.MY_SECRET_KEY)
      const query = await User.query().select('user_id', 'firstname', 'lastname', 'email', 'contact').where('user_id', decoded.ak)
      const authUser = query[0]
      if (!authUser) {
        res.status(404).json({ success: false, error: 'User not found' })
      } else {
        req.token = token
        req.authUser = authUser
        next()
      }
    } catch (error) {
      res.status(401).json({ success: false, error: 'Access token missing' })
    }
  } else {
    res.status(401).json({ success: false, error: 'Access token missing' })
  }
}
