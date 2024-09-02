const { Expense, Group, User } = require('../models');

exports.createExpense = async (req, res) => {
    const { description, amount, groupId, userIds } = req.body;

    try {
        const expense = await Expense.create({ description, amount, GroupId: groupId });
        await expense.addUsers(userIds);

        res.json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
};

exports.getGroupExpenses = async (req, res) => {
    const { groupId } = req.params;

    try {
        const expenses = await Expense.findAll({ where: { GroupId: groupId }, include: [User] });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
};
