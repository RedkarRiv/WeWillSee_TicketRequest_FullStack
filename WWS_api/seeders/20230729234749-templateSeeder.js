'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Templates", [
      {
        id: 1,
        SAT_id: 1,
        template_title: "Esto es un ejemplo del titulo1",
        template_description: "1Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        SAT_id: 1,
        template_title: "Esto es un ejemplo del titulo2",
        template_description: "2Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        SAT_id: 2,
        template_title: "Esto es un ejemplo del titulo3",
        template_description: "3Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        SAT_id: 1,
        template_title: "Esto es un ejemplo del titulo4",
        template_description: "4Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        SAT_id: 2,
        template_title: "Esto es un ejemplo del titulo5",
        template_description: "5Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        SAT_id: 1,
        template_title: "Esto es un ejemplo del titulo6",
        template_description: "6Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template Esto es un ejemplo de descripción del template",
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
