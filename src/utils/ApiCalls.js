import axios from "axios";
import { toast } from "react-toastify";
import {
    errorToast,
    successToast,
    successToastWishlist,
    errorToastWishlist
} from "../components/toasts";
export const getProducts = async (setLoader, dispatch) => {
    try {
        setLoader(true);
        const response = await axios.get(
            "https://backend.ankushpndt.repl.co/products"
        );

        if (response?.status === 200) {
            setLoader(false);
            dispatch({ type: "GET", payload: response.data.products });
        }
    } catch (error) {
        dispatch({ type: "ERROR" });
    }
};
export const getWishlistItems = async (token, dispatch, setLoader) => {
    try {
        setLoader(true);
        const response = await axios.get(
            "https://backend.ankushpndt.repl.co/wishlist",

            { headers: { "auth-token": token } }
        );
        dispatch({
            type: "GET_FROM_WISHLIST",
            payload: response.data.wishlist
        });
        setLoader(false);
    } catch (error) {
        console.log(error);
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const getCartItems = async (token, dispatch, setLoader) => {
    try {
        setLoader(true);
        const response = await axios.get(
            "https://backend.ankushpndt.repl.co/cart",

            { headers: { "auth-token": token } }
        );

        dispatch({ type: "GET", payload: response.data.cart });
        setLoader(false);
    } catch (error) {
        console.log(error);
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const addItemsToCart = async ({ _id, token, dispatch }) => {
    try {
        const res = await axios.post(
            `https://backend.ankushpndt.repl.co/cart/${_id}`,
            {
                _id: String(_id)
            },

            { headers: { "auth-token": token } }
        );

        dispatch({
            type: "ADD_ITEM",
            payload: res.data.Updatedcart
        });

        toast.success(res.data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const deleteItemFromCart = async ({ _id, token, dispatch }) => {
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/cart/${_id}`,

            { headers: { "auth-token": token } }
        );

        if (response.status === 200) {
            dispatch({
                type: "UPDATE_CART",
                payload: response.data.Updatedcart
            });
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const updateQuantity = async (action, text, token, dispatch) => {
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
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const addItemsToWishlist = async ({ _id, token, dispatch }) => {
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
            toast.success(res.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const removeItemFromWishlist = async ({ _id, token, dispatch }) => {
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/wishlist/${_id}`,
            { headers: { "auth-token": token } }
        );

        if (response.status === 200) {
            dispatch({
                type: "REMOVE_WISHLIST_ITEM",
                payload: response.data.Updatedwishlist
            });
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
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
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
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

        if (response.status === 200) {
            dispatch({
                type: "ADD_ADDRESS",
                payload: response.data.savedAddress
            });
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
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

        if (response.status === 200) {
            dispatch({
                type: "UPDATE_ADDRESS",
                payload: response.data.updatedAddress
            });
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const deleteAddress = async ({ dispatch, addressId }) => {
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/address/delete/${addressId}`
        );

        if (response.status === 200) {
            dispatch({
                type: "DELETE_ADDRESS",
                payload: response.data.deleteAddress
            });
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};

export const getReview = async (dispatch, userId) => {
    try {
        const response = await axios.get(
            `https://backend.ankushpndt.repl.co/review/get/${userId}`
        );

        if (response.status === 200) {
            dispatch({
                type: "GET_REVIEW",
                payload: response.data.getAllReview
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
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

        if (response.status === 200) {
            reviewDispatch({
                type: "ADD_REVIEW",
                payload: response.data.allReviews
            });
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
export const deleteReview = async ({ reviewDispatch, reviewId }) => {
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/review/delete/${reviewId}`
        );

        if (response.status === 200) {
            reviewDispatch({
                type: "DELETE_REVIEW",
                payload: response.data.deletedReview
            });
            toast.success(response.data.message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    } catch (error) {
        toast.dark(error?.response?.data?.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true
        });
    }
};
