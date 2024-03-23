import styled from "styled-components";
import {
    bitcoin,
    book,
    calender,
    card,
    circle,
    clothing,
    comment,
    dollar,
    food,
    freelance,
    medical,
    money,
    piggy,
    stocks,
    takeaway,
    trash,
    edit,
    tv,
    users,
    yt,
} from "../../utils/icons";
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";
import { lazy, useState } from "react";
import TransactionForm from "../Form/TransactionForm";
const Dialog = lazy(() => import("../Dialog/Dialog"));

const IncomeItem = ({
    transactionData,
    deleteItem,
    indicatorColor,
    type,
    options,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        _id: id,
        title,
        amount,
        date,
        category,
        description,
    } = transactionData;

    const openDialog = () => {
        setIsOpen(true);
    };
    const closeDialog = () => {
        setIsOpen(false);
    };
    const handleEdit = () => {
        openDialog();
    };
    const getTitle = () => {
        return type === "income" ? "Edit Income" : "Edit Expense";
    };

    const categoryIcon = () => {
        const incomeIconMap = {
            salary: money,
            freelancing: freelance,
            investments: stocks,
            stocks: users,
            bitcoin: bitcoin,
            bank: card,
            youtube: yt,
            other: piggy,
        };
        const expenseIconMap = {
            education: book,
            groceries: food,
            health: medical,
            subscriptions: tv,
            takeaways: takeaway,
            clothing: clothing,
            travelling: freelance,
            other: circle,
        };
        return type === "income"
            ? incomeIconMap[category]
            : expenseIconMap[category];
    };

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">{categoryIcon()}</div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>
                            {dollar} {amount}
                        </p>
                        <p>
                            {calender} {dateFormat(date)}
                        </p>
                        <p>
                            {comment} {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bpad={"1rem"}
                            bRad={"50%"}
                            bg={"inherit"}
                            color={"var(--primary-color)"}
                            iColor={"#fff"}
                            hColor={"var(--color-green)"}
                            onClick={() => deleteItem(id)}
                        ></Button>
                        <Button
                            icon={edit}
                            bpad={"1rem"}
                            bRad={"50%"}
                            bg={"inherit"}
                            color={"var(--primary-color)"}
                            iColor={"#fff"}
                            hColor={"var(--color-green)"}
                            onClick={() => handleEdit()}
                        ></Button>
                    </div>
                </div>
            </div>
            <Dialog isOpen={isOpen} onClose={closeDialog} title={getTitle()}>
                <TransactionForm
                    type={type}
                    options={options}
                    data={transactionData}
                    btnText={"Save"}
                    btnIcon={""}
                    formType="update"
                    closeDialog={closeDialog}
                />
            </Dialog>
        </IncomeItemStyled>
    );
};

const IncomeItemStyled = styled.div`
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ffffff;
        i {
            font-size: 2.6rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 0.8rem;
                height: 0.8rem;
                border-radius: 50%;
                background: ${(props) => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem;
