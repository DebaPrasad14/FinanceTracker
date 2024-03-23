import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Card, FormStyled } from "../../styles/AuthFormStyle";

const initialInput = {
    password: "",
    confirmPassword: "",
};

const ResetPassword = () => {
    const { error, setError, resetPassword } = useGlobalContext();
    const [inputState, setInputState] = useState(initialInput);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    const { password, confirmPassword } = inputState;

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputState({ ...inputState, [name]: value });
        checkFormFields();
    };

    const checkFormFields = () => {
        if (password && confirmPassword) {
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
                const response = await resetPassword(inputState, token);
                if (response.status === 200) {
                    alert("Password reset successful!");
                    setInputState(initialInput);
                    navigate("/login");
                }
            } catch (error) {
                console.error("reset failed:", error);
                setError(error);
            }
        } else {
            setError("Enter new passwords to set");
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <Card>
                <h2 className="title">{"Reset Password"}</h2>
                <div className="input-wrapper">
                    <div className="input-control">
                        <input
                            type="text"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            autoComplete="off"
                            onChange={handleInput}
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="text"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Enter confirm password"
                            autoComplete="off"
                            onChange={handleInput}
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <div className="submit-btn">
                        <Button
                            name={"Reset"}
                            bpad={"0.75rem 1.5rem"}
                            bRad={"30px"}
                            bg={"var(--color-accent)"}
                            color={"#fff"}
                            minWidth={"200px"}
                            fontSize={"16px"}
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

export default ResetPassword;
