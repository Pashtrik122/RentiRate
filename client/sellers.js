// Import Sequelize and database connection
const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // assuming database.js contains the sequelize instance

// Define the Seller model
const Seller = sequelize.define('Seller', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  }
}, {
  tableName: 'sellers', // Specify the table name
  timestamps: false // Disable timestamps
});

// Export the Seller model
module.exports = Seller;
