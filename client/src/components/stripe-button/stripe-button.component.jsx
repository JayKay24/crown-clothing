import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_M5y8AamCnOkyYRwYqJYKTX0w00DJLxZE9g";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
    axios({
      url: "payment",
      method: "POST",
      data: { amount: priceForStripe, token },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log(`Payment error: ${JSON.parse(error)}`);
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit card."
        );
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
