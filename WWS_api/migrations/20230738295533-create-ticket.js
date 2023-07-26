"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ticket_title: {
        type: Sequelize.STRING,
      },
      ticket_description: {
        type: Sequelize.TEXT,
      },
      requester: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      SAT_assigned: {
        type: Sequelize.INTEGER,
        references: {
          model: "SATs",
          key: "id",
        },
      },
      ticket_category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      ticket_status: {
        type: Sequelize.INTEGER,
        references: {
          model: "TicketStatuses",
          key: "id",
        },
      },
      ticket_timeline: {
        type: Sequelize.DATEONLY,
      },
      reassigned: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tickets");
  },
};
