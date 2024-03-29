import React from "react";
import { MainLayout } from "../../styles/Layout";
import Navigation from "../Navigation/Navigation";
import bg from "../../images/bg.png";
import styled from "styled-components";

const AppWrapper = (WrappedComponent) => {
    return (props) => (
        <AppStyled bg={bg} className="App">
            <MainLayout>
                <Navigation />
                <main>
                    <WrappedComponent {...props} />
                </main>
            </MainLayout>
        </AppStyled>
    );
};


const AppStyled = styled.div`
    height: 100vh;
    background: url(${(props) => props.bg});
    position: relative;
    main {
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #ffffff;
        backdrop-filter: blur(4.5px);
        border-radius: 8px;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 0;
        }
    }
`;

export default AppWrapper;
