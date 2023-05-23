import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import './StripePayment.css';

const stripePromise = loadStripe('pk_test_51N7vqTBtBzUMTu5ZcGn38f8mctwCvB2gkgq3FNuntAT13djs5tLMgOMq24qr7DyphWBENRBufl4YtBTXyMiBLwVX00Bgi4l4Mn');
const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[createPaymentMethod error]', error);
      return;
    }

    const { id } = paymentMethod;
    let amount =10;
    const { data: { clientSecret: returnedClientSecret } } = await axios.post('http://localhost:8080/api/v1/payment/create-payment-intent', { amount: amount * 100 });

    setClientSecret(returnedClientSecret);
    console.log("clientSecret",clientSecret)
    const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: id
    });

    if (confirmError) {
      console.log('[confirmCardPayment error]', confirmError);
      return;
    }

    axios.post('http://localhost:8080/api/v1/payment/handle-payment', { paymentIntentId: clientSecret })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log('[handlePayment error]', error);
    });
  };
   const errorMessage = '';
  return (
   

<div className="container">
  <div className="row">
    <div className="col-md-4 offset-md-4 col-10 offset-1 pl-0 pr-0">
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-5 col-12 pt-2">
              <h6 className="m-0"><strong>Payment Details</strong></h6>
            </div>
            <div className="col-md-7 col-12 icons">
              <i className="fa fa-cc-visa fa-2x" aria-hidden="true"></i>
              <i className="fa fa-cc-mastercard fa-2x" aria-hidden="true"></i>
              <i className="fa fa-cc-discover fa-2x" aria-hidden="true"></i>
              <i className="fa fa-cc-amex fa-2x" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="validationTooltipCardNumber"><strong>CARD NUMBER</strong></label>
              <div className="input-group">
                <CardElement
                  className="form-control border-right-0"
                  id="validationTooltipCardNumber"
                  options={{ /* Custom options */ }}
                />
                <div className="input-group-prepend">
                  <span className="input-group-text rounded-right" id="validationTooltipCardNumber">
                    <i className="fa fa-credit-card"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 col-12">
                <div className="form-group">
                  <label htmlFor="exampleInputExpirationDate"><strong>EXPIRATION DATE</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputExpirationDate"
                    placeholder="MM / YY"
                  />
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="form-group">
                  <label htmlFor="exampleInputCvcCode"><strong>CVC CODE</strong></label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputCvcCode"
                    placeholder="CVC"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputCouponCode"><strong>COUPON CODE</strong></label>
              <input
                type="text"
                className="form-control"
                id="exampleInputCouponCode"
                placeholder="Coupon Code"
              />
            </div>
            <button className="btn btn-info w-100 pb-2 pt-2" type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};
function CheckoutForm(){
  return <Elements stripe={stripePromise}>
        <PaymentForm/>
        </Elements>
}
export default CheckoutForm;
