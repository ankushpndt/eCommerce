import React from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
export const stripePromise = loadStripe(
    "pk_test_51J4JlASAvBwcM1ObmCvndFdDkfiCNv9rBrM9lHaIjhjbmpMNBtKdr0f4iRGJEsrOMM4TLjcRwXzkGWXx5onaE33i009PhnsbvG"
);
export const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });
        console.log({ error, paymentMethod });
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
        </form>
    );
};
