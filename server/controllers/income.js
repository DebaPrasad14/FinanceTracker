const IncomeSchema = require('../models/incomeModel');

const addIncome = async(req, res) => {
    const {title, amount, category, description, date} = req.body;
    const income = IncomeSchema({
        title,
        amount,
        date,
        category,
        description
    });

    try {
        if(!title || !amount || !category || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(amount < 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a number' });
        }

        await income.save();
        res.status(200).json({ message: 'Income added' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteIncome = async (req, res) => {
    console.log(req);
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Income deleted' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        })
}

module.exports = { addIncome, getIncome, deleteIncome };