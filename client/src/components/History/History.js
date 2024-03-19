import styled from "styled-components"
import { useGlobalContext } from "../../context/GlobalContext";

const History = () => {
    const { transactionHistory } = useGlobalContext();
    const [ ...history ] = transactionHistory();

    return (
        <HistoryStyled>
            <h2>Recent history</h2>
            {history && history.map(item => {
                const { _id, title, amount, type } = item;
                return (
                    <div className="history-item" key={_id}>
                        <p style={{
                            color: type === 'expense' ? 'var(--color-red)' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>
                        <p style={{
                            color: type === 'expense' ? 'var(--color-red)' : 'var(--color-green)'
                        }}>
                            { type === 'expense' ? '-' : '+'} {amount}
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History;