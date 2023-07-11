'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SAT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SAT.belongsTo(models.User, { foreignKey: "user_id", targetKey: "id" });
    }
  }
  SAT.init({
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SAT',
  });
  return SAT;
};