import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { state } = useLocation();
    console.log(state);
    const {
        isUserLoggedIn,
        token: savedToken,
        user: userName
    } = JSON.parse(localStorage?.getItem("login")) || {
        isUserLoggedIn: false,
        token: null,
        user: ""
    };

    const [login, setLogin] = useState(isUserLoggedIn);
    const [token, setToken] = useState(savedToken);
    const [error, setError] = useState("");
    const [user, setUser] = useState(userName);
    const navigate = useNavigate();

    //signup

    const signUpWithCredentials = async (name, email, password) => {
        try {
            const response = await axios.post(
                "https://backend.ankushpndt.repl.co/user",
                { name: name, email: email, password: password }
            );
            // console.log(response);
            if (response.status === 201) {
                signUpUser(response.data);
            }
            if (response.data.success === true) navigate("/");
        } catch (error) {
            setError(error.response.data?.errors);
            // console.log(error);
        }
    };
    const signUpUser = ({ token }) => {
        setToken(token);
        setLogin(true);
        localStorage.setItem(
            "login",
            JSON.stringify({ isUserLoggedIn: true, token })
        );
    };
    // login
    const loginWithCredentials = async (email, password) => {
        try {
            const response = await axios.post(
                "https://backend.ankushpndt.repl.co/user/login",
                {
                    email: email,
                    password: password
                }
            );
            console.log(response);
            if (response.status === 200) {
                loginUser(response.data);
            }
            if (response.data.success === true) navigate("/");
        } catch (error) {
            setError(error.response.data.errors);
        }
    };
    const loginUser = ({ token, userName }) => {
        setToken(token);
        setLogin(true);
        setUser(userName);
        localStorage.setItem(
            "login",
            JSON.stringify({ isUserLoggedIn: true, token, user: userName })
        );
    };
    const userLogout = async () => {
        localStorage.removeItem("login");
        setLogin(false);
        setToken("");
        setUser("");
        navigate("/login");
    };
    console.log(user);
    return (
        <AuthContext.Provider
            value={{
                login,
                loginWithCredentials,
                signUpWithCredentials,
                error,
                token,
                userLogout,
                user
            }}
        >
            {console.log(user)}
            {children}
        </AuthContext.Provider>
    );
};
export function useAuth() {
    return useContext(AuthContext);
}
