"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Replies extends Model {
    static associate(models) {
      Replies.belongsTo(models.Claims, {
        foreignKey: "claimId",
        as: "claim",
      });

      Replies.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "responder",
      });
    }
  }

  Replies.init(
    {
      claimId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Agency staff replying
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true, // Optional attachment
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Replies",
    }
  );

  return Replies;
};
