'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      theme_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Themes",
          key: "id"
        }
      },
      category_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};