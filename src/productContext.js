import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState
} from "react";

import axios from "axios";

function productReducer(state, action) {
    switch (action.type) {
        case "GET":
            return { ...state, products: action.payload };
        case "ERROR":
            return {
                ...state,
                products: [],
                error: "Couldn't get the products"
            };
        case "SORT":
            return { ...state, sortBy: action.payload };
        case "INCLUDE_OUT_OF_STOCK":
            return { ...state, showInventoryAll: !state.showInventoryAll };
        case "FAST_DELIVERY":
            return {
                ...state,
                showFastDeliveryOnly: !state.showFastDeliveryOnly
            };
        case "SEARCH":
            return { ...state, search: action.payload };
        default:
            return state;
    }
}

const productContext = createContext();
export function ProductProvider({ children }) {
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState("");
    useEffect(() => {
        try {
            (async function () {
                setLoader(true);
                const response = await axios.get(
                    "https://backend.ankushpndt.repl.co/products"
                );
                setLoader(false);
                dispatch({ type: "GET", payload: response.data.products });
            })();
        } catch (error) {
            dispatch({ type: "ERROR" });
        }
    }, []);
    const [state, dispatch] = useReducer(productReducer, {
        products: [],

        showInventoryAll: true,
        showFastDeliveryOnly: false,
        sortBy: null
    });

    return (
        <productContext.Provider
            value={{
                products: state.products,
                showInventoryAll: state.showInventoryAll,
                showFastDeliveryOnly: state.showFastDeliveryOnly,
                sortBy: state.sortBy,
                productDispatch: dispatch,
                search,
                setSearch,
                loader,
                setLoader
            }}
        >
            {children}
        </productContext.Provider>
    );
}
export function useProduct() {
    return useContext(productContext);
}
