const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
const User = require('./User');
const Group = require('./Group');
const Expense = require('./Expense');
const Transaction = require('./Transaction');

// Associations
User.belongsToMany(Group, { through: 'UserGroups' });
Group.belongsToMany(User, { through: 'UserGroups' });

Group.hasMany(Expense);
Expense.belongsTo(Group);

Expense.belongsToMany(User, { through: 'UserExpenses' });
User.belongsToMany(Expense, { through: 'UserExpenses' });

Group.hasMany(Transaction);
Transaction.belongsTo(Group);

User.hasMany(Transaction, { as: 'payer' });
Transaction.belongsTo(User, { as: 'payer' });

User.hasMany(Transaction, { as: 'payee' });
Transaction.belongsTo(User, { as: 'payee' });

module.exports = { sequelize, User, Group, Expense, Transaction };

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

connectDB();

module.exports = sequelize;
