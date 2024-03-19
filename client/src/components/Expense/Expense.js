import styled from "styled-components"
import { InnerLayout } from "../../styles/Layout";
import TransactionForm from "../Form/TransactionForm";
import TransactionItem from "../TransactionItem/TransactionItem";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";

const expenseOptions = [
    { text: 'Select option', value: '', disabled: true },
    { text: 'Education', value: 'education' },
    { text: 'Groceries', value: 'groceries' },
    { text: 'Health', value: 'health' },
    { text: 'Subscriptions', value: 'subscriptions' },
    { text: 'Takeaways', value: 'takeaways' },
    { text: 'Clothing', value: 'clothing' },
    { text: 'Travelling', value: 'travelling' },
    { text: 'Other', value: 'other' }
];

const Expense = () => {
    const { expenses, getExpenses, deleteExpense, totalExpenses, setError } = useGlobalContext();

    useEffect(() => {
        getExpenses();
        setError('');
        // eslint-disable-next-line
    }, [])

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
                            type={'expense'}
                            options={expenseOptions}
                            btnText={'Add Expense'}
                        />
                    </div>
                    <div className="expenses">
                        {expenses && expenses.map(income => {
                            const { _id, title, amount, date, category, description } = income;
                            return <TransactionItem 
                                key={_id}
                                id={_id}
                                type={'expense'}
                                title={title}
                                amount={amount}
                                date={date}
                                category={category}
                                description={description}
                                indicatorColor={'var(--color-red)'}
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-red);
        }
    }
    .expense-content{
        display: flex;
        gap: 2rem;
        .expenses{
            flex: 1;
        }
    }
`;

export default Expense;