import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authContext";

export const data = { itemsInCart: [], wishlist: [] };
export const cartContext = createContext();

export function CartProvider({ children }) {
    const { token } = useAuth();

    //getting items from the cart
    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        loadInitialDataWishlist();
    }, []);

    const loadInitialData = async () => {
        if (token) {
            try {
                const response = await axios.get(
                    "https://backend.ankushpndt.repl.co/cart",

                    { headers: { "auth-token": token } }
                );

                dispatch({ type: "GET", payload: response.data.cart });
            } catch (error) {
                console.log(error);
            }
        }
    };
    //getting product from wishlist
    const loadInitialDataWishlist = async () => {
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

    //adding item in the cart
    const addItem = (state, action) => {
        let newItemsInCart = [...state.itemsInCart];
        const productInCart = state.itemsInCart.some((product) => {
            product?._id === action.payload?._id;
        });

        if (productInCart) {
            loadInitialData();
            newItemsInCart = newItemsInCart.map((product) => {
                if (product._id === action.payload._id) {
                    //existing product
                    const productWithIncreased = { ...product };
                    productWithIncreased.quantity =
                        productWithIncreased.quantity + 1;
                    return productWithIncreased;
                }
                return product; //new product
            });
            return newItemsInCart;
        } else {
            loadInitialData();
            return [...state.itemsInCart, action.payload];
        }
    };

    const addItemToWishlist = (state, action) => {
        loadInitialDataWishlist();
        return [...state.wishlist, action.payload];
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "GET":
                return { ...state, itemsInCart: action.payload };
            case "GET_FROM_WISHLIST":
                return { ...state, wishlist: action.payload };
            case "ADD_ITEM":
                return { ...state, itemsInCart: addItem(state, action) };
            case "UPDATE_CART":
                return {
                    ...state,
                    itemsInCart: action.payload
                };

            case "ADD_WISHLIST_ITEM":
                return { ...state, wishlist: addItemToWishlist(state, action) };
            case "REMOVE_WISHLIST_ITEM":
                return {
                    ...state,
                    wishlist: action.payload
                };
            default:
                return state;
        }
    };

    const [{ itemsInCart, wishlist }, dispatch] = useReducer(reducer, data);

    return (
        <cartContext.Provider
            value={{ itemsInCart, wishlist, dataDispatch: dispatch }}
        >
            <>{children} </>
        </cartContext.Provider>
    );
}

export function useCart() {
    return useContext(cartContext);
}
