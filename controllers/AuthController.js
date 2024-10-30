const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmailQueue = require("../helpers/mailer/sendOTP");

exports.sendOTP = async (req, res) => {
  try {
    const emailCheck = await User.query().select('*').where('email', req.body.email);
    if (emailCheck.length > 0) {
      res.json({
        success:false,
        message:'User already exist'
      })
    }
    else{
    const otp = Math.floor(100000 + Math.random() * 900000);
    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${req.body.email}.${otp}.${expires}`;
    const hash = crypto
      .createHmac("sha256", process.env.MY_SECRET_KEY)
      .update(data)
      .digest("hex");
    const fullHash = `${hash}.${expires}`;
    const fullData = { email: req.body.email, otp: otp };

    try {
      await sendEmailQueue.push(fullData);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        success: true,
        user: req.body,
        hash: fullHash,
      });
    } catch (error) {
      console.error(error);
    }
  }
  } catch (error) {
    console.error(error);
  }
};

exports.verifyOTP = async (req, res) => {
  try {

    let [hashValue, expires] = req.body.hash.split('.');
    let now = Date.now();

    if (now > parseInt(expires)) {
      res.json({
        success: false,
        message:'OTP is expires please try again'
      });
    }
    else{
      const data = `${req.body.email}.${req.body.otp}.${expires}`
      const newHash = crypto.createHmac('sha256', process.env.MY_SECRET_KEY).update(data).digest('hex')
      if (newHash === hashValue) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        let data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          contact: req.body.contact,
          password: hashedPassword,
        }
        const result = await User.query().insert(data);
        if (result) {
          const authToken = result.generateAuthToken(result.user_id);
          res.json({
            success:true,
            users:result,
            authToken,
            message:"New User Created"
          })
        }
        else{
          res.json({
            success:false,
            message:"something went wrong"
          })
        }
        
      }
      else{
        res.json({
          success:false,
          message:"not verified"
        })
      }

    }

  } catch (error) {
    console.error(error);
  }
};

exports.login = async (req, res) => {
  try {
    const query = await User.query()
      .select("user_id", "contact", "firstname", "lastname", "password")
      .where("contact", req.body.contact);
    const user = query[0];
    if (!user) {
      res.status(200).json({ success: false, message: "User not found" });
    } else {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const authToken = user.generateAuthToken(user.user_id);
        const userData = {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
        };
        res.status(200).json({
          success: true,
          message: "Login Successful",
          authToken,
          user: userData,
        });
      } else {
        res
          .status(200)
          .json({ success: false, message: "Invalid login. Please try again" });
      }
    }
  } catch (error) {}
};
