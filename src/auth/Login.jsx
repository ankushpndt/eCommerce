import { useAuth } from "../Context/authContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";
import "./Account.css";
import { Loader } from "../components/Loader";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export const Login = () => {
    const { loginWithCredentials, error, loader } = useAuth();
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();

        loginWithCredentials(email, password);
    };
    return (
        <div className="login">
            {!loader ? (
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
                        type={showPass ? "text" : "password"}
                        name="password"
                        helperText="Enter your password here"
                        onChange={(e) => setPassword(e.target.value)}
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
                    {/*Login button*/}
                    <input
                        type="submit"
                        value="LOGIN"
                        id="login__btn__outlined"
                    />
                    <button
                        id="login__btn__outlined"
                        onClick={() =>
                            loginWithCredentials("a@gmail.com", "12345678")
                        }
                        style={{ margin: "1rem 0" }}
                    >
                        Guest Login
                    </button>
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
            ) : (
                <Loader />
            )}
        </div>
    );
};
