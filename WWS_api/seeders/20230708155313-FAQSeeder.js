"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("FAQs", [
      {
        id: 1,
        category_id: 1,
        question: "Esto es una pregunta 1",
        answer: "Esto es la respuesta 1",
        FAQ_status: "Active",
      },
      {
        id: 2,
        category_id: 1,
        question: "Esto es una pregunta 2",
        answer: "Esto es la respuesta 2",
        FAQ_status: "Active",
      },
      {
        id: 3,
        category_id: 1,
        question: "Esto es una pregunta 3",
        answer: "Esto es la respuesta 3",
        FAQ_status: "Active",
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
