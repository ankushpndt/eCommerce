import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import "./Navbar.css";
import { useAuth } from "../Context/authContext";
import { useCart } from "../Context/cart-context";
export const Navbar = () => {
    const { user } = useAuth();
    const { itemsInCart, wishlist } = useCart();
    return (
        <div className="bottom__navbar__container">
            <NavLink
                style={({ isActive }) => {
                    return { color: isActive ? "#38bdf8" : "white" };
                }}
                to="/"
                className="bottom__navbar__route"
            >
                <HomeIcon />
                <span
                    style={{
                        fontSize: "small",
                        textAlign: "center",
                        width: "50px",
                        lineHeight: "0.75rem",
                        fontWeight: "bold"
                    }}
                >
                    Home
                </span>
            </NavLink>
            <NavLink
                style={({ isActive }) => {
                    return { color: isActive ? "#38bdf8" : "white" };
                }}
                className="bottom__navbar__route"
                to="/product"
            >
                <FormatListBulletedIcon />
                <span
                    style={{
                        fontSize: "small",
                        textAlign: "center",
                        width: "50px",
                        lineHeight: "0.75rem",
                        fontWeight: "bold"
                    }}
                >
                    Products
                </span>
            </NavLink>
            <NavLink
                style={({ isActive }) => {
                    return { color: isActive ? "#38bdf8" : "white" };
                }}
                className="bottom__navbar__route"
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
                <span
                    style={{
                        fontSize: "small",
                        textAlign: "center",
                        width: "50px",
                        lineHeight: "0.75rem",
                        fontWeight: "bold"
                    }}
                >
                    Cart
                </span>
            </NavLink>
            <NavLink
                style={({ isActive }) => {
                    return { color: isActive ? "#38bdf8" : "white" };
                }}
                className="bottom__navbar__route"
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
                <span
                    style={{
                        fontSize: "small",
                        textAlign: "center",
                        width: "50px",
                        lineHeight: "0.75rem",
                        fontWeight: "bold"
                    }}
                >
                    Wishlist
                </span>
            </NavLink>
        </div>
    );
};
