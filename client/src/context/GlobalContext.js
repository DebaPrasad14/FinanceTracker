import { createContext, useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/v1/";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    axios.defaults.withCredentials = true;

    const signUp = async (input) => {
        try {
            const response = await axios.post(`${BASE_URL}signup`, input);
            return response;
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const signIn = async (input) => {
        try {
            const response = await axios.post(`${BASE_URL}signin`, input);
            return response;
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const forgotPassword = async (input) => {
        try {
            const response = await axios.post(
                `${BASE_URL}forgot-password`,
                input
            );
            return response;
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const resetPassword = async (input, token) => {
        axios.defaults.withCredentials = true;

        try {
            const response = await axios.post(
                `${BASE_URL}reset-password/${token}`,
                input
            );
            return response;
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const verify = async () => {
        try {
            const response = await axios.get(`${BASE_URL}verify`);
            return response;
        } catch (error) {
            throw error.response;
        }
    };

    const signOut = async () => {
        axios.defaults.withCredentials = true;

        try {
            const response = await axios.get(`${BASE_URL}signout`);
            return response;
        } catch (error) {
            throw error.response.data.message;
        }
    };

    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}add-income`, income).catch((err) => {
            setError(err.message);
        });
        getIncomes();
    };

    const getIncomes = async () => {
        const response = await axios
            .get(`${BASE_URL}get-incomes`)
            .catch((err) => {
                setError(err.message);
            });
        setIncomes(response.data);
    };

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}delete-income/${id}`).catch((err) => {
            setError(err.message);
        });
        getIncomes();
    };

    const updateIncome = async (input) => {
        await axios.patch(`${BASE_URL}update-income`, input).catch((err) => {
            setError(err.message);
        });
        getIncomes();
    };

    const totalIncomes = () => {
        let totalIncomeValue = 0;
        incomes.forEach((income) => {
            totalIncomeValue += income.amount;
        });
        return totalIncomeValue;
    };

    const addExpense = async (expense) => {
        await axios.post(`${BASE_URL}add-expense`, expense).catch((err) => {
            setError(err.message);
        });
        getExpenses();
    };

    const getExpenses = async () => {
        const response = await axios
            .get(`${BASE_URL}get-expenses`)
            .catch((err) => {
                setError(err.message);
            });
        setExpenses(response.data);
    };

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}delete-expense/${id}`).catch((err) => {
            setError(err.message);
        });
        getExpenses();
    };

    const updateExpense = async (input) => {
        await axios.patch(`${BASE_URL}update-expense`, input).catch((err) => {
            setError(err.message);
        });
        getExpenses();
    };

    const totalExpenses = () => {
        let totalExpenseValue = 0;
        expenses.forEach((expense) => {
            totalExpenseValue += expense.amount;
        });
        return totalExpenseValue;
    };

    const totalBalance = () => {
        return totalIncomes() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider
            value={{
                incomes,
                addIncome,
                getIncomes,
                deleteIncome,
                updateIncome,
                totalIncomes,
                expenses,
                addExpense,
                getExpenses,
                deleteExpense,
                updateExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
                signUp,
                signIn,
                forgotPassword,
                resetPassword,
                verify,
                signOut,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
