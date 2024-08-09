'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    username: DataTypes.STRING,
    mobile_no: DataTypes.BIGINT,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    config: DataTypes.JSON,
    ekyc_verified: DataTypes.BOOLEAN,
    nominee_verified: DataTypes.BOOLEAN,
    bank_verified: DataTypes.BOOLEAN,
    is_obsolate: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    role: DataTypes.STRING,
    designation: DataTypes.STRING,
    state: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    pincode: DataTypes.INTEGER,
    created_by: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false, 
  });
  return User;
}

 