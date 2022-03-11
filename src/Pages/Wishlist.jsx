import React from "react";
import axios from "axios";
import { useCart } from "../Context/cart-context";
import { successToast, errorToastWishlist } from "../components/toasts";
import { ToastContainer } from "react-toastify";
import "./Cart.css";
import { useAuth } from "../Context/authContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItemFromWishlist, addItemsToCart } from "../utils/ApiCalls";
export const Wishlist = () => {
    const { token } = useAuth();

    const { wishlist, dispatch } = useCart();
    console.log(wishlist);
    return (
        <div
            className="Cart"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
        >
            <main>
                <ul key={Date.now()}>
                    {wishlist?.length > 0 ? (
                        wishlist?.map((item, i) => {
                            console.log(`wishlist item =>${i}`, { item });
                            return (
                                <div key={Math.random()} className="product">
                                    <div className="product__wrapper">
                                        <div
                                            key={Math.random()}
                                            className="images"
                                        >
                                            <img
                                                src={item.productId?.image}
                                                width="100%"
                                                height="auto"
                                                alt="err_wishlist"
                                            />
                                        </div>
                                        <div className="product__details">
                                            <h2>{item.productId?.name}</h2>
                                            <p>₹{item.productId?.price}</p>
                                            <div className="product__btn">
                                                <button
                                                    className="close"
                                                    onClick={() => {
                                                        removeItemFromWishlist({
                                                            _id: item?.productId
                                                                ?._id,
                                                            token,
                                                            dispatch
                                                        });
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </button>
                                                <button
                                                    className="card__btn btn__hollow card__btn__wishlist"
                                                    onClick={() => {
                                                        addItemsToCart({
                                                            _id: item?.productId
                                                                ?._id,
                                                            token,
                                                            dispatch
                                                        });
                                                        removeItemFromWishlist({
                                                            _id: item?.productId
                                                                ?._id,
                                                            token,
                                                            dispatch
                                                        });
                                                    }}
                                                >
                                                    Move to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Your wishlist is empty</p>
                    )}
                </ul>
            </main>
            <ToastContainer />
        </div>
    );
};
