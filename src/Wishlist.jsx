import React from "react";
import axios from "axios";
import { useCart } from "./cart-context";
import { successToast, errorToastWishlist } from "./components/toasts";
import { ToastContainer } from "react-toastify";
import "./Cart.css";
import { useAuth } from "./auth/authContext";
export default function Wishlist() {
    const { token } = useAuth();

    const { wishlist, dataDispatch } = useCart();
    const removeItemFromWishlist = async (action) => {
        try {
            const response = await axios.delete(
                `https://backend.ankushpndt.repl.co/wishlist/${action.productId._id}`,
                { headers: { "auth-token": token } }
            );

            if (response.status === 200) {
                dataDispatch({
                    type: "REMOVE_WISHLIST_ITEM",
                    payload: response.data.Updatedwishlist
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            errorToastWishlist();
        }
    };
    const addItemsToCart = async (action) => {
        try {
            const res = await axios.post(
                `https://backend.ankushpndt.repl.co/cart/${action.productId._id}`,
                {
                    _id: action.productId._id
                },
                { headers: { "auth-token": token } }
            );

            if (res.status === 200) {
                dataDispatch({
                    type: "ADD_ITEM",
                    payload: res.data.Updatedcart
                });
            }
        } catch (error) {
            console.log(error.res);
        } finally {
            successToast();
        }
    };
    return (
        <div
            className="Cart"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
        >
            <main>
                <ul key={Date.now()}>
                    {wishlist.length > 0 ? (
                        wishlist.map((item, i) => {
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
                                                        removeItemFromWishlist(
                                                            item
                                                        );
                                                    }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                                <button
                                                    className="card__btn btn__hollow"
                                                    onClick={() => {
                                                        addItemsToCart(item);
                                                        removeItemFromWishlist(
                                                            item
                                                        );
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
}
