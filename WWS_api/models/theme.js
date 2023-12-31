'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Theme.hasMany(models.Category, { foreignKey: "theme_id"});
    }
  }
  Theme.init({
    theme_name: DataTypes.STRING,
    theme_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Theme',
    timestamps: false,
  });
  return Theme;
};