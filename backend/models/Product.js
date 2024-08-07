const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dataCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recordCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fields: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Product;
