const ExpenseSchema = require("../models/expenseModel");

const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const expense = ExpenseSchema({
        title,
        amount,
        date,
        category,
        description,
    });

    try {
        if (!title || !amount || !category || !date) {
            res.status(400).json({ message: "All fields are required" });
        }
        if (amount < 0 || !amount === "number") {
            res.status(400).json({ message: "Amount must be a number" });
        }

        await expense.save();
        res.status(200).json({ message: "Expense added" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: "Expense deleted" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
};

const updateExpense = async (req, res) => {
    const { id, title, amount, category, description, date } = req.body;
    const payload = {
        title,
        amount,
        category,
        description,
        date,
    };
    ExpenseSchema.findByIdAndUpdate(id, payload)
        .then((expense) => {
            res.status(200).json({
                message: "Expense updated",
                id: expense.id,
            });
        })
        .catch((error) => {
            res.status(500).json({ message: "Internal server error" });
        });
};

module.exports = { addExpense, getExpense, deleteExpense, updateExpense };
