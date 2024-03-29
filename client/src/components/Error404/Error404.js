import React from "react";
import { ErrorWrapper } from "./Error404Style";

const Error404 = () => {
    return (
        <ErrorWrapper>
            <div className="container">
                <h2 className="title-text">404</h2>
                <div className="sub-title-text">Not Found</div>
                <div className="sub-text">
                    The resourse requested couldn't be found on this server.
                </div>
            </div>
        </ErrorWrapper>
    );
};

export default Error404;
