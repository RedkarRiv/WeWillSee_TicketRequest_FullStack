"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("TicketStatuses", [
      {
        id: 1,
        status_name: "En proceso",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        status_name: "Cerrada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        status_name: "Anulada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
