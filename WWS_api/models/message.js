'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.Ticket, { foreignKey: "ticket_id"});
      Message.belongsTo(models.User, { foreignKey: "comment_user_id"});

    }
  }
  Message.init({
    ticket_id: DataTypes.INTEGER,
    comment_user_id: DataTypes.INTEGER,
    message_content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};