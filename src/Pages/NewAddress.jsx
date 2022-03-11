import { TextField } from "@mui/material";
import React, { useState } from "react";
import "../auth/Account.css";
import { useAddress } from "../Context/addressContext";
import { useAuth } from "../Context/authContext";
import { addAddress } from "../utils/ApiCalls";
import "./Address.css";

export const NewAddress = ({ setIsEdit }) => {
    const [fullName, setFullName] = useState("");
    const [mobNumber, setMobNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");
    const { dispatch } = useAddress();
    const { userId } = useAuth();
    const submitHandler = (e) => {
        e.preventDefault();
        addAddress({
            _id: userId,
            name: fullName,
            mobileno: mobNumber,
            pincode: pincode,
            address: address,
            dispatch
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
                />
                <TextField
                    id="standard-basic"
                    label="Mobile number"
                    variant="standard"
                    onChange={(e) => setMobNumber(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="PIN code"
                    variant="standard"
                    onChange={(e) => setPincode(e.target.value)}
                />
                <TextField
                    id="standard-basic"
                    label="Address"
                    variant="standard"
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button
                    type="submit"
                    value="Add address"
                    id="login__btn__outlined"
                >
                    Save
                </button>
                <div className="address__btn__discard">
                    <button onClick={() => setIsEdit((isEdit) => !isEdit)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
