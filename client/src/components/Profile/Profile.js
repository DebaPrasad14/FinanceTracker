import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";

const Profile = () => {
    return (
        <ProfileStyled>
            <InnerLayout>
                <div className="user-details">

                </div>
                <div className="user-settings">
                    
                </div>
            </InnerLayout>
        </ProfileStyled>
    );
};

const ProfileStyled = styled.div``;

export default Profile;
