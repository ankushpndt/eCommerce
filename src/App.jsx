import "./styles.css";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import Product from "./Product";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { Routes, Route, NavLink } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "./auth/authContext";
import { ProductDetails } from "./ProductDetails";
import { LandingPage } from "./LandingPage";
import { Checkout } from "./Checkout";
import { PageNotFound } from "./PageNotFound";
import { MyProfile } from "./MyProfile";
import { useProduct } from "./productContext";

export default function App() {
    const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
    const { userLogout, user } = useAuth();
    const { search, setSearch } = useProduct();
    return (
        <div className="App">
            <nav className="hamnav">
                <label for="hamburger">&#9776;</label>
                <input type="checkbox" id="hamburger" />
                <div className="hamitems">
                    <div className="logo">
                        <NavLink
                            to="/"
                            style={{ textDecoration: "none", color: "white" }}
                        >
                            eCommerce
                        </NavLink>
                    </div>
                    <div className="searchbar">
                        <input
                            type="text"
                            value={search}
                            className="input__outline"
                            placeholder="Search"
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
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
                        activeStyle={{ fontWeight: "bold" }}
                        to="/product"
                        end
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
                        activeStyle={{ fontWeight: "bold" }}
                        to="/cart"
                    >
                        <i className="fas fa-shopping-cart"></i> Cart
                    </NavLink>{" "}
                    <NavLink
                        style={{
                            textDecoration: "none",
                            color: "white"
                        }}
                        activeStyle={{ fontWeight: "bold" }}
                        to="/wishlist"
                    >
                        <i className="fas fa-heart"></i> Wishlist
                    </NavLink>
                    {!user && (
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                            activeStyle={{ fontWeight: "bold" }}
                            to="/login"
                        >
                            Login
                        </NavLink>
                    )}
                    {!user && (
                        <NavLink
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                            activeStyle={{ fontWeight: "bold" }}
                            to="/signup"
                        >
                            Sign Up
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

            <div>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/product" element={<Product />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductDetails />}
                    />
                    <PrivateRoute path="/cart" element={<Cart />} />
                    <PrivateRoute path="/wishlist" element={<Wishlist />} />
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
