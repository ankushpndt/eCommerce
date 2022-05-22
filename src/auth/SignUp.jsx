import { useAuth } from "../Context/authContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";
import "./Account.css";
import { validateForm } from "../components/ValidateForm";
import { Loader } from "../components/Loader";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { signUpWithCredentials, error, setError, loader } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const submitHandler = async (e) => {
        e.preventDefault();

        validateForm({ name, email, password, setErrorMessage }) &&
            signUpWithCredentials(name, email, password);
        setError("");
    };
    const [showPass, setShowPass] = useState(false);
    return (
        <div className="signup">
            {!loader ? (
                <form
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
                    onSubmit={submitHandler}
                >
                    <h2>Sign Up</h2>
                    <br />
                    <TextField
                        type="text"
                        label="Name"
                        name="fullName"
                        helperText="Enter your name here"
                        onChange={(e) => setName(e.target.value)}
                        required
                        value={name}
                        variant="standard"
                    />

                    <br />
                    <TextField
                        type="text"
                        label="Email"
                        name="email"
                        helperText="Enter your email here"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        value={email}
                        variant="standard"
                    />
                    <br />
                    <TextField
                        type={showPass ? "text" : "password"}
                        label="Password"
                        name="password"
                        helperText="Enter your password here"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                        value={password}
                        variant="standard"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPass(!showPass)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        {showPass ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <br />
                    <div className="name__error">
                        {errorMessage !== "" && errorMessage}
                    </div>
                    <div>{error?.message}</div>
                    <br />
                    <input
                        type="submit"
                        value="SIGN UP"
                        id="login__btn__outlined"
                    />
                    <br />
                    <p>
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "black"
                            }}
                            to="/login"
                        >
                            Login instead
                        </NavLink>
                    </p>
                </form>
            ) : (
                <Loader />
            )}
        </div>
    );
};
