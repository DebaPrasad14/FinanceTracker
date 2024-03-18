import styled from "styled-components"
import { InnerLayout } from "../../styles/Layout";
import Form from "../Form/Form";
import IncomeItem from "../IncomeItem/IncomeItem";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import ExpenseForm from "./ExpenseForm";


const Expense = () => {
    const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

    useEffect(() => {
        getExpenses();
    }, [])

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">
                    Total Expense: <span>${totalExpenses()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses && expenses.map(income => {
                            const { _id, title, amount, date, category, description } = income;
                            return <IncomeItem 
                                key={_id}
                                id={_id}
                                type={'expense'}
                                title={title}
                                amount={amount}
                                date={date}
                                category={category}
                                description={description}
                                indicatorColor={'var(--color-green)'}
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
    .total-income{
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
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Expense;