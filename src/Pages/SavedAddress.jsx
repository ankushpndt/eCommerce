import React, { useState, useEffect } from "react";
import "../auth/Account.css";
import { useAddress } from "../Context/addressContext";
import { useAuth } from "../Context/authContext";
import { v4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewAddress } from "./NewAddress";
import { deleteAddress } from "../utils/ApiCalls";
import { useNavigate } from "react-router-dom";
import { HoriStepper } from "../components/HoriStepper";
import { getAddress } from "../utils/ApiCalls";
export const SavedAddress = () => {
    const { address, dispatch } = useAddress();
    const [isEdit, setIsEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [isAdd, setAdd] = useState(false);
    const [addressId, setAddressId] = useState("");
    const navigate = useNavigate();
    const { userId } = useAuth();

    useEffect(() => {
        getAddress(dispatch, userId);
    }, [dispatch]);
    return (
        <div className="address__container">
            <HoriStepper activeStep={0} />

            <div className="address__nav__btn">
                <button
                    onClick={() => {
                        setIsEdit((isEdit) => !isEdit);
                        setAdd((isAdd) => !isAdd);
                    }}
                    id="login__btn__outlined"
                >
                    {!isEdit ? "Add new address" : "Go back"}
                </button>
            </div>
            <div className="saved__addresses">
                {!isEdit && (
                    <ul style={{ listStyle: "none" }}>
                        {address &&
                            address?.map((item) => (
                                <div
                                    key={v4()}
                                    style={{
                                        margin: "1rem",
                                        padding: "1rem",
                                        boxShadow:
                                            "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)"
                                    }}
                                >
                                    <div className="address__btn">
                                        <div className="address__btn__edit">
                                            <EditIcon
                                                onClick={() => {
                                                    setIsEdit(
                                                        (isEdit) => !isEdit
                                                    );
                                                    setAdd(false);
                                                    setUpdate(true);
                                                    setAddressId(item?._id);
                                                }}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                        <div className="address__btn__delete">
                                            <DeleteIcon
                                                onClick={() =>
                                                    deleteAddress({
                                                        dispatch,
                                                        addressId: item?._id
                                                    })
                                                }
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        onClick={() =>
                                            navigate("/cart/payment")
                                        }
                                        style={{ cursor: "pointer" }}
                                        className="address__content"
                                    >
                                        <div>Name: {item?.name}</div>
                                        <p>Mobile number: {item?.mobileno}</p>
                                        <p>Pincode: {item?.pincode}</p>
                                        <p>Address: {item?.address}</p>
                                    </div>
                                </div>
                            ))}
                    </ul>
                )}
            </div>
            {isEdit && (
                <NewAddress
                    isAdd={isAdd}
                    addressId={addressId}
                    update={update}
                />
            )}
        </div>
    );
};
