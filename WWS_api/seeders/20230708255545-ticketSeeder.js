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
        SAT_assigned: 1,
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
      {
        id: 5,
        ticket_title: "Esto es el titulo del ticket 5",
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
        id: 6,
        ticket_title: "Esto es el titulo del ticket 6",
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
      {
        id: 7,
        ticket_title: "Esto es el titulo del ticket 7",
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
        id: 8,
        ticket_title: "Esto es el titulo del ticket 8",
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
      {
        id: 9,
        ticket_title: "Esto es el titulo del ticket 9",
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
        id: 10,
        ticket_title: "Esto es el titulo del ticket 10",
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

      {
        id: 11,
        ticket_title: "Esto es el titulo del ticket 11",
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
        id: 12,
        ticket_title: "Esto es el titulo del ticket 12",
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
      


      {
        id: 13,
        ticket_title: "Esto es el titulo del ticket 13",
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
      


      {
        id: 14,
        ticket_title: "Esto es el titulo del ticket 14",
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
