'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
      id: 1,
      name: 'Requester Demo',
      email: 'user@user.com',
      password: '$2b$08$kFBKlQrIu2lZ6W6LJ1mR/.yVJLxQD2G6V/BJnNrhwcn9/DRSwlW7C',
      password_validation: true,
      role_id: 1,
      user_status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'SAT Demo',
      email: 'sat@sat.com',
      password: '$2b$08$kFBKlQrIu2lZ6W6LJ1mR/.yVJLxQD2G6V/BJnNrhwcn9/DRSwlW7C',
      password_validation: true,
      role_id: 2,
      user_status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Admin Demo',
      email: 'admin@admin.com',
      password: '$2b$08$kFBKlQrIu2lZ6W6LJ1mR/.yVJLxQD2G6V/BJnNrhwcn9/DRSwlW7C',
      password_validation: true,
      role_id: 3,
      user_status: "Active",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    'Users', null, {}
  }
};
