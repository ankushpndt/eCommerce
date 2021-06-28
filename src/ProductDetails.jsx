import React from "react";
import { useProduct } from "./productContext";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import { useCart } from "./cart-context";
import { checkItem } from "./checkItem";
import axios from "axios";
import { useAuth } from "./auth/authContext";
import {
    errorToastWishlist,
    successToast,
    successToastWishlist
} from "./components/toasts";
// import { ToastContainer } from "react-toastify";
export const ProductDetails = () => {
    const { products } = useProduct();

    const { productId } = useParams();
    const productFindById = products.find(
        (product) => product._id === productId
    );
    const navigate = useNavigate();
    const { itemsInCart, wishlist, dataDispatch } = useCart();
    const { token } = useAuth();
    const addItemsToCart = async (action) => {
        try {
            const res = await axios.post(
                `https://backend.ankushpndt.repl.co/cart/${action._id}`,
                {
                    _id: action._id
                },

                { headers: { "auth-token": token } }
            );
            if (res.status === 200) {
                dataDispatch({
                    type: "ADD_ITEM",
                    payload: res.data.Updatedcart
                });
            }
            successToast();
        } catch (error) {
            console.log(error);
        }
    };
    const addItemsToWishlist = async (action) => {
        try {
            const response = await axios.post(
                `https://backend.ankushpndt.repl.co/wishlist/${action._id}`,
                {
                    _id: action._id
                },

                { headers: { "auth-token": token } }
            );
            if (response.status === 200) {
                dataDispatch({
                    type: "ADD_WISHLIST_ITEM",
                    payload: response.data.Updatedwishlist
                });
                successToastWishlist();
            }
        } catch (error) {
            console.log(error.response);
        }
    };
    return [productFindById].map(
        ({ _id, name, price, ratings, image, seller }) => {
            return (
                <div key={_id} className="productDetails">
                    <div className="productImage">
                        <img
                            src={image}
                            alt={name}
                            width="350px"
                            height="450px"
                            style={{
                                border: "2px solid #f0f0f0",
                                padding: "1rem"
                            }}
                        />
                        <button
                            className="card__btn btn__hollow"
                            // disabled={inStock ? false : true}
                            onClick={() =>
                                addItemsToCart({
                                    _id
                                })
                                    ? itemsInCart.find(
                                          (product) =>
                                              product.productId?._id === _id
                                      )
                                        ? navigate("/cart")
                                        : ""
                                    : ""
                            }
                        >
                            <span>
                                <i className="fas fa-shopping-cart"></i>{" "}
                                {itemsInCart.find(
                                    (product) => product.productId?._id === _id
                                )
                                    ? "Go To Cart"
                                    : "Add to cart"}
                            </span>
                        </button>
                        <button
                            className="product__wishlist card__btn btn__hollow"
                            style={{
                                color: `${
                                    checkItem(wishlist, _id)
                                        ? "#DC2626"
                                        : "#D1D5DB"
                                }`
                            }}
                            onClick={() => {
                                checkItem(wishlist, _id)
                                    ? removeItemFromWishlist({
                                          _id,
                                          name,
                                          image,
                                          discount,
                                          seller,
                                          ratings,
                                          inStock,
                                          fastDelivery
                                      })
                                    : addItemsToWishlist({
                                          _id
                                      });

                                // errorToastWishlist();
                            }}
                        >
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                    <div className="productInfo">
                        <div
                            className="productName"
                            style={{ paddingBottom: "1rem" }}
                        >
                            {name}
                        </div>
                        <div
                            className="badge__success"
                            style={{
                                width: "3rem",
                                margin: "0rem",
                                textAlign: "left",
                                padding: "0.2rem 0rem"
                            }}
                        >
                            <span
                                className="rating"
                                style={{
                                    paddingLeft: "0.5rem",
                                    gap: 0,
                                    paddingRight: "2px"
                                }}
                            >
                                {ratings}
                                <i className="fas fa-star"></i>
                            </span>
                        </div>
                        <p className="price">Rs.{price}</p>
                        <div className="offers">
                            <h4
                                style={{
                                    borderBottom: "1px solid #f0f0f0",
                                    padding: "1.5rem 1rem"
                                }}
                            >
                                Available offers
                            </h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p style={{ padding: "1rem" }}>
                                                Bank Offer 5% Unlimited Cashback
                                                on any Credit Card
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="warranty">
                            <h4
                                style={{
                                    borderBottom: "1px solid #f0f0f0",
                                    padding: "1.5rem 1rem"
                                }}
                            >
                                Warranty
                            </h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "1rem" }}>
                                            {" "}
                                            6 months
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="seller">
                            <h4
                                style={{
                                    borderBottom: "1px solid #f0f0f0",
                                    padding: "1.5rem 1rem"
                                }}
                            >
                                Seller
                            </h4>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: "1rem 1rem" }}>
                                            {seller}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="specifications">
                            <h3
                                style={{
                                    borderBottom: "1px solid #f0f0f0",
                                    padding: "1.5rem 1rem"
                                }}
                            >
                                Specifications
                            </h3>
                            <div className="specs">
                                <p
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "1.5rem",
                                        padding: "0.5rem 0"
                                    }}
                                >
                                    General
                                </p>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{ paddingRight: "4rem" }}
                                            >
                                                Title name
                                            </td>
                                            <td>{name}</td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ paddingRight: "4rem" }}
                                            >
                                                Platform
                                            </td>
                                            <td>PS4</td>
                                        </tr>
                                        <tr>
                                            <td
                                                style={{ paddingRight: "4rem" }}
                                            >
                                                Edition
                                            </td>
                                            <td>Standard Edition</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="reviews">
                            <h4>Reviews</h4>
                        </div>
                    </div>
                </div>
            );
        }
    );
};
