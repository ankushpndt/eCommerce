import React, { useState } from "react";
import { Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const HoriStepper = ({ activeStep }) => {
    const [localStep, setLocalStep] = useState(0);
    const navigate = useNavigate();
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
        {
            label: <Typography>Success</Typography>,
            icon: <DoneIcon />
        }
    ];

    const stepStyles = {
        boxSizing: "border-box"
    };
    console.log(localStep);
    console.log(activeStep);
    return (
        <>
            <Button
                onClick={() => {
                    localStep === 0
                        ? 0
                        : setLocalStep((prevActiveStep) => prevActiveStep - 1);
                    if (localStep === 0) navigate("/cart/savedaddress");
                    else if (localStep === 1) navigate("/cart/payment");
                    else navigate("/cart/payment/success");
                }}
                disabled={activeStep === 0}
            >
                Back
            </Button>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                style={stepStyles}
            >
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color:
                                    activeStep >= index
                                        ? "tomato"
                                        : "rgba(0, 0, 0, 0.650)"
                            }}
                            icon={item.icon}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};
