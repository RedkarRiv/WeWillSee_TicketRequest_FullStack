'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Messages", [
      {
        id: 1,
        ticket_id: 1,
        comment_user_id: 1,
        message_content: "Esto es un comentario del Requesters",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        ticket_id: 1,
        comment_user_id: 2,
        message_content: "Esto es un comentario del SAT",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
