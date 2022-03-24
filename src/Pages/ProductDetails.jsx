import React, { useState } from "react";
import { useProduct } from "../Context/productContext";
import { useParams, useNavigate } from "react-router-dom";
import "../styles.css";
import { useCart } from "../Context/cart-context";
import { checkItem } from "../checkItem";
import { useAuth } from "../Context/authContext";
import {
    addItemsToCart,
    addItemsToWishlist,
    addReview,
    removeItemFromWishlist,
    deleteReview
} from "../utils/ApiCalls";
import { v4 } from "uuid";
import { Loader } from "../components/Loader";
import { useReview } from "../Context/reviewContext";
import { Rating } from "../components/Rating";
export const ProductDetails = () => {
    const { products } = useProduct();
    const { userId } = useAuth();
    const { productId } = useParams();
    const { review } = useReview();
    const productFindById = products.find(
        (product) => product._id === productId
    );
    const productDetails = [productFindById];
    const navigate = useNavigate();
    const { itemsInCart, wishlist, dispatch } = useCart();
    const { token } = useAuth();
    const [reviewText, setReviewText] = useState("");
    const [reviewId, setReviewId] = useState("");
    review?.forEach((item) => {
        () => setReviewId(item?._id);
    });
    const [rating, setRating] = useState(0);
    return (
        <main>
            {products.length ? (
                productDetails?.map(
                    ({ _id, name, price, ratings, image, seller, inStock }) => {
                        return (
                            <div
                                key={v4()}
                                className="single__product__details"
                            >
                                <div className="single__product__image">
                                    <img
                                        src={image}
                                        alt={name}
                                        width="100%"
                                        style={{
                                            padding: "1rem"
                                        }}
                                    />
                                    <div className="card__btn__container">
                                        <button
                                            className="card__btn card__product__btn"
                                            disabled={inStock ? false : true}
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
                                                    ? removeItemFromWishlist({
                                                          _id,
                                                          token,
                                                          dispatch
                                                      })
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
                                </div>
                                <div className="single__product__info">
                                    <div
                                        className="single__product__name"
                                        style={{ paddingBottom: "1rem" }}
                                    >
                                        {name}
                                    </div>
                                    <div
                                        className="badge__success"
                                        style={{
                                            width: "2.5rem",
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
                                            <i
                                                className="fas fa-star"
                                                style={{ marginLeft: "0.2rem" }}
                                            ></i>
                                        </span>
                                    </div>
                                    <p className="price">Rs.{price}</p>
                                    <div className="offers">
                                        <h4
                                            style={{
                                                borderBottom:
                                                    "1px solid #f0f0f0",
                                                padding: "1.5rem 1rem"
                                            }}
                                        >
                                            Available offers
                                        </h4>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p
                                                            style={{
                                                                padding: "1rem"
                                                            }}
                                                        >
                                                            Bank Offer 5%
                                                            Cashback on any
                                                            Credit Card
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="warranty">
                                        <h4
                                            style={{
                                                borderBottom:
                                                    "1px solid #f0f0f0",
                                                padding: "1.5rem 1rem"
                                            }}
                                        >
                                            Warranty
                                        </h4>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            padding: "1rem"
                                                        }}
                                                    >
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
                                                borderBottom:
                                                    "1px solid #f0f0f0",
                                                padding: "1.5rem 1rem"
                                            }}
                                        >
                                            Seller
                                        </h4>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td
                                                        style={{
                                                            padding: "1rem 1rem"
                                                        }}
                                                    >
                                                        {seller}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="specifications">
                                        <h3
                                            style={{
                                                borderBottom:
                                                    "1px solid #f0f0f0",
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
                                                            style={{
                                                                paddingRight:
                                                                    "4rem"
                                                            }}
                                                        >
                                                            Title name
                                                        </td>
                                                        <td>{name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                paddingRight:
                                                                    "4rem"
                                                            }}
                                                        >
                                                            Platform
                                                        </td>
                                                        <td>PS4</td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style={{
                                                                paddingRight:
                                                                    "4rem"
                                                            }}
                                                        >
                                                            Edition
                                                        </td>
                                                        <td>
                                                            Standard Edition
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="reviews">
                                        <h4>Reviews</h4>
                                        <div className="add__review">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();

                                                    addReview({
                                                        userId,
                                                        name: reviewText,
                                                        dispatch,
                                                        rating
                                                    });
                                                }}
                                            >
                                                <Rating
                                                    rating={rating}
                                                    setRating={setRating}
                                                />
                                                <input
                                                    type="text"
                                                    onChange={(e) =>
                                                        setReviewText(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={reviewText}
                                                    autoFocus
                                                />

                                                <button type="submit">
                                                    Add review
                                                </button>
                                            </form>
                                        </div>
                                        {review?.map((item) => {
                                            return (
                                                <div
                                                    key={v4()}
                                                    className="single__review"
                                                >
                                                    <p>{item?.name}</p>
                                                    <p>{item?.review}</p>
                                                    <p>{item?.rating}</p>
                                                    <button
                                                        onClick={() =>
                                                            deleteReview({
                                                                dispatch,
                                                                reviewId:
                                                                    item?._id
                                                            })
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )
            ) : (
                <Loader />
            )}
        </main>
    );
};
