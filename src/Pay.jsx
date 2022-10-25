import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const KEY = "pk_test_51LuhSLDbcO07IR7AUtVqVgjtdVRRko6snMyXHkqbDzOqh69ZPK9aK1zilFg78ASywyLoOqEXRVkAuRGYfJVHAUr300hrKvF2wB"

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate()

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment", 
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        history.push("/success")
      } catch(err){
        console.log(err);
      }
    };
    stripeToken && makeRequest()
  },[stripeToken, history]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StripeCheckout 
      name="CIGART" 
      image="https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU_400x400.jpg"
      billingAddress
      shippingAddress
      description = "Your total is $20"
      amount = {2000}
      token = {onToken}
      stripeKey = {KEY}
      >
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  )
}

export default Pay;