import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import AppWrapper from "../HOC/AppWrapper";

const Profile = () => {
    return (
        <ProfileStyled>
            <InnerLayout>
                <div className="user-details"> profile</div>
                <div className="user-settings"></div>
            </InnerLayout>
        </ProfileStyled>
    );
};

const ProfileStyled = styled.div``;

export default AppWrapper(Profile);
