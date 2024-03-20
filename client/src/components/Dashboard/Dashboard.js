import styled from "styled-components"
import { InnerLayout } from "../../styles/Layout";
import Chart from "../Chart/Chart";
import { useGlobalContext } from "../../context/GlobalContext";
import { dollar } from "../../utils/icons";
import { useEffect } from "react";
import History from "../History/History";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { getIncomes, getExpenses, incomes, expenses, totalIncomes, totalExpenses, totalBalance, verify } = useGlobalContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        // const getAuthStatus = async () => {
        //     try {
        //         const response = await verify();
        //     } catch (error) {
        //         if(error?.status === 401) {
        //             navigate("/login");
        //         }
        //         console.error("Error verifying authentication:", error);
        //     }
        // };

        // getAuthStatus();
        getIncomes();
        getExpenses();
        // eslint-disable-next-line
    }, []);

    const getMin = (arr) => {
        return arr.length > 0 ? Math.min(...arr.map(item => item.amount)) : 0;
    }

    const getMax = (arr) => {
        return arr.length > 0 ? Math.max(...arr.map(item => item.amount)) : 0;
    }

    const balanceStyle = () => {
        return { color: totalBalance < 0 ? 'var(--color-red)' : 'var(--color-green)' };
    }
    
    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total income</h2>
                                <p style={{color: 'var(--color-green)'}}>{dollar} {totalIncomes()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total expense</h2>
                                <p style={{color: 'var(--color-red)'}}>{dollar} {totalExpenses()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total balance</h2>
                                <p style={balanceStyle()}>{dollar} {totalBalance()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Income</span>Max</h2>
                        <div className="salary-item">
                            <p>${ getMin(incomes) }</p>
                            <p>${ getMax(incomes) }</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>${ getMin(expenses) }</p>
                            <p>${ getMax(expenses) }</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
.stats-con{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con{
        grid-column: 1 / 4;
        height: 400px;
        .amount-con{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
            margin-top: 2rem;
            .income, .expense{
                grid-column: span 2;
            }
            .income, .expense, .balance{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                border-radius: 20px;
                padding: 1rem;
                p{
                    font-size: 2rem;
                    font-weight: 700;
                }
            }

            .balance{
                grid-column: 2 / 4;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                p{
                    font-size: 2rem;
                }
            }
        }
    }

    .history-con{
        grid-column: 4 / -1;
        h2{
            margin: 1rem 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .salary-title{
            font-size: 1.2rem;
            span{
                font-size: 1.8rem;
            }
        }
        .salary-item{
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                font-weight: 600;
                font-size: 1.6rem;
            }
        }
    }
}
`;

export default Dashboard;