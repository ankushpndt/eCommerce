import React from "react";
import { HoriStepper } from "../components/HoriStepper";
import DoneIcon from "@mui/icons-material/Done";
import "./OrderSuccessful.css";
import { useNavigate } from "react-router-dom";
export const OrderSuccessful = () => {
    const navigate = useNavigate();
    return (
        <div>
            <HoriStepper activeStep={2} />
            <div className="order__success">
                <DoneIcon sx={{ color: "green", fontSize: "5rem" }} />
                <div style={{ fontSize: "larger", fontWeight: "500" }}>
                    Order placed successfully.
                </div>
                <div className="home__btn" style={{ paddingTop: "1rem" }}>
                    <button
                        id="login__btn__outlined"
                        onClick={() => navigate("/product")}
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};
