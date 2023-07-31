'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
      id: 1,
      category_name: 'Campañas de marketing',
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 2,
      category_name: 'Redes sociales',
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 3,
      category_name: 'Acceso a aplicaciones ',
      theme_id: 1,
      category_status: "Active"
    },
    {
      id: 4,
      category_name: 'Equipos y redes',
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 5,
      category_name: 'Software y credenciales',
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 6,
      category_name: 'Seguridad y SPAM',
      theme_id: 2,
      category_status: "Active"
    },
    {
      id: 7,
      category_name: 'Clientes',
      theme_id: 3,
      category_status: "Active"
    },
    {
      id: 8,
      category_name: 'Legal y jurídico',
      theme_id: 3,
      category_status: "Active"
    },
    {
      id: 9,
      category_name: 'Solicitud de informes',
      theme_id: 3,
      category_status: "Active"
    },
    {
      id: 10,
      category_name: 'Pedidos e incidencias',
      theme_id: 4,
      category_status: "Active"
    },
    {
      id: 11,
      category_name: 'Proveedores',
      theme_id: 4,
      category_status: "Inactive"
    },
    {
      id: 12,
      category_name: 'Solicitud de informes',
      theme_id: 4,
      category_status: "Active"
    },
    {
      id: 13,
      category_name: 'Almacen e inventario',
      theme_id: 5,
      category_status: "Active"
    },
    {
      id: 14,
      category_name: 'Envio y recepción',
      theme_id: 5,
      category_status: "Active"
    },
    {
      id: 15,
      category_name: 'Destinos y rutas',
      theme_id: 5,
      category_status: "Active"
    },
    {
      id: 16,
      category_name: 'Almacen e inventario',
      theme_id: 6,
      category_status: "Active"
    },
    {
      id: 17,
      category_name: 'Envío y recepción',
      theme_id: 6,
      category_status: "Active"
    },
    {
      id: 18,
      category_name: 'Destinos y rutas',
      theme_id: 6,
      category_status: "Inactive"
    },
    {
      id: 19,
      category_name: 'I.A.',
      theme_id: 1,
      category_status: "Inactive"
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    'Categories', null, {}
  }
};
