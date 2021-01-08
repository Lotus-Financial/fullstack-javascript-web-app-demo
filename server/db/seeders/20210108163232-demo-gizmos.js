'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Gizmos', [
      {
          name: "Drone",
          type: "Remote Aerial Craft",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Air Fryer",
          type: "Modern Cooking Appliance",
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          name: "Virtual Reality Headset",
          type: "Entertainment, Training, And Simulation Device",
          createdAt: new Date(),
          updatedAt: new Date()
      }
  ]);
  },

  down: async (queryInterface, Sequelize) => {}
};
