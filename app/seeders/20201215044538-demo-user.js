"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@testing.com",
          password: "nopassword",
          photo:
            "https://res.cloudinary.com/dtx75b7pa/image/upload/v1589464507/sqi0f4srxumrho2f9kyg.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          is_admin: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
