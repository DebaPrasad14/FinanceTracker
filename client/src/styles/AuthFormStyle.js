import styled from "styled-components";

const Card = styled.div`
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 420px;
    padding: 3rem 2.5rem;
    margin: auto;
    text-align: center;
`;

const FormStyled = styled.form`
    background: #f5f5f5;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .input-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    h2.title {
        margin-bottom: 3rem;
    }
    input {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 12px;
        border-radius: 5px;
        border: 1px solid #b2b2b2;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        width: 100%;
        input {
            width: 100%;
        }
    }

    .submit-btn {
        margin-top: 2rem;
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            font-weight: bold;
        }
    }
`;

export { Card, FormStyled };