import React from "react";
import { useCart } from "../Context/cart-context";
import { successToast, errorToastWishlist } from "../components/toasts";
import { ToastContainer } from "react-toastify";
import "./Cart.css";
import { useAuth } from "../Context/authContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeItemFromWishlist, addItemsToCart } from "../utils/ApiCalls";
import { v4 } from "uuid";
export const Wishlist = () => {
    const { token } = useAuth();

    const { wishlist, dispatch } = useCart();
    console.log(wishlist);
    return (
        <div
            className="Cart"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
        >
            <main className="wishlist__main">
                <ul key={v4()}>
                    {wishlist?.length > 0 ? (
                        wishlist?.map((item, i) => {
                            return (
                                <div
                                    key={v4()}
                                    className="product wishlist__product"
                                >
                                    <div className="product__wrapper">
                                        <div key={v4()} className="images">
                                            <img
                                                src={item.productId?.image}
                                                width="100%"
                                                height="auto"
                                                alt="err_wishlist"
                                            />
                                        </div>
                                        <div className="product__details">
                                            <h2>{item.productId?.name}</h2>
                                            <small>
                                                Seller:{" "}
                                                {item?.productId?.seller}
                                            </small>
                                            <p style={{ paddingTop: "0.2rem" }}>
                                                ₹{item.productId?.price}
                                            </p>
                                            <div className="product__btn wishlist__btn">
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
