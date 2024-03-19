import styled from "styled-components"
import { InnerLayout } from "../../styles/Layout";
import TransactionForm from "../Form/TransactionForm";
import TransactionItem from "../TransactionItem/TransactionItem";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";

const incomeOptions = [
    { text: 'Select option', value: '', disabled: true },
    { text: 'Salary', value: 'salary' },
    { text: 'Freelancing', value: 'freelancing' },
    { text: 'Investments', value: 'investments' },
    { text: 'Stocks', value: 'stocks' },
    { text: 'Bitcoin', value: 'bitcoin' },
    { text: 'Bank Transfer', value: 'bank' },
    { text: 'Youtube', value: 'youtube' },
    { text: 'Other', value: 'other' }
];
const Income = () => {
    const { incomes, getIncomes, deleteIncome, totalIncomes, setError } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        setError('');
        // eslint-disable-next-line
    }, [])

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">
                    Total Income: <span>${totalIncomes()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <TransactionForm
                            type={'income'}
                            options={incomeOptions}
                            btnText={'Add Income'}
                        />
                    </div>
                    <div className="incomes">
                        {incomes && incomes.map(income => {
                            const { _id, title, amount, date, category, description } = income;
                            return <TransactionItem 
                                key={_id}
                                id={_id}
                                type={'income'}
                                title={title}
                                amount={amount}
                                date={date}
                                category={category}
                                description={description}
                                indicatorColor={'var(--color-green)'}
                                deleteItem={deleteIncome}
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

export default Income;