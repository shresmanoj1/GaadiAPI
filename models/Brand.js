const { Model } = require("objection");
const jwt = require("jsonwebtoken");

class Category extends Model {
  static get tableName() {
    return "brands";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const Product = require("./Product");
    const Category = require("./Category");

    return {
      categories: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        filter: (query) => query.select("id","name"),
        join: {
          from: "brands.category",
          to: "categories.id",
        },
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: "brands.id",
          to: "products.brand",
        },
      },
    };
  }
}

module.exports = Category;
