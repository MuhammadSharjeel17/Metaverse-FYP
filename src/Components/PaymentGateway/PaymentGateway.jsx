import React, { useState } from 'react';
import Stripe from 'stripe';
import './PaymentGateway.css';

const stripe = new Stripe(process.env.REACT_APP_STRIPE_API_KEY);
const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = await stripe.createToken({
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
        name: name,
        address_zip: ''
      }
    });

    if (error) {
      console.error(error);
    } else {
      console.log('');
    }
  };

  return (
    <>
    <div className="main-back">
    <div className="container m-auto bg-white p-5 bod-3">
      <div className="row">
        {/* <!-- CARD FORM --> */}
        <div className="col-lg-8 col-md-12">
          <form>
            <div className="header flex-between flex-vertical-center">
              <div className="flex-vertical-center">
                <i className="ai-bitcoin-fill size-xl pr-sm f-main-color"></i>
                <span className="title">
                  <strong>AceCoin</strong><span>Pay</span>
                </span>
              </div>
            </div>
            <div className="card-data flex-fill flex-vertical">
              {/* <!-- Card Number --> */}
              <div className="flex-between flex-vertical-center">
                <div className="card-property-title">
                  <strong>Card Number</strong>
                  <span>Enter 16-digit card number on the card</span>
                </div>
              </div>

              {/* <!-- Card Field --> */}
              <div className="flex-between">
                <div className="card-number flex-vertical-center flex-fill">
                  <div className="card-number-field flex-vertical-center flex-fill">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                      <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                      <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                      <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                    </svg>
                    <input type="text" placeholder="Card Number" className="form-control" id="cardNumber" onkeypress="return onlyNumberKey(event)" maxlength="19" name="cardNumber" data-bound="carddigits_mock" data-def="0000 0000 0000 0000" required />
                  </div>
                  <i className="ai-circle-check-fill size-lg f-main-color"></i>
                </div>
              </div>

              {/* <!-- Expiry Date --> */}
              <div className="flex-between">
                <div className="card-property-title">
                  <strong>Expiry Date</strong>
                  <span>Enter the expiration date of the card</span>
                </div>
                <div className="card-property-value flex-vertical-center">
                  <div className="input-container half-width">
                    <input className="numbers month-own" data-def="00" type="text" data-bound="mm_mock" placeholder="MM" />
                  </div>
                  <span className="m-md">/</span>
                  <div className="input-container half-width">
                    <input className="numbers year-own" data-def="01" type="text" data-bound="yy_mock" placeholder="YYYY" />
                  </div>
                </div>
              </div>

              {/* <!-- CCV Number --> */}
              <div className="flex-between">
                <div className="card-property-title">
                  <strong>CVC Number</strong>
                  <span>Enter card verification code from the back of the
                    card</span>
                </div>
                <div className="card-property-value">
                  <div className="input-container">
                    <input id="cvc" placeholder="Card CVV" maxlength="3" onkeypress="return onlyNumberKey(event)" type="password" />
                    <i id="cvc_toggler" data-target="cvc" className="ai-eye-open pointer"></i>
                  </div>
                </div>
              </div>

              {/* <!-- Name --> */}
              <div className="flex-between">
                <div className="card-property-title">
                  <strong>Cardholder Name</strong>
                  <span>Enter cardholder's name</span>
                </div>
                <div className="card-property-value">
                  <div className="input-container">
                    <input id="name" data-bound="name_mock" data-def="Mr. Cardholder" type="text" className="uppercase" placeholder="CARDHOLDER NAME" />
                    <i className="ai-person"></i>
                  </div>
                </div>
              </div>

              <div className="flex-between">
                <div className="card-property-title">
                  <strong>Mobile No.</strong>
                  <span>Enter Mobile No.</span>
                </div>
                <div className="card-property-value">
                  <div className="input-container">
                    <input id="phone" type="text" placeholder="Your Mobile No." />
                    <i className="ai-phone"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="action flex-center">
              <button type="submit" className="b-main-color pointer">
                Pay Now
              </button>
            </div>
          </form>
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
                <strong>549</strong>
                <small>.99 <span className="f-secondary-color">USD</span></small>
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





export default PaymentGateway