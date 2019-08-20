'use strict';
module.exports = (sequelize, DataTypes) => {
  const neighborhood = sequelize.define('neighborhood', {
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {});
  neighborhood.associate = function(models) {
    // associations can be defined here
  };
  return neighborhood;
};