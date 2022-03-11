import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAddress } from "../Context/addressContext";
import { v4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NewAddress } from "./NewAddress";
export const SavedAddress = () => {
    const { address } = useAddress();
    const [isEdit, setIsEdit] = useState(false);
    return (
        <div>
            <h4>Saved Addresses</h4>
            <Link to="/cart/newaddress">Add new address</Link>
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
                                                onClick={() =>
                                                    setIsEdit(
                                                        (isEdit) => !isEdit
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="address__btn__delete">
                                            <DeleteIcon />
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
                {isEdit && <NewAddress setIsEdit={setIsEdit} />}
            </div>
        </div>
    );
};
