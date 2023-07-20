"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("FAQs", [
      {
        id: 1,
        category_id: 1,
        question: "¿Cómo puedo crear una cuenta en esta página?",
        answer:
          "Puedes crear una cuenta desde la página de inicio pinchando en REGISTRO. En ciertos casos, tendrás que ponerte en contacto con el responsable de tu empresa para solicitar acceso a la aplicación",
        FAQ_status: "Active",
      },
      {
        id: 2,
        category_id: 1,
        question: "¿Olvidé mi contraseña, cómo puedo recuperar el acceso a mi cuenta?",
        answer: "Si olvidaste tu contraseña, puedes hacer clic en la opción 'Olvide mi contraseña' en la página de inicio de sesión. Te enviaremos un correo electrónico con un enlace seguro para restablecer tu contraseña",
        FAQ_status: "Active",
      },
      {
        id: 3,
        category_id: 1,
        question: "¿Es seguro proporcionar mis datos personales durante el proceso de registro?",
        answer: "Sí, la seguridad de tus datos es una prioridad para nosotros. Utilizamos medidas de seguridad avanzadas para proteger tu información personal y garantizar que se mantenga confidencial.",
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
