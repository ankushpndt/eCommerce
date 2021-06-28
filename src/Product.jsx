import React, { useState } from "react";
import { useProduct } from "./productContext";
import { useCart } from "./cart-context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import {
    errorToastWishlist,
    successToast,
    successToastWishlist
} from "./components/toasts";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./auth/authContext";
import { checkItem } from "./checkItem";
import ScrollToTop from "./components/ScrollToTop";
import { PacmanLoader } from "react-spinners";
import { css } from "@emotion/react";
export default function Product() {
    const { token } = useAuth();
    const { itemsInCart } = useCart();
    const { search } = useProduct();
    const navigate = useNavigate();
    const addItemsToCart = async (action) => {
        try {
            const res = await axios.post(
                `https://backend.ankushpndt.repl.co/cart/${action._id}`,
                {
                    _id: action._id
                },

                { headers: { "auth-token": token } }
            );

            dataDispatch({
                type: "ADD_ITEM",
                payload: res.data.Updatedcart
            });
        } catch (error) {
            console.log(error);
        } finally {
            successToast();
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
    const removeItemFromWishlist = async (action) => {
        try {
            const response = await axios.delete(
                `https://backend.ankushpndt.repl.co/wishlist/${action._id}`,
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
    const { wishlist, dataDispatch } = useCart();
    const {
        products,
        loader,
        sortBy,
        showFastDeliveryOnly,
        showInventoryAll,
        productDispatch
    } = useProduct();
    function getSortedData(productList, sortBy) {
        if (sortBy === "HIGH_TO_LOW") {
            return productList.sort((a, b) => b["price"] - a["price"]);
        }
        if (sortBy === "LOW_TO_HIGH") {
            return productList.sort((a, b) => a["price"] - b["price"]);
        }
        return productList;
    }
    function getFilteredData(
        productList,
        { showFastDeliveryOnly, showInventoryAll }
    ) {
        return productList
            .filter(({ fastDelivery }) =>
                showFastDeliveryOnly ? fastDelivery : true
            )
            .filter(({ inStock }) => (showInventoryAll ? true : inStock));
    }
    function getSearchData(productList, search) {
        return productList.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
                ? item
                : !item
        );
    }
    const sortedList = getSortedData(products, sortBy);
    const filteredData = getFilteredData(sortedList, {
        showFastDeliveryOnly,
        showInventoryAll
    });
    const searchedData = getSearchData(filteredData, search);
    console.log(searchedData);
    return (
        <main>
            <h1>Products</h1>
            <div className="container">
                <div className="filters">
                    <fieldset>
                        <legend>Sort By</legend>
                        <label htmlFor="highToLow">
                            <input
                                type="radio"
                                id="highToLow"
                                checked={sortBy === "HIGH_TO_LOW"}
                                onChange={() =>
                                    productDispatch({
                                        type: "SORT",
                                        payload: "HIGH_TO_LOW"
                                    })
                                }
                            />
                            High to low
                        </label>
                        <label htmlFor="lowToHigh">
                            <input
                                type="radio"
                                id="lowToHigh"
                                checked={sortBy === "LOW_TO_HIGH"}
                                onChange={() =>
                                    productDispatch({
                                        type: "SORT",
                                        payload: "LOW_TO_HIGH"
                                    })
                                }
                            />
                            Low to high
                        </label>
                    </fieldset>
                    <fieldset>
                        <legend>Filters</legend>
                        <label htmlFor="stock">
                            <input
                                type="checkbox"
                                id="stock"
                                checked={showInventoryAll}
                                onChange={() =>
                                    productDispatch({
                                        type: "INCLUDE_OUT_OF_STOCK"
                                    })
                                }
                            />
                            Include out of stock
                        </label>
                        <label htmlFor="delivery">
                            <input
                                type="checkbox"
                                id="delivery"
                                checked={showFastDeliveryOnly}
                                onChange={() =>
                                    productDispatch({ type: "FAST_DELIVERY" })
                                }
                            />
                            Fast delivery
                        </label>
                    </fieldset>
                </div>
                <main className="main">
                    {loader ? (
                        <PacmanLoader
                            loading
                            size={100}
                            css={css`
                                display: block;
                                margin: 4rem 20rem;
                            `}
                            color="#a02620"
                        />
                    ) : (
                        searchedData.map(
                            (
                                {
                                    _id,
                                    name,
                                    image,
                                    price,
                                    ratings,
                                    inStock,
                                    discount,
                                    fastDelivery,
                                    seller
                                },
                                i
                            ) => (
                                <div
                                    key={i}
                                    style={{
                                        textAlign: "center",
                                        maxWidth: "650px",
                                        margin: "1rem auto"
                                    }}
                                >
                                    <div className="card__border">
                                        <img
                                            src={image}
                                            width="100%"
                                            alt={name}
                                        />
                                        <div
                                            className="badge__success"
                                            style={{
                                                width: "4rem",
                                                marginLeft: "1rem",
                                                paddingLeft: "0"
                                            }}
                                        >
                                            <span className="card__rating ">
                                                {ratings}
                                            </span>
                                            <i className="fas fa-star"></i>
                                        </div>
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "black"
                                            }}
                                            key={_id}
                                            to={`/product/${_id}`}
                                        >
                                            <div className="card__body">
                                                <h3 className="card__title">
                                                    {name}
                                                </h3>
                                                <div className="card__text">
                                                    {inStock && (
                                                        <div> In Stock </div>
                                                    )}
                                                    {!inStock && (
                                                        <div>
                                                            {" "}
                                                            Out of Stock{" "}
                                                        </div>
                                                    )}

                                                    {fastDelivery ? (
                                                        <div>
                                                            {" "}
                                                            Fast Delivery{" "}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {" "}
                                                            3 days minimum{" "}
                                                        </div>
                                                    )}
                                                </div>
                                                <h4 className="card__price">
                                                    Rs. {price}{" "}
                                                    <span className="card__old__price">
                                                        Rs.7945{" "}
                                                    </span>
                                                    <span className="card__discount">
                                                        {" "}
                                                        (45% OFF)
                                                    </span>
                                                </h4>
                                            </div>
                                        </Link>
                                        <div>
                                            <button
                                                className="card__btn btn__hollow"
                                                disabled={
                                                    inStock ? false : true
                                                }
                                                onClick={() =>
                                                    addItemsToCart({
                                                        _id
                                                    })
                                                        ? itemsInCart.find(
                                                              (product) =>
                                                                  product
                                                                      .productId
                                                                      ?._id ===
                                                                  _id
                                                          )
                                                            ? navigate("/cart")
                                                            : ""
                                                        : ""
                                                }
                                            >
                                                <span>
                                                    <i className="fas fa-shopping-cart"></i>{" "}
                                                    {itemsInCart.find(
                                                        (product) =>
                                                            product.productId
                                                                ?._id === _id
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
                                                        ? removeItemFromWishlist(
                                                              {
                                                                  _id,
                                                                  name,
                                                                  image,
                                                                  discount,
                                                                  seller,
                                                                  ratings,
                                                                  inStock,
                                                                  fastDelivery
                                                              }
                                                          )
                                                        : addItemsToWishlist({
                                                              _id
                                                          });

                                                    // errorToastWishlist();
                                                }}
                                            >
                                                <i className="fas fa-heart"></i>
                                            </button>
                                        </div>
                                    </div>{" "}
                                </div>
                            )
                        )
                    )}
                    <ScrollToTop />
                    <ToastContainer />
                </main>
            </div>
        </main>
    );
}
