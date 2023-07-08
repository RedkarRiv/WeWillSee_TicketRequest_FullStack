'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
      id: 1,
      category_name: 'Marketing APPs',
      FAQ_category: 1,
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 2,
      category_name: 'Promotions',
      FAQ_category: 2,
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 3,
      category_name: 'Marketing Resources',
      FAQ_category: 3,
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 4,
      category_name: 'System Security',
      FAQ_category: 4,
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 5,
      category_name: 'Desktop Problem',
      FAQ_category: 5,
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 6,
      category_name: 'Conexion Issues',
      FAQ_category: 6,
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 7,
      category_name: 'Price',
      FAQ_category: 7,
      theme_id: 3,
      category_status: "Active"
    },
    {
      id: 8,
      category_name: 'Legal',
      FAQ_category: 8,
      theme_id: 3,
      category_status: "Active"
    },
    {
      id: 9,
      category_name: 'Suppliers',
      FAQ_category: 9,
      theme_id: 3,
      category_status: "Active"
    },


  ]);
  },

  async down (queryInterface, Sequelize) {
    'Categories', null, {}
  }
};
