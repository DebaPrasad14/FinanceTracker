import React from "react";
import styled from "styled-components";

const Dialog = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <DialogWrapper>
            <DialogContent>
                <CloseButton onClick={onClose}>x</CloseButton>
                {title && <h2>{title}</h2>}
                {children}
            </DialogContent>
        </DialogWrapper>
    );
};

const DialogWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const DialogContent = styled.div`
    background: rgb(252, 246, 249);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    h2 {
        margin-bottom: 1.5rem;
    }
`;

const CloseButton = styled.span`
    position: absolute;
    top: 14px;
    right: 14px;
    cursor: pointer;
    font-weight: 500;
    font-size: 20px;
`;

export default Dialog;
