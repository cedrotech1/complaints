"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.Agencies, {
        foreignKey: "agencyId",
        as: "agency",
      });

      Users.belongsTo(models.Agencies, {
        foreignKey: "agencyId",
        as: "agencyUsers",
      });

      Users.hasMany(models.Claims, {
        foreignKey: "userid",
        as: "userClaims",
      });

      Users.hasMany(models.Replies, {
        foreignKey: "userid",
        as: "userReplies",
      });
    }
  }

  Users.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      nid: DataTypes.STRING,
      role: DataTypes.STRING, // 'citizen', 'staff', 'superadmin'
      password: DataTypes.STRING,
      resetkey: DataTypes.STRING,
      agencyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  return Users;
};
