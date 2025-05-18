"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Agencies extends Model {
    static associate(models) {
      Agencies.hasMany(models.Users, {
        foreignKey: "agencyId",
        as: "agencyUsers",
      });

      Agencies.hasMany(models.Claims, {
        foreignKey: "agencyId",
        as: "agencyClaims",
      });
      
    }
  }

  Agencies.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactEmail: {
        type: DataTypes.STRING,
      },
      contactPhone: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Agencies",
    }
  );

  return Agencies;
};
