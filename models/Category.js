const { Model } = require("objection");
const jwt = require("jsonwebtoken");

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const Product = require("./Product");
    const Brand = require("./Brand");

    return {
      brands: {
        relation: Model.HasManyRelation,
        modelClass: Brand,
        join: {
          from: "categories.id",
          to: "brands.category",
        },
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "categories.id",
          to: "products.brand",
        },
      },
    };
  }
}

module.exports = Category;
