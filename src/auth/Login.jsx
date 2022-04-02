import { useAuth } from "../Context/authContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";
import "./Account.css";
import { validateForm } from "../components/ValidateForm";
import { Loader } from "../components/Loader";
export const Login = () => {
    const { loginWithCredentials, error, token } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();

        validateForm({ email, password, setErrorMessage }) &&
            loginWithCredentials(email, password);
    };

    return (
        <div className="login">
            <form
                onSubmit={submitHandler}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    margin: "1rem auto",
                    padding: "4rem",
                    border: "2px solid #f0f0f0",
                    width: "20rem"
                }}
            >
                <h2>Login</h2>
                <br />
                <TextField
                    id="standard__basic"
                    label="Email"
                    type="text"
                    name="email"
                    helperText="Enter your email here"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    variant="standard"
                />

                <br />
                <br />

                <TextField
                    id="standard__basic"
                    label="Password"
                    type="password"
                    name="password"
                    helperText="Enter your password here"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    value={password}
                    variant="standard"
                />
                <br />
                <div className="name__error">
                    {errorMessage !== "" && errorMessage}
                </div>
                <div>{error?.message}</div>
                <br />
                {/*Login button*/}
                <input type="submit" value="LOGIN" id="login__btn__outlined" />
                <br />
                <p>
                    <NavLink
                        style={{
                            textDecoration: "none",
                            color: "black"
                        }}
                        to="/signup"
                    >
                        Create an account
                    </NavLink>
                </p>
            </form>
            )
        </div>
    );
};
