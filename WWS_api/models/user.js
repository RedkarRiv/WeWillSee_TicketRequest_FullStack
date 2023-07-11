'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: "role_id", targetKey: "id" });

    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    password_validation: DataTypes.BOOLEAN,
    role_id: DataTypes.INTEGER,
    user_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};