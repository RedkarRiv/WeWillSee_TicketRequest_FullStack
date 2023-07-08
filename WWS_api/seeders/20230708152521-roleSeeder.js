'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [
      {
      id: 1,
      role_name: 'Requester',
    },
    {
      id: 2,
      role_name: 'SAT',
    },
    {
      id: 3,
      role_name: 'Admin',
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    'Roles', null, {}

  }
};
