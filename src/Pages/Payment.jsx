import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useCart } from "../Context/cart-context";
import { useNavigate, useParams } from "react-router-dom";
import { HoriStepper } from "../components/HoriStepper";
import { useAddress } from "../Context/addressContext";
import { v4 } from "uuid";
import "./Payment.css";
import { emptyCart } from "../utils/ApiCalls";
export const Payment = () => {
    const { itemsInCart } = useCart();
    const { token, dispatch, address } = useAddress();
    const totalAmtInCart = itemsInCart.reduce(
        (total, i) =>
            parseInt(total) +
            parseInt(i?.productId?.price * i?.quantity) -
            parseInt(i?.productId?.discount),
        0
    );
    const [stripeToken, setStripeToken] = useState(null);
    const KEY =
        "pk_test_51J4JlASAvBwcM1ObmCvndFdDkfiCNv9rBrM9lHaIjhjbmpMNBtKdr0f4iRGJEsrOMM4TLjcRwXzkGWXx5onaE33i009PhnsbvG";
    const onToken = (token) => {
        setStripeToken(token);
    };
    const navigate = useNavigate();
    useEffect(() => {
        stripeToken &&
            (async () => {
                try {
                    const response = await axios.post(
                        `https://backend.ankushpndt.repl.co/payment/checkout`,
                        {
                            tokenId: stripeToken.id,
                            amount: totalAmtInCart
                        }
                    );
                    console.log(response);
                    navigate("/cart/payment/success");
                } catch (err) {
                    console.log(err);
                }
            })();
    }, [stripeToken]);
    const { addressId } = useParams();

    const getAddressBasedOnId = address?.find(
        (item) => item?._id === addressId
    );

    return (
        <>
            <HoriStepper activeStep={1} />
            <div className="payment__container">
                <div className="order__summary">
                    <h4>Order Summary</h4>
                    {address && (
                        <div key={v4()} style={{ padding: "1rem 0" }}>
                            <div className="address__content">
                                <h4>Deliver To:</h4>
                                <br />
                                <p>Name: {getAddressBasedOnId?.name}</p>
                                <p>
                                    Mobile number:{" "}
                                    {getAddressBasedOnId?.mobileno}
                                </p>
                                <p>Pincode: {getAddressBasedOnId?.pincode}</p>
                                <p>Address: {getAddressBasedOnId?.address}</p>
                            </div>
                        </div>
                    )}
                </div>
                {stripeToken ? (
                    <span>Processing your payment. Please wait...</span>
                ) : (
                    <StripeCheckout
                        name="Game Shop"
                        description={`Your total is ₹ ${totalAmtInCart}`}
                        currency="INR"
                        amount={totalAmtInCart * 100}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        <button
                            id="login__btn__outlined"
                            onClick={() => emptyCart({ token, dispatch })}
                        >
                            Checkout
                        </button>
                    </StripeCheckout>
                )}
            </div>
        </>
    );
};
