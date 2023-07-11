'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SATs', [
      {
      id: 1,
      user_id: 2,
      sat_status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
  },
]);
},

  async down (queryInterface, Sequelize) {
    'SATs', null, {}

  }
};
