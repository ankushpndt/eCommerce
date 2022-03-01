import axios from "axios";
import {
    errorToastWishlist,
    successToast,
    successToastWishlist
} from "../components/toasts";
export const addItemsToCart = async (action) => {
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
export const addItemsToWishlist = async (action) => {
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
export const removeItemFromWishlist = async (action) => {
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
