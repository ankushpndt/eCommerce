import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState
} from "react";
import { productReducer } from "../Reducers/ProductReducer";
import { getProducts } from "../utils/ApiCalls";

const productContext = createContext();
export const ProductProvider = ({ children }) => {
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState("");
    useEffect(() => {
        getProducts(setLoader, dispatch);
    }, [setLoader, dispatch]);
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
};
export const useProduct = () => useContext(productContext);
