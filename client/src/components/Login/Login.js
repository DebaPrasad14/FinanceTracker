import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";
import { useNavigate, Link } from "react-router-dom";
import { Card, FormStyled } from "../../styles/AuthFormStyle";

const initialInput = {
    email: "",
    password: "",
};

const SignIn = () => {
    const { error, setError, signIn } = useGlobalContext();
    const [inputState, setInputState] = useState(initialInput);
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    const { email, password } = inputState;

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInputState({ ...inputState, [name]: value });
        checkFormFields();
    };

    const checkFormFields = () => {
        if (email.trim() && password.trim()) {
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
                const response = await signIn(inputState);
                console.log("Signin successful:", response);
                if (response.status === 200) {
                    setInputState(initialInput);
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Signin failed:", error);
                setError(error);
            }
        } else {
            setError("Fill all required fields");
        }
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            <Card>
                <h2 className="title">{"Sign In"}</h2>
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
                    {error && <div className="error">{error}</div>}
                    <div className="submit-btn">
                        <Button
                            name={"Sign in"}
                            bpad={"0.75rem 1.5rem"}
                            bRad={"30px"}
                            bg={"var(--color-accent)"}
                            color={"#fff"}
                            minWidth={"200px"}
                        ></Button>
                    </div>
                    <div className="footer-texts">
                        <Link
                            className="link"
                            to="/forgotPassword"
                            reloadDocument
                        >
                            {"Forgot password"}
                        </Link>
                        <p>
                            {"Not registered?"}{" "}
                            <Link to="/signup" reloadDocument>
                                {"Sign up"}
                            </Link>
                        </p>
                    </div>
                </div>
            </Card>
        </FormStyled>
    );
};

export default SignIn;
