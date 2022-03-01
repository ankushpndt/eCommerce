import "./styles.css";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import { Login } from "./auth/Login";
import { SignUp } from "./auth/SignUp";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "./Context/authContext";
import { ProductDetails } from "./Pages/ProductDetails";
import { LandingPage } from "./Pages/LandingPage";
import { Checkout } from "./Checkout";
import { PageNotFound } from "./Pages/PageNotFound";
import { MyProfile } from "./Pages/MyProfile";
import { useState } from "react";
import { Searchbar } from "./components/Searchbar";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function App() {
    const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
    const { userLogout, user } = useAuth();

    const [open, setOpen] = useState(false);
    return (
        <div className="App">
            <nav className="hamnav">
                <div className="hamitems">
                    <div className="logo">
                        <NavLink
                            to="/"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            eCommerce
                        </NavLink>
                    </div>
                    <header className="header">
                        <Searchbar />
                    </header>
                    {user && (
                        <NavLink style={{ color: "white" }} to="/MyProfile">
                            Welcome, {user}
                        </NavLink>
                    )}{" "}
                    <NavLink
                        style={{
                            textDecoration: "none",
                            color: "white"
                            // marginRight: "0.5rem"
                        }}
                        to="/product"
                    >
                        {" "}
                        Products{" "}
                    </NavLink>{" "}
                    <NavLink
                        style={{
                            textDecoration: "none",
                            color: "white"
                            // marginRight: "0.5rem"
                        }}
                        to="/cart"
                    >
                        <ShoppingCartIcon />
                    </NavLink>{" "}
                    <NavLink
                        style={{
                            textDecoration: "none",
                            color: "white"
                        }}
                        to="/wishlist"
                    >
                        <FavoriteIcon />
                    </NavLink>
                    {!user && (
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                            to="/login"
                        >
                            <LoginIcon />
                        </NavLink>
                    )}
                    {!user && (
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                            to="/signup"
                        >
                            <AccountCircleIcon />
                        </NavLink>
                    )}
                    {user && (
                        <NavLink
                            style={{
                                border: "none",
                                fontWeight: "bold",
                                color: "white",
                                cursor: "pointer"
                            }}
                            onClick={() => userLogout()}
                            to="/"
                        >
                            Logout
                        </NavLink>
                    )}
                </div>
            </nav>
            <div className="mobile__menu">
                <div className="m__menu">
                    <Link to="/" className="logo">
                        eCommerce
                    </Link>
                    <div>
                        <Searchbar />
                    </div>
                    <button
                        className="open__menu"
                        onClick={() => setOpen((open) => !open)}
                    >
                        <MenuIcon />
                    </button>{" "}
                </div>
                <div
                    className={open ? "menu__drawer__active" : "menu__drawer"}
                    onClick={() => setOpen(false)}
                >
                    <ul className="menu">
                        <li>
                            {" "}
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? "red" : "black"
                                    };
                                }}
                                className="menu__link"
                                to="/"
                            >
                                <HomeIcon />
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingLeft: "0.5rem"
                                    }}
                                >
                                    Home
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? "red" : "black"
                                    };
                                }}
                                className="menu__link"
                                to="/products"
                            >
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingLeft: "0.5rem"
                                    }}
                                >
                                    Products
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? "red" : "black"
                                    };
                                }}
                                className="menu__link"
                                to="/cart"
                            >
                                <ShoppingCartIcon />
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingLeft: "0.5rem"
                                    }}
                                >
                                    Cart
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? "red" : "black"
                                    };
                                }}
                                className="menu__link"
                                to="/wishlist"
                            >
                                <FavoriteIcon />
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingLeft: "0.5rem"
                                    }}
                                >
                                    Wishlist
                                </span>
                            </NavLink>
                        </li>

                        {!user && (
                            <li>
                                <NavLink
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? "red" : "black"
                                        };
                                    }}
                                    className="menu__link"
                                    to="/login"
                                >
                                    <LoginIcon />
                                    <span
                                        style={{
                                            fontSize: "1.2rem",
                                            paddingLeft: "0.5rem"
                                        }}
                                    >
                                        Login
                                    </span>
                                </NavLink>
                            </li>
                        )}
                        {!user && (
                            <li>
                                <NavLink
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? "red" : "black"
                                        };
                                    }}
                                    className="menu__link"
                                    to="/signup"
                                >
                                    <AccountCircleIcon />
                                    <span
                                        style={{
                                            fontSize: "1.2rem",
                                            paddingLeft: "0.5rem"
                                        }}
                                    >
                                        SignUp
                                    </span>
                                </NavLink>
                            </li>
                        )}
                        <li>
                            {user ? (
                                <NavLink
                                    className="menu__link"
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? "red" : "black"
                                        };
                                    }}
                                    to="/login"
                                    onClick={userLogout}
                                >
                                    <LogoutIcon />
                                    <span
                                        style={{
                                            fontSize: "1.2rem",
                                            paddingLeft: "0.5rem"
                                        }}
                                    >
                                        Logout
                                    </span>
                                </NavLink>
                            ) : (
                                ""
                            )}
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/product" element={<Product />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductDetails />}
                    />
                    <Route
                        path="/cart"
                        element={
                            <PrivateRoute>
                                <Cart />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/wishlist"
                        element={
                            <PrivateRoute>
                                <Wishlist />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route path="/*" element={<PageNotFound />} />
                    <Elements stripe={stripePromise}>
                        <Route path="/cart/checkout/" element={<Checkout />} />
                    </Elements>
                </Routes>
            </div>
        </div>
    );
}
