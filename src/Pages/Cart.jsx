import React, { useEffect } from "react";
import { useCart } from "../Context/cart-context";
import { ToastContainer } from "react-toastify";
import "./Cart.css";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import {
    addItemsToWishlist,
    deleteItemFromCart,
    updateQuantity
} from "../utils/ApiCalls";
import { v4 } from "uuid";
import { getCartItems } from "../utils/ApiCalls";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loader } from "../components/Loader";
export const Cart = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { itemsInCart, dispatch, setLoader, loader } = useCart();

    useEffect(() => {
        if (token) {
            getCartItems(token, dispatch, setLoader);
        }
    }, [dispatch, token]);
    return (
        <div className="Cart">
            <main className="cart__main">
                {!loader ? (
                    <ul key={v4()}>
                        {itemsInCart?.length > 0 ? (
                            itemsInCart.map((item) => {
                                return (
                                    <div key={v4()} className="product">
                                        <div className="product__wrapper">
                                            {" "}
                                            <div key={v4()} className="images">
                                                <img
                                                    src={item?.productId?.image}
                                                    alt="error"
                                                />
                                            </div>
                                            <div className="product__details">
                                                <h2
                                                    style={{
                                                        paddingBottom:
                                                            "0.2rem 0"
                                                    }}
                                                >
                                                    {item?.productId?.name}
                                                </h2>
                                                <small>
                                                    Seller:{" "}
                                                    {item?.productId?.seller}
                                                </small>
                                                <div
                                                    style={{
                                                        paddingTop: "0.2rem"
                                                    }}
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
                                                                paddingTop:
                                                                    "0.2rem"
                                                            }}
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item,
                                                                    "ADD",
                                                                    token,
                                                                    dispatch
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
                                                                paddingLeft:
                                                                    "1rem",
                                                                cursor: "pointer",
                                                                paddingTop:
                                                                    "0.2rem"
                                                            }}
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item,
                                                                    "SUB",
                                                                    token,
                                                                    dispatch
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
                                                                paddingLeft:
                                                                    "1rem",
                                                                paddingTop:
                                                                    "0.2rem",
                                                                cursor: "pointer"
                                                            }}
                                                            onClick={() =>
                                                                deleteItemFromCart(
                                                                    {
                                                                        _id: item
                                                                            ?.productId
                                                                            ?._id,
                                                                        token,
                                                                        dispatch
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="card__btn  card__btn__cart"
                                                        onClick={() => {
                                                            deleteItemFromCart({
                                                                _id: item
                                                                    ?.productId
                                                                    ?._id,
                                                                token,
                                                                dispatch
                                                            });
                                                            addItemsToWishlist({
                                                                _id: item
                                                                    ?.productId
                                                                    ?._id,
                                                                token,
                                                                dispatch
                                                            });
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
                            <p
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                Your cart is empty
                            </p>
                        )}
                    </ul>
                ) : (
                    <Loader />
                )}
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
                    <button
                        className="card__btn  card__btn__cart"
                        onClick={() => navigate("/cart/savedaddress")}
                    >
                        Proceed to buy
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};
