"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Claims extends Model {
    static associate(models) {
      Claims.belongsTo(models.Users, {
        foreignKey: "userid",
        as: "ClaimsUser",
      });

      Claims.belongsTo(models.Agencies, {
        foreignKey: "agencyId",
        as: "ClaimsAgency",
      });

      Claims.hasMany(models.Replies, {
        foreignKey: "claimId",
        as: "ClaimsReplies",
      });
    }
  }

  Claims.init(
    {
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false, // 'pending', 'in progress', 'resolved'
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      agencyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Claims",
    }
  );

  return Claims;
};
