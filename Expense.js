const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Expense = sequelize.define('Expense', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

module.exports = Expense;
