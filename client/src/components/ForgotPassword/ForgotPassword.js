import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { useNavigate, Link } from "react-router-dom";
import { Card, FormStyled } from "../../styles/AuthFormStyle";

const initialInput = {
    email: ""
};

const ForgotPassword = () => {
    const { error, setError, forgotPassword } = useGlobalContext();
    const [inputState, setInputState] = useState(initialInput);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    const { email } = inputState;

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputState({ ...inputState, [name]: value });
        checkFormFields();
    };

    const checkFormFields = () => {
        if (email.trim()) {
            setFormValid(true);
            setError("");
        } else {
            setFormValid(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formValid) {
            try {
                const response = await forgotPassword(inputState);
                console.log("reset link sent:", response);
                if (response.status === 200) {
                    alert("Please check your email for reset password link");
                    setInputState(initialInput);
                    navigate("/login");
                }
            } catch (error) {
                console.error("reset failed:", error);
                setError(error);
            }
        } else {
            setError("Enter your email to reset password");
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <Card>
                <h2 className="title">{"Forgot Password"}</h2>
                <div className="input-wrapper">
                    <div className="input-control">
                        <input
                            type="text"
                            name="email"
                            value={email}
                            placeholder="Enter email"
                            autoComplete="off"
                            onChange={handleInput}
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="submit-btn">
                        <Button
                            name={"Send"}
                            bpad={"0.75rem 1.5rem"}
                            bRad={"30px"}
                            bg={"var(--color-accent)"}
                            color={"#fff"}
                            minWidth={"200px"}
                        ></Button>
                    </div>
                    <div className="footer-texts">
                        <p>
                            {"Remember password?"}{" "}
                            <Link to="/login" reloadDocument>
                                {"Sign in"}
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>
        </FormStyled>
    );
};


export default ForgotPassword;
