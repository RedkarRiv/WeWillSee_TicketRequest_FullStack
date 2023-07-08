'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Template.init({
    user_id: DataTypes.INTEGER,
    template_title: DataTypes.STRING,
    template_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Template',
  });
  return Template;
};