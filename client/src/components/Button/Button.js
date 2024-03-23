import styled from "styled-components";

const Button = ({ name, icon, onClick, bg, bpad, color, bRad, minWidth, fontSize }) => {
    return (
        <ButtonStyled
            style={{
                background: bg,
                padding: bpad,
                borderRadius: bRad,
                color: color,
                minWidth: minWidth,
                fontSize: fontSize,
            }}
            onClick={onClick}
        >
            { icon && icon}
            {name}
        </ButtonStyled>
    );
};

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    &:hover {
        opacity: 0.85;
    }
`;

export default Button;
