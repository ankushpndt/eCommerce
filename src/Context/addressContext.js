import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState
} from "react";
import { AddressReducer } from "../Reducers/AddressReducer";
import { getAddress } from "../utils/ApiCalls";
import { useAuth } from "./authContext";
export const addressContext = createContext();
export const AddressProvider = ({ children }) => {
    const { userId } = useAuth();
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        userId && getAddress(dispatch, userId);
    }, [dispatch]);
    const [state, dispatch] = useReducer(AddressReducer, { address: [] });
    return (
        <addressContext.Provider
            value={{ address: state.address, dispatch, loader, setLoader }}
        >
            <> {children}</>
        </addressContext.Provider>
    );
};
export const useAddress = () => useContext(addressContext);
