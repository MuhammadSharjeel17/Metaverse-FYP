import React from 'react';
import { CardElement, useStripe, Elements, useElements } from '@stripe/react-stripe-js';
import './PaymentGateway.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
const stripePromise = loadStripe('pk_test_51N7vqTBtBzUMTu5ZcGn38f8mctwCvB2gkgq3FNuntAT13djs5tLMgOMq24qr7DyphWBENRBufl4YtBTXyMiBLwVX00Bgi4l4Mn');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string().required('Card Number is required'),
    expiryMonth: Yup.string().required('Expiry Month is required'),
    expiryYear: Yup.string().required('Expiry Year is required'),
    cvcNumber: Yup.string().required('CVC Number is required'),
    cardholderName: Yup.string().required('Cardholder Name is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
  });

  const initialValues = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvcNumber: '',
    cardholderName: '',
    mobileNumber: '',
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let data = JSON.parse(queryParams.get("data"));
  console.log(data);
  let token = localStorage.getItem('user');
  const decoded = jwt_decode(token)
  const handleSubmit = async (values,) => {
    console.log(values);
    if(values){
      
    const datas =   await axios.delete("http://localhost:8080/api/cart/delete-cart/" + decoded.id);
    console.log(datas.data)
    if(datas.data.status === true){
     
      toast.success(`Payment Success PKR : ${data}`);
      // const quantity = await axios.put("http://localhost:8080/api/updateproductquantity/" + decoded.id);
      values = '';
      data = '';
      setTimeout(()=>navigate('/home'),3000);    
    }
    }
    try {
      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      //   type: 'card',
      //   card: elements.getElement(CardElement),
      //   billing_details: {
      //     name: values.cardholderName,
      //     phone: values.mobileNumber,
      //   },
      // });

      // if (error) {
      //   console.log('Error:', error.message);
      // } else {
      //   console.log('Payment Method:', paymentMethod);
      //   // Handle successful payment method creation
      //   // Send the payment method to your server for further processing
      // }
      const paymentIntent = await stripe.createPaymentIntent({
        amount: 1000, // Example amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
      });
      console.log('Payment Intent:', paymentIntent);
    }
     catch (error) {
      console.log('Error:', error);
    }
  
    
  };
  return (
    <>
     <ToastContainer/>
    <div className="main-back">
    <div className="container m-auto bg-white p-5 bod-3">
      <div className="row">
        {/* <!-- CARD FORM --> */}
      
        <div className="col-lg-8 col-md-12">
        <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    <Form>
    <div className="form-row">
         
         
          {/* <ErrorMessage name="cardNumber" component="div" className="error-message" /> */}
        </div>
      <div className="header flex-between flex-vertical-center">
        <div className="flex-vertical-center">
          <i className="ai-bitcoin-fill size-xl pr-sm f-main-color"></i>
          <span className="title">
            <strong>STRIPE</strong><span>Pay</span>
          </span>
        </div>
      </div>
      <div className="card-data flex-fill flex-vertical">
        <div className="flex-between flex-vertical-center">
          <div className="card-property-title">
            <strong>Card Number</strong>
            <span>Enter 16-digit card number on the card</span>
          </div>
        </div>
        <div className="flex-between">
          <div className="card-number flex-vertical-center flex-fill">
            <div className="card-number-field flex-vertical-center flex-fill">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
              </svg>
              <Field
                type="text"
                placeholder="CardNumber"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                maxLength="19"
                
              />
            </div>
           
            <i className="ai-circle-check-fill size-lg f-main-color"></i>
          </div>
          
        </div>
        <span className='text-danger'><ErrorMessage name="cardNumber" component="div" className="error bg-red" /></span>
        <div className="flex-between">
          <div className="card-property-title">
            <strong>Expiry Date</strong>
            <span>Enter the expiration date of the card</span>
          </div>
          <div className="card-property-value flex-vertical-center">
            <div className="input-container half-width">
              <Field
                className="numbers month-own"
                type="text"
                placeholder="MM"
                name="expiryMonth"
                
              />
             
            </div>
            <span className='text-danger'><ErrorMessage name="expiryMonth" component="div" className="error bg-red" /></span>
            <span className="m-md">/</span>
            <div className="input-container half-width">
              <Field
                className="numbers year-own"
                type="text"
                placeholder="YYYY"
                name="expiryYear"
                
              />
              
            </div>
            <span className='text-danger'><ErrorMessage name="expiryYear" component="div" className="error bg-red" /></span>
          </div>
        </div>
        <div className="flex-between">
          <div className="card-property-title">
            <strong>CVC Number</strong>
            <span>Enter card verification code from the back of the card</span>
          </div>
          <div className="card-property-value">
            <div className="input-container">
              <Field
                id="cvc"
                placeholder="Card CVV"
                maxLength="3"
                type="text"
                name="cvcNumber"
                
              />
              <i id="cvc_toggler" data-target="cvc" className="ai-eye-open pointer"></i>
             
            </div>
            <span className='text-danger'><ErrorMessage name="cvcNumber" component="div" className="error bg-red" /></span>
          </div>
        </div>
        <div className="flex-between">
          <div className="card-property-title">
            <strong>Cardholder Name</strong>
            <span>Enter cardholder's name</span>
          </div>
          <div className="card-property-value">
            <div className="input-container">
              <Field
                id="name"
                type="text"
                className="uppercase"
                placeholder="CARDHOLDER NAME"
                name="cardholderName"
                
              />
              <i className="ai-person"></i>
             
            </div>
            <span className='text-danger'><ErrorMessage name="cardholderName" component="div" className="error bg-red" /></span>
          </div>
        </div>
        <div className="flex-between">
          <div className="card-property-title">
            <strong>Mobile No.</strong>
            <span>Enter Mobile No.</span>
          </div>
          <div className="card-property-value">
            <div className="input-container">
              <Field
                id="phone"
                type="text"
                placeholder="Your Mobile No."
                name="mobileNumber"
                
              />
              <i className="ai-phone"></i>
              
            </div>
            <span className='text-danger'><ErrorMessage name="mobileNumber" component="div" className="text-danger" /></span>
          </div>
        </div>
      </div>
      <div className="action flex-center">
        <button type="submit" className="b-main-color pointer">
          Pay Now
        </button>
      </div>
    </Form>
  </Formik>
        </div>
      
        {/* <!-- SIDEBAR --> */}
        <div className="col-lg-4 col-md-12 py-5">
          <div></div>
          <div className="purchase-section flex-fill flex-vertical">
            <div className="card-mockup flex-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px">
                <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
              </svg>
              <div>
                <strong>
                  <div id="name_mock" className="size-md pb-sm uppercase ellipsis">
                    mr. Cardholder
                  </div>
                </strong>
                <div className="size-md pb-md">
                  <strong>
                    <span id="carddigits_mock">0000 0000 0000 0000</span>
                  </strong>
                </div>
                <div className="flex-between flex-vertical-center">
                  <strong className="size-md">
                    <span>Expiry Date : </span><span id="mm_mock">00</span> / <span id="yy_mock">00</span>
                  </strong>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px">
                    <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z" />
                    <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z" />
                    <path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z" />
                  </svg>
                </div>
              </div>
            </div>

            <ul className="purchase-props">
              <li className="flex-between">
                <span>Company</span>
                <strong>Apple</strong>
              </li>
              <li className="flex-between">
                <span>Order number</span>
                <strong>429252965</strong>
              </li>
              <li className="flex-between">
                <span>Product</span>
                <strong>MacBook Air</strong>
              </li>
              <li className="flex-between">
                <span>VAT (20%)</span>
                <strong>$100.00</strong>
              </li>
            </ul>
          </div>
          <div className="separation-line"></div>
          <div className="total-section flex-between flex-vertical-center">
            <div className="flex-fill flex-vertical">
              <div className="total-label f-secondary-color">You have to Pay</div>
              <div>
                <strong>{data}</strong>
                <small> <span className="f-secondary-color">PKR</span></small>
              </div>
            </div>
            <i className="ai-coin size-lg"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
 
    </>
  )
}
const bounds = document.querySelectorAll("[data-bound]");

for (let i = 0; i < bounds.length; i++) {
  const targetId = bounds[i].getAttribute("data-bound");
  const defValue = bounds[i].getAttribute("data-def");
  const targetEl = document.getElementById(targetId);
  bounds[i].addEventListener(
    "blur",
    () => (targetEl.innerText = bounds[i].value || defValue)
  );
}


const PaymentGateway = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(queryParams.get("data"));
  console.log(data);

  return (
    <Elements stripe={stripePromise}>
      <div>
       <CardElement id="cardNumber" />
        <PaymentForm />
      </div>
    </Elements>
  );
};




export default PaymentGateway