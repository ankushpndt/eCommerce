import { TextField } from "@mui/material";
import React, { useState } from "react";
import "../auth/Account.css";
import { useAddress } from "../Context/addressContext";
import { useAuth } from "../Context/authContext";
import { addAddress } from "../utils/ApiCalls";
import "./Address.css";
import { updateAddress } from "../utils/ApiCalls";
export const NewAddress = ({
    addressId,
    isAdd,
    update,
    setIsEdit,
    setAdd,
    setUpdate
}) => {
    const { address } = useAddress();
    const userAddress = address?.find((item) => item?._id === addressId);
    const [fullName, setFullName] = useState(
        isAdd ? "" : userAddress?.name || ""
    );
    const [mobNumber, setMobNumber] = useState(
        isAdd ? "" : userAddress?.mobileno || ""
    );
    const [newPincode, setNewPincode] = useState(
        isAdd ? "" : userAddress?.pincode || ""
    );
    const [newAddress, setNewAddress] = useState(
        isAdd ? "" : userAddress?.address || ""
    );
    const { dispatch } = useAddress();
    const { userId } = useAuth();

    const submitHandler = (e) => {
        e.preventDefault();
        isAdd &&
            addAddress({
                _id: userId,
                name: fullName,
                mobileno: mobNumber,
                pincode: newPincode,
                address: newAddress,
                dispatch,
                setIsEdit,
                setAdd,
                setUpdate
            });
        update &&
            updateAddress({
                dispatch,
                addressId,
                _id: userId,
                name: fullName,
                mobileno: mobNumber,
                pincode: newPincode,
                address: newAddress,
                setIsEdit,
                setAdd,
                setUpdate
            });
    };

    return (
        <div className="address">
            <form onSubmit={submitHandler} className="address__form">
                <TextField
                    id="standard-basic"
                    label="Full name"
                    variant="standard"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    value={fullName || ""}
                />
                <TextField
                    id="standard-basic"
                    label="Mobile number"
                    variant="standard"
                    onChange={(e) => setMobNumber(e.target.value)}
                    required
                    value={mobNumber || ""}
                />
                <TextField
                    id="standard-basic"
                    label="PIN code"
                    variant="standard"
                    onChange={(e) => setNewPincode(e.target.value)}
                    required
                    value={newPincode || ""}
                />
                <TextField
                    id="standard-basic"
                    label="Address"
                    variant="standard"
                    onChange={(e) => setNewAddress(e.target.value)}
                    required
                    value={newAddress || ""}
                />
                <button
                    type="submit"
                    value="Add address"
                    id="login__btn__outlined"
                >
                    Save
                </button>
            </form>
            <button
                id="login__btn__outlined"
                onClick={() => {
                    setFullName("Test user");
                    setMobNumber("9876543210");
                    setNewPincode("123456");
                    setNewAddress("house no city state");
                }}
            >
                Dummy address
            </button>
        </div>
    );
};
