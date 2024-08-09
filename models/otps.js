import { DataTypes } from "sequelize";

export default (sequelize) => {
  const OTP = sequelize.define(
    "OTP",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      mobile_no:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      timestamps: false,
      tableName: "OTPs",
    }
  );

  return OTP;
};
