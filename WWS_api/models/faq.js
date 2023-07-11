'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FAQ extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FAQ.hasOne(models.Category, { foreignKey: "id"});
    }
  }
  FAQ.init({
    category_id: DataTypes.INTEGER,
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    FAQ_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FAQ',
    timestamps: false,

  });
  return FAQ;
};