import "./styles.css";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Wishlist } from "./Pages/Wishlist";
import { Cart } from "./Pages/Cart";
import { Product } from "./Pages/Product";
import { Login } from "./auth/Login";
import { SignUp } from "./auth/SignUp";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "./Context/authContext";
import { ProductDetails } from "./Pages/ProductDetails";
import { LandingPage } from "./Pages/LandingPage";
import { PageNotFound } from "./Pages/PageNotFound";
import { Searchbar } from "./components/Searchbar";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ListIcon from "@mui/icons-material/List";
import { SavedAddress } from "./Pages/SavedAddress";
import { Payment } from "./Pages/Payment";
import { OrderSuccessful } from "./Pages/OrderSuccessful";
import { useCart } from "./Context/cart-context";
import { Navbar } from "./components/Navbar";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const App = () => {
    const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
    const { userLogout, user } = useAuth();
    const { itemsInCart, wishlist } = useCart();
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
                    <div className="icons">
                        {user && (
                            <div style={{ color: "white", padding: "1rem" }}>
                                Welcome, {user}
                            </div>
                        )}
                        <NavLink style={{ color: "white" }} to="/product">
                            Products
                        </NavLink>
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                            to="/cart"
                        >
                            <div className="cart__icon__container">
                                <span className="cart__icon">
                                    <ShoppingCartIcon />
                                </span>
                                {user && (
                                    <span className="cart__number">
                                        {" "}
                                        {itemsInCart?.length}
                                    </span>
                                )}
                            </div>
                        </NavLink>
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                            to="/wishlist"
                        >
                            <div className="wishlist__icon__container">
                                <span className="wishlist__icon">
                                    {" "}
                                    <FavoriteIcon />
                                </span>
                                {user && (
                                    <span className="wishlist__number">
                                        {" "}
                                        {wishlist?.length}
                                    </span>
                                )}
                            </div>
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
                <div className="bottom__navbar">
                    <Navbar />
                </div>
                <div
                    className={open ? "menu__drawer__active" : "menu__drawer"}
                    onClick={() => setOpen(false)}
                >
                    <ul className="menu">
                        <li>
                            {" "}
                            <NavLink
                                style={({ isActive }) => ({
                                    color: isActive ? "#4c1d95" : "black"
                                })}
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
                                        color: isActive ? "#4c1d95" : "black"
                                    };
                                }}
                                className="menu__link"
                                to="/product"
                            >
                                <ListIcon />
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingLeft: "0.5rem",
                                        display: "flex",
                                        gap: "0.5rem"
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
                                        color: isActive ? "#4c1d95" : "black"
                                    };
                                }}
                                className="menu__link"
                                to="/cart"
                            >
                                <ShoppingCartIcon />
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingLeft: "0.5rem",
                                        display: "flex",
                                        gap: "0.5rem",
                                        alignItems: "center"
                                    }}
                                >
                                    Cart
                                    {user && (
                                        <span
                                            style={{
                                                backgroundColor: "#ef4444",
                                                borderRadius: "80%",
                                                color: "white",
                                                padding: "1px 5.5px 1px 6px"
                                            }}
                                        >
                                            {" "}
                                            {itemsInCart?.length}
                                        </span>
                                    )}
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? "#4c1d95" : "black"
                                    };
                                }}
                                className="menu__link"
                                to="/wishlist"
                            >
                                <FavoriteIcon />
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                        paddingLeft: "0.5rem",
                                        display: "flex",
                                        gap: "0.5rem",
                                        alignItems: "center"
                                    }}
                                >
                                    Wishlist
                                    {user && (
                                        <span
                                            style={{
                                                backgroundColor: "#ef4444",
                                                borderRadius: "80%",
                                                color: "white",
                                                padding: "1px 5.5px 1px 6px"
                                            }}
                                        >
                                            {" "}
                                            {wishlist?.length}
                                        </span>
                                    )}
                                </span>
                            </NavLink>
                        </li>

                        {!user && (
                            <li>
                                <NavLink
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive
                                                ? "#4c1d95"
                                                : "black"
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
                                            color: isActive
                                                ? "#4c1d95"
                                                : "black"
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
                                            color: isActive
                                                ? "#4c1d95"
                                                : "black"
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
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/product" element={<Product />} />

                <Route
                    path="/product/:productId"
                    element={
                        <PrivateRoute>
                            <ProductDetails />
                        </PrivateRoute>
                    }
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

                <Route path="/cart/savedaddress" element={<SavedAddress />} />
                <Route
                    path="/cart/payment/:addressId"
                    element={
                        <Elements stripe={stripePromise}>
                            <Payment />
                        </Elements>
                    }
                />
                <Route
                    path="/cart/payment/success"
                    element={<OrderSuccessful />}
                />

                <Route path="/*" element={<PageNotFound />} />
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                transition={Slide}
                theme="dark"
            />
        </div>
    );
};
