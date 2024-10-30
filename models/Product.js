const { Model } = require("objection");
const jwt = require("jsonwebtoken");

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const Category = require("./Category");
    const Brand = require("./Brand");
    const User = require("./User");

    return {
      brands: {
        relation: Model.BelongsToOneRelation,
        filter: (query) => query.select("id","name"),
        modelClass: Brand,
        join: {
          from: "products.brand",
          to: "brands.id",
        },
      },
      categories: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        filter: (query) => query.select("id","name"),
        join: {
          from: "products.category",
          to: "categories.id",
        },
      },
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        filter: (query) => query.select("*"),
        join: {
          from: "products.user_id",
          to: "users.user_id",
        },
      },
    };
  }
}

module.exports = Product;
