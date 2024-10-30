const { Model } = require('objection')
const jwt = require('jsonwebtoken')

class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return 'user_id'
  }

  static get relationMappings() {
    const Product = require("./Product");

    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "users.user_id",
          to: "products.user_id",
        },
      },
    };
  }

  generateAuthToken(userId) {
    return jwt.sign({ ak: userId }, process.env.MY_SECRET_KEY)
  }
  
}

module.exports = User
