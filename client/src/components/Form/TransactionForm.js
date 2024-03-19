import { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/icons";

const initialInput = {
    title: '',
    amount: '',
    date: '',
    category: '',
    description: ''
};

const TransactionForm = ({ type, options, btnText }) => {
    const { addIncome, addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState(initialInput);
    const [formValid, setFormValid] = useState(null);
    const { title, amount, date, category, description } = inputState;

    const handleInput = (name) => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    }

    const checkFormFields = () => {
        if (inputState.title.trim() && 
            inputState.amount.trim() &&
            inputState.date &&
            inputState.category.trim() &&
            inputState.description.trim()
        ) {
            setFormValid(true);
            setError('');
        } else {
            setFormValid(false);
            setError('Fill all required fields');
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        checkFormFields();
        if (formValid) {
            type === 'income' ? addIncome(inputState) : addExpense(inputState);
            setInputState(initialInput);
        }
    }

    const handleKeyPress = (event) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
        const isAllowedKey = event.key === '.' || (event.key >= '0' && event.key <= '9') || allowedKeys.includes(event.key);
        if (!isAllowedKey) {
            event.preventDefault();
        }
    }

    const optionItem = () => {
        return options.map((optionItem) => (
            <option key={optionItem.value} value={optionItem.value} disabled={optionItem.disabled || false}>
                {optionItem.text}
            </option>
        ));
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Enter title"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    name="amount"
                    value={amount}
                    placeholder="Enter amount"
                    onKeyDown={handleKeyPress}
                    onChange={handleInput('amount')}
                />
            </div>
            <div className="input-control">
                <DatePicker
                    placeholderText={'Enter a date'}
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => setInputState({ ...inputState, date: date})}
                />
            </div>
            <div className="selects input-control">
                <select id="category" name="category" value={category} onChange={handleInput('category')}>
                    {optionItem()}
                </select>
            </div>
            <div className="input-control">
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    placeholder='Add a reference'
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            {error && <div className="error">{error}</div>}
            <div className="submit-btn">
                <Button 
                    name={btnText}
                    icon={plus}
                    bpad={'0.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent)'}
                    color={'#fff'}
                ></Button>
            </div>
        </FormStyled>
    )
}


const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            width: 100%;
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .react-datepicker-wrapper {
        width: 100%;
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;


export default TransactionForm;