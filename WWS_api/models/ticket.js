'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Ticket.belongsTo(models.SAT, { foreignKey: "SAT_assigned"});
      Ticket.belongsTo(models.User, { foreignKey: "requester"});
      Ticket.belongsTo(models.Category, { foreignKey: "ticket_category_id"});
      Ticket.hasMany(models.Message, { foreignKey: "ticket_id"});

    }
        
        
  }
  Ticket.init({
    ticket_title: DataTypes.STRING,
    ticket_description: DataTypes.STRING,
    requester: DataTypes.INTEGER,
    SAT_assigned: DataTypes.INTEGER,
    ticket_category_id: DataTypes.INTEGER,
    ticket_status: DataTypes.INTEGER,
    ticket_timeline: DataTypes.DATEONLY,
    reassigned: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};