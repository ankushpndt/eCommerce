import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAddress } from "../Context/addressContext";
import { v4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewAddress } from "./NewAddress";
import { deleteAddress } from "../utils/ApiCalls";

export const SavedAddress = () => {
    const { address, dispatch } = useAddress();
    const [isEdit, setIsEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [isAdd, setAdd] = useState(false);
    const [addressId, setAddressId] = useState("");

    return (
        <div>
            <button
                onClick={() => {
                    setIsEdit((isEdit) => !isEdit);
                    setAdd((isAdd) => !isAdd);
                }}
            >
                {!isEdit ? "Add new address" : "Go back"}
            </button>

            <div className="saved__addresses">
                {!isEdit && (
                    <ul style={{ listStyle: "none" }}>
                        {address &&
                            address?.map((item) => (
                                <div
                                    key={v4()}
                                    style={{
                                        border: "1px dotted red",
                                        margin: "1rem"
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
                                            />
                                        </div>
                                        <div className="address__btn__delete">
                                            {console.log(item?._id)}
                                            <DeleteIcon
                                                onClick={() =>
                                                    deleteAddress({
                                                        dispatch,
                                                        addressId: item?._id
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="address__content">
                                        <p>{item?.name}</p>
                                        <p>{item?.mobileno}</p>
                                        <p>{item?.pincode}</p>
                                        <p>{item?.address}</p>
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
