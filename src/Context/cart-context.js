import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState
} from "react";
import { useAuth } from "./authContext";
import { getCartItems, getWishlistItems } from "../utils/ApiCalls";
import { CartWishlistReducer } from "../Reducers/CartWishlistReducer";
export const data = { itemsInCart: [], wishlist: [] };
export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useAuth();
    const [loader, setLoader] = useState(false);
    //getting items from the cart
    useEffect(() => {
        if (token) {
            getCartItems(token, dispatch, setLoader);
            getWishlistItems(token, dispatch, setLoader);
        }
    }, [dispatch, token]);

    const [{ itemsInCart, wishlist }, dispatch] = useReducer(
        CartWishlistReducer,
        data
    );

    return (
        <cartContext.Provider
            value={{ itemsInCart, wishlist, dispatch, loader, setLoader }}
        >
            <>{children} </>
        </cartContext.Provider>
    );
};

export const useCart = () => useContext(cartContext);
