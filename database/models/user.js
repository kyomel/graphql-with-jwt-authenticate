'use strict';
const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.post, {
        foreignKey: "user_id"
      });
    }
  };
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    // hooks: {
    //   beforeCreate: instance => {
    //     instance.password = bcrypt.hashSync(instance.password, 10);
    //   }
    // },
    sequelize,
    modelName: 'user',
  });
  return user;
};