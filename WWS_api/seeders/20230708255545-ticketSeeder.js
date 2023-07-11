"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tickets", [
      {
        id: 1,
        requester: 1,
        SAT_assigned: 1,
        ticket_category_id: 1,
        comments_id: 1,
        ticket_status: "Active",
        ticket_timeline: new Date(),
        reassigned: "No",
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
