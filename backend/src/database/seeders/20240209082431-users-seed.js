import bcrypt from "bcrypt";

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash("1234", saltRounds);
    await queryInterface.bulkInsert('Users', [
      {
        firstname: 'superadmin',
        lastname: 'cedrick',
        email: 'superadmin@gmail.com',
        role: 'superadmin',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
