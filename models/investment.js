import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Investment extends Model {
    static associate(models) {
      // Define association here if needed
    }
  }
  
  Investment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capital: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    interest: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lockPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isObsolete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Investment',
    tableName: 'Investments',
    timestamps: false,
  });

  return Investment;
};
