import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import TransactionForm from "../Form/TransactionForm";
import TransactionItem from "../TransactionItem/TransactionItem";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import { plus } from "../../utils/icons";

const expenseOptions = [
    { text: "Select option", value: "", disabled: true },
    { text: "Education", value: "education" },
    { text: "Groceries", value: "groceries" },
    { text: "Health", value: "health" },
    { text: "Subscriptions", value: "subscriptions" },
    { text: "Takeaways", value: "takeaways" },
    { text: "Clothing", value: "clothing" },
    { text: "Travelling", value: "travelling" },
    { text: "Other", value: "other" },
];

const Expense = () => {
    const { expenses, getExpenses, deleteExpense, totalExpenses, setError } =
        useGlobalContext();

    useEffect(() => {
        getExpenses();
        setError("");
        // eslint-disable-next-line
    }, []);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">
                    Total Expense: <span>${totalExpenses()}</span>
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <TransactionForm
                            type={"expense"}
                            options={expenseOptions}
                            btnText={"Add Expense"}
                            btnIcon={plus}
                            formType={"add"}
                        />
                    </div>
                    <div className="expenses">
                        {expenses &&
                            expenses.map((expense) => {
                                return (
                                    <TransactionItem
                                        key={expense._id}
                                        transactionData={expense}
                                        type={"expense"}
                                        options={expenseOptions}
                                        indicatorColor={"var(--color-red)"}
                                        deleteItem={deleteExpense}
                                    />
                                );
                            })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
};

const IncomeStyled = styled.div`
    display: flex;
    .total-expense {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red);
        }
    }
    .expense-content {
        display: flex;
        gap: 2rem;
        .expenses {
            flex: 1;
        }
    }
`;

export default Expense;
