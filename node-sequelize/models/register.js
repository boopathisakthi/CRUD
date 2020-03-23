'use strict';
module.exports = (sequelize, DataTypes) => {
  const Register = sequelize.define('Register', {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    isdeleted:DataTypes.INTEGER,
  }, {});
  Register.associate = function(models) {
    // associations can be defined here
  };
  return Register;
};