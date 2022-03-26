import React from "react";
import { useProduct } from "../Context/productContext";
import { useCart } from "../Context/cart-context";
import { Link } from "react-router-dom";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../Context/authContext";
import { checkItem } from "../checkItem";
import ScrollToTop from "../components/ScrollToTop";
import {
    addItemsToCart,
    addItemsToWishlist,
    removeItemFromWishlist
} from "../utils/ApiCalls";
import { v4 } from "uuid";
import { Loader } from "../components/Loader";
export const Product = () => {
    const { token } = useAuth();
    const { itemsInCart } = useCart();
    const { search } = useProduct();
    const navigate = useNavigate();

    const { wishlist, dispatch } = useCart();
    const {
        products,
        loader,
        sortBy,
        showFastDeliveryOnly,
        showInventoryAll,
        productDispatch
    } = useProduct();
    const getSortedData = (productList, sortBy) => {
        if (sortBy === "HIGH_TO_LOW") {
            return productList.sort((a, b) => b["price"] - a["price"]);
        }
        if (sortBy === "LOW_TO_HIGH") {
            return productList.sort((a, b) => a["price"] - b["price"]);
        }
        return productList;
    };
    const getFilteredData = (
        productList,
        { showFastDeliveryOnly, showInventoryAll }
    ) =>
        productList
            .filter(({ fastDelivery }) =>
                showFastDeliveryOnly ? fastDelivery : true
            )
            .filter(({ inStock }) => (showInventoryAll ? true : inStock));
    const getSearchData = (productList, search) =>
        productList.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
                ? item
                : !item
        );
    const sortedList = getSortedData(products, sortBy);
    const filteredData = getFilteredData(sortedList, {
        showFastDeliveryOnly,
        showInventoryAll
    });
    const searchedData = getSearchData(filteredData, search);

    return (
        <main>
            <h1>Products</h1>
            <div className="container">
                <div className="filters__container">
                    <div className="sortby">
                        <h5>Sort By</h5>
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
                    </div>
                    <div className="filters">
                        <h5>Filters</h5>
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
                    </div>
                </div>
                <main className="main">
                    {loader ? (
                        <Loader />
                    ) : (
                        searchedData.map(
                            ({
                                _id,
                                name,
                                image,
                                price,
                                ratings,
                                inStock,
                                discount,
                                fastDelivery,
                                seller
                            }) => (
                                <div
                                    key={v4()}
                                    style={{
                                        marginTop: "1rem"
                                    }}
                                >
                                    <div className="card__border">
                                        <Link
                                            style={{
                                                textDecoration: "none",
                                                color: "black"
                                            }}
                                            key={_id}
                                            to={`/product/${_id}`}
                                        >
                                            <img
                                                src={image}
                                                width="100%"
                                                alt={name}
                                                style={{ padding: "1rem" }}
                                            />
                                            <div
                                                className="badge__success"
                                                style={{
                                                    width: "4rem",
                                                    marginLeft: "1rem",
                                                    marginTop: "1rem",
                                                    paddingLeft: "0"
                                                }}
                                            >
                                                <span className="card__rating ">
                                                    {ratings}
                                                </span>
                                                <i className="fas fa-star"></i>
                                            </div>

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
                                                className="card__btn  card__product__btn"
                                                disabled={
                                                    inStock ? false : true
                                                }
                                                onClick={() => {
                                                    itemsInCart?.find(
                                                        (product) =>
                                                            product.productId
                                                                ?._id === _id
                                                    )
                                                        ? navigate("/cart")
                                                        : addItemsToCart({
                                                              _id,
                                                              token,
                                                              dispatch
                                                          });
                                                }}
                                            >
                                                <span>
                                                    <i className="fas fa-shopping-cart"></i>{" "}
                                                    {itemsInCart?.find(
                                                        (product) =>
                                                            product?.productId
                                                                ?._id === _id
                                                    )
                                                        ? "Go To Cart"
                                                        : "Add to cart"}
                                                </span>
                                            </button>

                                            <button
                                                className="product__wishlist card__btn"
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
                                                                  token,
                                                                  dispatch
                                                              }
                                                          )
                                                        : addItemsToWishlist({
                                                              _id,
                                                              token,
                                                              dispatch
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
};
