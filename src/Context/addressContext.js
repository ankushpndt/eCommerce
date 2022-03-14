import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AddressReducer } from "../Reducers/AddressReducer";
import { getAddress } from "../utils/ApiCalls";
import { useAuth } from "./authContext";
export const addressContext = createContext();
export const AddressProvider = ({ children }) => {
    const { userId } = useAuth();

    useEffect(() => {
        getAddress(dispatch, userId);
    }, [dispatch]);
    const [state, dispatch] = useReducer(AddressReducer, { address: [] });
    return (
        <addressContext.Provider value={{ address: state.address, dispatch }}>
            {console.log(state)}
            <> {children}</>
        </addressContext.Provider>
    );
};
export const useAddress = () => useContext(addressContext);
