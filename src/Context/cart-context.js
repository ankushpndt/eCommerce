import { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./authContext";
import { getCartItems, getWishlistItems } from "../utils/ApiCalls";
import { CartWishlistReducer } from "../Reducers/CartWishlistReducer";
export const data = { itemsInCart: [], wishlist: [] };
export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useAuth();

    //getting items from the cart
    useEffect(() => {
        if (token) {
            getCartItems(token, dispatch);
            getWishlistItems(token, dispatch);
        }
    }, []);

    const [{ itemsInCart, wishlist }, dispatch] = useReducer(
        CartWishlistReducer,
        data
    );

    return (
        <cartContext.Provider value={{ itemsInCart, wishlist, dispatch }}>
            {console.log(itemsInCart)}
            <>{children} </>
        </cartContext.Provider>
    );
};

export const useCart = () => useContext(cartContext);
