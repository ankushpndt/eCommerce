import axios from "axios";
import {
    errorToastWishlist,
    successToast,
    successToastWishlist,
    errorToast
} from "../components/toasts";
export const getProducts = async (setLoader, dispatch) => {
    try {
        setLoader(true);
        const response = await axios.get(
            "https://backend.ankushpndt.repl.co/products"
        );

        if (response?.data) {
            setLoader(false);
            dispatch({ type: "GET", payload: response.data.products });
        }
    } catch (error) {
        dispatch({ type: "ERROR" });
    }
};
export const getWishlistItems = async (token, dispatch) => {
    try {
        const response = await axios.get(
            "https://backend.ankushpndt.repl.co/wishlist",

            { headers: { "auth-token": token } }
        );
        dispatch({
            type: "GET_FROM_WISHLIST",
            payload: response.data.wishlist
        });
    } catch (error) {
        console.log(error);
    }
};
export const getCartItems = async (token, dispatch) => {
    try {
        const response = await axios.get(
            "https://backend.ankushpndt.repl.co/cart",

            { headers: { "auth-token": token } }
        );

        dispatch({ type: "GET", payload: response.data.cart });
    } catch (error) {
        console.log(error);
    }
};
export const addItemsToCart = async ({ _id, token, dispatch }) => {
    console.log(_id);
    try {
        const res = await axios.post(
            `https://backend.ankushpndt.repl.co/cart/${_id}`,
            {
                _id: _id
            },

            { headers: { "auth-token": token } }
        );
        console.log(res.data);
        dispatch({
            type: "ADD_ITEM",
            payload: res.data.Updatedcart
        });
    } catch (error) {
        // errorToast(res.message);
        alert(error);
    } finally {
        successToast();
    }
};
export const deleteItemFromCart = async ({ _id, token, dispatch }) => {
    console.log(_id);
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/cart/${_id}`,

            { headers: { "auth-token": token } }
        );
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: "UPDATE_CART",
                payload: response.data.Updatedcart
            });
        }
    } catch (err) {
        console.log(err.response);
    } finally {
        errorToast();
    }
};
export const updateQuantity = async (action, text, token, dispatch) => {
    // console.log(action);
    try {
        let quantity = action.quantity;
        if (text === "ADD") {
            quantity += 1;
        } else if (text === "SUB") {
            if (quantity > 1) {
                quantity -= 1;
            } else {
                deleteItemFromCart(action);
            }
        }

        const response = await axios.post(
            `https://backend.ankushpndt.repl.co/cart/${action.productId._id}/${quantity}`,
            { _id: action.productId._id },
            { headers: { "auth-token": token } }
        );

        if (response.status === 200) {
            dispatch({
                type: "UPDATE_CART",
                payload: response.data.Updatedcart
            });
        }
    } catch (err) {
        console.log(err);
    }
};
export const addItemsToWishlist = async ({ _id, token, dispatch }) => {
    console.log(_id);
    try {
        const response = await axios.post(
            `https://backend.ankushpndt.repl.co/wishlist/${_id}`,
            {
                _id
            },

            { headers: { "auth-token": token } }
        );
        if (response.status === 200) {
            dispatch({
                type: "ADD_WISHLIST_ITEM",
                payload: response.data.Updatedwishlist
            });
            successToastWishlist();
        }
    } catch (error) {
        console.log(error);
    }
};
export const removeItemFromWishlist = async ({ _id, token, dispatch }) => {
    console.log(_id);
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/wishlist/${_id}`,
            { headers: { "auth-token": token } }
        );
        console.log(response);
        if (response.status === 200) {
            dispatch({
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
export const getAddress = async (dispatch, userId) => {
    try {
        const response = await axios.get(
            `https://backend.ankushpndt.repl.co/address/get/${userId}`
        );
        if (response.status === 200) {
            dispatch({
                type: "GET_ADDRESS",
                payload: response.data.getAllAddress
            });
        }
    } catch (error) {
        console.log(error);
    }
};
export const addAddress = async ({
    _id,
    name,
    mobileno,
    pincode,
    address,
    dispatch
}) => {
    try {
        const response = await axios.post(
            `https://backend.ankushpndt.repl.co/address/add`,
            {
                userId: _id,
                name,
                mobileno,
                pincode,
                address
            }
        );
        console.log(response.data);
        if (response.status === 200) {
            dispatch({
                type: "ADD_ADDRESS",
                payload: response.data.savedAddress
            });
        }
    } catch (error) {
        console.log(error);
    }
};
export const updateAddress = async ({
    _id,
    name,
    mobileno,
    pincode,
    address,
    dispatch,
    addressId
}) => {
    try {
        const response = await axios.put(
            `https://backend.ankushpndt.repl.co/address/update/${addressId}`,
            {
                userId: _id,
                name,
                mobileno,
                pincode,
                address
            }
        );
        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: "UPDATE_ADDRESS",
                payload: response.data.updatedAddress
            });
        }
    } catch (error) {
        console.log(error);
    }
};
export const deleteAddress = async ({ dispatch, addressId }) => {
    console.log(addressId);
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/address/delete/${addressId}`
        );
        console.log(response.data);
        if (response.status === 200) {
            dispatch({
                type: "DELETE_ADDRESS",
                payload: response.data.deleteAddress
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getReview = async (dispatch, userId) => {
    try {
        const response = await axios.get(
            `https://backend.ankushpndt.repl.co/review/get/${userId}`
        );
        console.log(response.data);
        if (response.status === 200) {
            dispatch({
                type: "GET_REVIEW",
                payload: response.data.getAllReview
            });
        }
    } catch (error) {
        console.log(error);
    }
};
export const addReview = async ({
    userId,
    productId,
    name,
    review,
    reviewDispatch,
    rating
}) => {
    try {
        const response = await axios.post(
            `https://backend.ankushpndt.repl.co/review/add`,
            {
                userId,
                productId,
                name,
                review,
                rating
            }
        );
        console.log(response);
        if (response.status === 200) {
            reviewDispatch({
                type: "ADD_REVIEW",
                payload: response.data.allReviews
            });
        }
    } catch (error) {
        console.log(error);
    }
};
export const deleteReview = async ({ reviewDispatch, reviewId }) => {
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/review/delete/${reviewId}`
        );
        console.log(response);
        if (response.status === 200) {
            reviewDispatch({
                type: "DELETE_REVIEW",
                payload: response.data.deletedReview
            });
        }
    } catch (error) {
        console.log(error);
    }
};
