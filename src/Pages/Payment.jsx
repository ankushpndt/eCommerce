import axios from "axios";
import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useCart } from "../Context/cart-context";
import { useNavigate } from "react-router-dom";
import { HoriStepper } from "../components/HoriStepper";
import { useAddress } from "../Context/addressContext";
import { v4 } from "uuid";
import "./Payment.css";
export const Payment = () => {
    const { itemsInCart } = useCart();
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

                    navigate("/cart/payment/success");
                } catch (err) {
                    console.log(err);
                }
            })();
    }, [stripeToken]);
    const { address } = useAddress();

    return (
        <>
            <HoriStepper activeStep={1} />
            <div className="payment__container">
                <div className="order__summary">
                    <h4>Order Summary</h4>
                    {address &&
                        address?.map((item) => (
                            <div key={v4()} style={{ padding: "1rem 0" }}>
                                <div className="address__content">
                                    <div>Name: {item?.name}</div>
                                    <p>Mobile number: {item?.mobileno}</p>
                                    <p>Pincode: {item?.pincode}</p>
                                    <p>Address: {item?.address}</p>
                                </div>
                            </div>
                        ))}
                </div>
                {stripeToken ? (
                    <span>Processing your payment. Please wait...</span>
                ) : (
                    <StripeCheckout
                        name="Game Shop"
                        // billingAddress
                        // shippingAddress
                        description={`Your total is ₹ ${totalAmtInCart}`}
                        currency="INR"
                        amount={totalAmtInCart * 100}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        <button id="login__btn__outlined">Checkout</button>
                    </StripeCheckout>
                )}
            </div>
        </>
    );
};
