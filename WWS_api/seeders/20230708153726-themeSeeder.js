'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Themes', [
      {
      id: 1,
      theme_name: 'Marketing',
      theme_status: "Active",
    },
    {
      id: 2,
      theme_name: 'Sistemas',
      theme_status: "Active",

    },      {
      id: 3,
      theme_name: 'Comercial',
      theme_status: "Active",

    },
    {
      id: 4,
      theme_name: 'Proveedores',
      theme_status: "Active",
    },
    {
      id: 5,
      theme_name: 'Logística',
      theme_status: "Active",

    },      {
      id: 6,
      theme_name: 'RRHH',
      theme_status: "Active",

    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    'Themes', null, {}

  }
};
