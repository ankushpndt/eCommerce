import axios from "axios";
import React, { useEffect } from "react";
import { useCart } from "../Context/cart-context";
import { errorToast, successToastWishlist } from "../components/toasts";
import { ToastContainer } from "react-toastify";
import "./Cart.css";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import {
    addItemsToWishlist,
    deleteItemFromCart,
    updateQuantity
} from "../utils/ApiCalls";
export const Cart = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { itemsInCart, dataDispatch } = useCart();

    return (
        <div className="Cart">
            <main className="cart__main">
                <ul key={Date.now()}>
                    {itemsInCart?.length > 0 ? (
                        itemsInCart.map((item, index) => {
                            console.log(item);
                            return (
                                <div key={Math.random()} className="product">
                                    <div className="product__wrapper">
                                        {" "}
                                        <div
                                            key={Math.random()}
                                            className="images"
                                        >
                                            <img
                                                src={item?.productId?.image}
                                                alt="error"
                                            />
                                        </div>
                                        <div className="product__details">
                                            <h2
                                                style={{
                                                    paddingBottom: "0.2rem 0"
                                                }}
                                            >
                                                {item?.productId?.name}
                                            </h2>
                                            <small>
                                                Seller:{" "}
                                                {item?.productId?.seller}
                                            </small>
                                            <div
                                                style={{ padding: "0.2rem 0" }}
                                            >
                                                ₹{item?.productId?.price}
                                            </div>

                                            <div className="product__btn">
                                                <div className="icon__btn">
                                                    <button
                                                        style={{
                                                            backgroundColor:
                                                                "transparent",
                                                            border: "none",

                                                            paddingRight:
                                                                "1rem",
                                                            cursor: "pointer",
                                                            paddingTop: "0.2rem"
                                                        }}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item,
                                                                "ADD",
                                                                token,
                                                                dataDispatch
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className="fa fa-plus"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </button>
                                                    <span>
                                                        {item?.quantity}
                                                    </span>

                                                    <button
                                                        style={{
                                                            backgroundColor:
                                                                "transparent",
                                                            border: "none",
                                                            paddingLeft: "1rem",
                                                            cursor: "pointer",
                                                            paddingTop: "0.2rem"
                                                        }}
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item,
                                                                "SUB",
                                                                token,
                                                                dataDispatch
                                                            )
                                                        }
                                                    >
                                                        <i
                                                            className="fa fa-minus"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </button>

                                                    <button
                                                        style={{
                                                            backgroundColor:
                                                                "transparent",
                                                            border: "none",
                                                            paddingLeft: "1rem",
                                                            paddingTop:
                                                                "0.2rem",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() =>
                                                            deleteItemFromCart(
                                                                item,
                                                                token,
                                                                dataDispatch
                                                            )
                                                        }
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                                <button
                                                    className="card__btn btn__hollow card__btn__cart"
                                                    onClick={() => {
                                                        addItemsToWishlist(
                                                            item,
                                                            token,
                                                            dataDispatch
                                                        );
                                                        deleteItemFromCart(
                                                            item,
                                                            token,
                                                            dataDispatch
                                                        );
                                                    }}
                                                >
                                                    Save For Later
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ textAlign: "center" }}>
                            Your cart is empty
                        </p>
                    )}
                </ul>
            </main>
            {itemsInCart.length > 0 && (
                <div className={"price__details"} style={{ padding: "1rem" }}>
                    <h3 style={{ paddingBottom: "1rem" }}>Price Details</h3>
                    <hr />
                    <div className="product__discount">
                        <p
                            style={{
                                paddingTop: "1rem",
                                paddingBottom: "0.5rem"
                            }}
                        >
                            Discount{" "}
                            <span style={{ color: "#38a169" }}>
                                - ₹
                                {itemsInCart.reduce(
                                    (total, i) =>
                                        parseInt(total) +
                                        parseInt(i?.productId?.discount),
                                    0
                                )}
                            </span>
                        </p>
                    </div>
                    <div className="product__delivery">
                        <p style={{ padding: "0.5rem 0" }}>
                            Delivery Charges{" "}
                            <span style={{ color: "#38a169" }}>FREE</span>
                        </p>
                    </div>
                    <div className="product__total">
                        <h3 style={{ padding: "0.5rem 0" }}>
                            Total Amount ₹
                            {itemsInCart.reduce(
                                (total, i) =>
                                    parseInt(total) +
                                    parseInt(
                                        i?.productId?.price * i?.quantity
                                    ) -
                                    parseInt(i?.productId?.discount),
                                0
                            )}
                        </h3>
                    </div>
                    <button onClick={() => navigate("/cart/checkout")}>
                        Proceed to checkout
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};
