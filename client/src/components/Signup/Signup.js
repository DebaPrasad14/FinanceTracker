import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { useNavigate, Link } from "react-router-dom";
import { Card, FormStyled } from "../../styles/AuthFormStyle";

const initialInput = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Signup = () => {
    const { error, setError, signUp } = useGlobalContext();
    const [inputState, setInputState] = useState(initialInput);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    const { username, email, password, confirmPassword } = inputState;

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputState({ ...inputState, [name]: value });
        checkFormFields();
    };

    const checkFormFields = () => {
        if (
            username.trim() &&
            email.trim() &&
            password.trim() &&
            confirmPassword.trim()
        ) {
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
                const response = await signUp(inputState);
                console.log("Signup successful:", response);
                if (response.status === 200) {
                    setInputState(initialInput);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Signup failed:", error);
                setError(error);
            }
        } else {
            setError("Fill all required fields");
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <Card>
                <h2 className="title">{"Sign Up"}</h2>
                <div className="input-wrapper">
                    <div className="input-control">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Enter name"
                            autoComplete="off"
                            onChange={handleInput}
                        />
                    </div>
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
                            name={"Sign up"}
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
                            {"Already registered?"}{" "}
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

export default Signup;
