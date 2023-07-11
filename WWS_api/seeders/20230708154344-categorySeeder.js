'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
      id: 1,
      category_name: 'Marketing APPs',
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 2,
      category_name: 'Promotions',
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 3,
      category_name: 'Marketing Resources',
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 4,
      category_name: 'System Security',
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 5,
      category_name: 'Desktop Problem',
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 6,
      category_name: 'Conexion Issues',
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 7,
      category_name: 'Price',
      theme_id: 3,
      category_status: "Active"
    },
    {
      id: 8,
      category_name: 'Legal',
      theme_id: 3,
      category_status: "Active"
    },
    {
      id: 9,
      category_name: 'Suppliers',
      theme_id: 3,
      category_status: "Active"
    },


  ]);
  },

  async down (queryInterface, Sequelize) {
    'Categories', null, {}
  }
};
