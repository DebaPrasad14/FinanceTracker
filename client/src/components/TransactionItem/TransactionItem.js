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
    tv,
    users,
    yt,
} from "../../utils/icons";
import Button from "../Button/Button";
import { dateFormat } from "../../utils/dateFormat";
import { lazy, useState } from "react";
import TransactionForm from "../Form/TransactionForm";
const Dialog = lazy(() => import("../Dialog/Dialog"));

const TransactionItem = ({
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
        <TransactionItemStyled indicator={indicatorColor}>
            <div className="content">
                <div className="title-content">
                    <div className="title-left">
                        {categoryIcon()}
                        <h5>{title.charAt(0).toUpperCase()}{title.slice(1)}</h5>
                    </div>
                    <div className="btn-con">
                        <Button
                            name={"Edit"}
                            bpad={"3px 8px"}
                            bRad={"2px"}
                            fontSize={"12px"}
                            bg={"var(--color-blue)"}
                            color={"var(--color-white)"}
                            onClick={() => handleEdit()}
                        ></Button>
                        <Button
                            name={"Delete"}
                            bpad={"3px 8px"}
                            bRad={"2px"}
                            fontSize={"12px"}
                            bg={"var(--color-delete)"}
                            color={"var(--color-white)"}
                            onClick={() => deleteItem(id)}
                        ></Button>
                    </div>
                </div>
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
        </TransactionItemStyled>
    );
};

const TransactionItemStyled = styled.div`
    background: #fcf6f9;
    border: 2px solid #ffffff;
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 5px solid;
    border-left-color: ${(props) => props.indicator};

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        h5 {
            font-size: 1.3rem;
            position: relative;
        }
        // .btn-con::before {
        //     content: "";
        //     position: absolute;
        //     left: 0;
        //     top: 50%;
        //     transform: translateY(-50%);
        //     width: 0.8rem;
        //     height: 0.8rem;
        //     border-radius: 50%;
        //     background: ${(props) => props.indicator};
        // }

        .title-content {
            display: flex;
            justify-content: space-between;
            i {
                font-size: 1.25rem;
            }
            .btn-con {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .title-left {
                display: flex;
                align-items: center;
                gap: 12px;
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
                i {
                    font-size: 1rem;
                }
            }
        }
    }
`;

export default TransactionItem;
