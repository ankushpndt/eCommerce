import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const {
        isUserLoggedIn,
        token: savedToken,
        user: userName,
        userId: userid
    } = JSON.parse(localStorage?.getItem("login")) || {
        isUserLoggedIn: false,
        token: null,
        user: "",
        userId: ""
    };

    const [login, setLogin] = useState(isUserLoggedIn);
    const [token, setToken] = useState(savedToken);
    const [error, setError] = useState("");
    const [user, setUser] = useState(userName);
    const [userId, setUserId] = useState(userid);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    //signup

    const signUpWithCredentials = async (name, email, password) => {
        try {
            setLoader(true);

            const response = await axios.post(
                "https://backend.ankushpndt.repl.co/user/signup",
                { name: name, email: email, password: password }
            );

            if (response.data.success === true) {
                setLoader(false);
                signUpUser(response.data);
            }
            if (response.data.success === true) navigate("/");
        } catch (error) {
            setError(error.response.data?.errors);
        }
    };
    const signUpUser = ({ token, userName, userid }) => {
        setToken(token);
        setLogin(true);
        setUser(userName);
        setUserId(userid);
        localStorage.setItem(
            "login",
            JSON.stringify({
                isUserLoggedIn: true,
                token,
                user: userName,
                userId: userid
            })
        );
    };
    // login
    const loginWithCredentials = async (email, password) => {
        try {
            setLoader(true);

            const response = await axios.post(
                "https://backend.ankushpndt.repl.co/user/login",
                {
                    email: email,
                    password: password
                }
            );

            if (response.data.success === true) {
                setLoader(false);
                loginUser(response.data);
            }
            if (response.data.success === true) navigate("/");
        } catch (error) {
            setError(error.response.data.errors);
        }
    };
    const loginUser = ({ token, userName, userid }) => {
        setToken(token);
        setLogin(true);
        setUser(userName);
        setUserId(userid);
        localStorage.setItem(
            "login",
            JSON.stringify({
                isUserLoggedIn: true,
                token,
                user: userName,
                userId: userid
            })
        );
    };
    const userLogout = async () => {
        localStorage.removeItem("login");
        setLogin(false);
        setToken("");
        setUser("");
        setUserId("");
        navigate("/login");
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                loginWithCredentials,
                signUpWithCredentials,
                error,
                token,
                userLogout,
                user,
                userId,
                setError,
                loader
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
