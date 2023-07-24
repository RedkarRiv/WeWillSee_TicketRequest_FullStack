"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tickets", [
      {
        id: 1,
        ticket_title: "Esto es el titulo del ticket",
        ticket_description: "Esto es la descripción del ticket",
        requester: 1,
        SAT_assigned: 1,
        ticket_category_id: 1,
        ticket_status: 1,
        ticket_timeline: new Date(),
        reassigned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        ticket_title: "Esto es el titulo del ticket",
        ticket_description: "Esto es la descripción del ticket",
        requester: 1,
        SAT_assigned: 2,
        ticket_category_id: 1,
        ticket_status: 2,
        ticket_timeline: new Date(),
        reassigned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        ticket_title: "Esto es el titulo del ticket",
        ticket_description: "Esto es la descripción del ticket",
        requester: 1,
        SAT_assigned: 2,
        ticket_category_id: 1,
        ticket_status: 3,
        ticket_timeline: new Date(),
        reassigned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        ticket_title: "Esto es el titulo del ticket",
        ticket_description: "Esto es la descripción del ticket",
        requester: 1,
        SAT_assigned: 2,
        ticket_category_id: 1,
        ticket_status: 1,
        ticket_timeline: new Date(),
        reassigned: false,
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
