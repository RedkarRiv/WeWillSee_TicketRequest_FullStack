'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    category_name: DataTypes.STRING,
    FAQ_id: DataTypes.INTEGER,
    theme_id: DataTypes.INTEGER,
    category_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false,
  });
  return Category;
};