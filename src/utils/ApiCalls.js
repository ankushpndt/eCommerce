import axios from "axios";
import {
    errorToastWishlist,
    successToast,
    successToastWishlist,
    errorToast
} from "../components/toasts";
export const addItemsToCart = async ({ _id, token, dataDispatch }) => {
    try {
        const res = await axios.post(
            `https://backend.ankushpndt.repl.co/cart/${_id}`,
            {
                _id: _id
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
export const deleteItemFromCart = async (action, token, dataDispatch) => {
    try {
        const response = await axios.delete(
            `https://backend.ankushpndt.repl.co/cart/${action.productId._id}`,

            { headers: { "auth-token": token } }
        );
        console.log(response);
        if (response.status === 200) {
            dataDispatch({
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
export const updateQuantity = async (action, text, token, dataDispatch) => {
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
            dataDispatch({
                type: "UPDATE_CART",
                payload: response.data.Updatedcart
            });
        }
    } catch (err) {
        console.log(err);
    }
};
export const addItemsToWishlist = async (action, dataDispatch) => {
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
export const removeItemFromWishlist = async (action, token) => {
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
