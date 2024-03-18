import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

/* Services */
import { purchaseProducts } from "../../services/services";

/* Modals */
import Success from "../modals/Success";

/* Buttons */
import Button from "../button/Button";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const PaymentForm = ({ paymentParams }) => {
  const nav = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const [userLocationError, setUserLocationError] = useState("");
  const [showLocationForm, setShowLocationForm] = useState(true);
  const [showCardForm, setShowCardForm] = useState(false);

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const currentYear = new Date().getFullYear() % 100;

  const handleLocationSubmit = (evt) => {
    evt.preventDefault();

    if (!userLocation) {
      setUserLocationError("Please enter your location.");
      return;
    }
    localStorage.setItem("userLocation", userLocation);
    setShowLocationForm(false);
    setShowCardForm(true);
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setUserLocation(savedLocation);
      setShowLocationForm(false);
      setShowCardForm(true);
    }
  }, []);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
    setErrors({ ...errors, [name]: null });
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await purchaseProducts(paymentParams);

      console.log("Purchase data:", response.data);
      setShowSuccessModal(true);

      setState({
        number: "",
        expiry: "",
        cvc: "",
        name: "",
        focus: "",
      });

      setTimeout(() => {
        nav("/");
      }, 3000);
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage(
        "An error occurred while processing your payment. Please try again later."
      );
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!state.number) {
      errors.number = "Card number is required.";
    } else if (!/^\d{16}$/.test(state.number)) {
      errors.number = "Invalid card number.";
    }

    if (!state.name) {
      errors.name = "Name is required.";
    }

    if (!state.expiry) {
      errors.expiry = "Expiry date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(state.expiry)) {
      errors.expiry = "Invalid expiry date.";
    } else {
      const [month, year] = state.expiry.split("/");
      if (
        parseInt(year, 10) < currentYear ||
        parseInt(year, 10) > currentYear + 10
      ) {
        errors.expiry =
          "Expiry year must be between current year and next 10 years.";
      }
      if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
        errors.expiry = "Invalid expiry month.";
      }
    }

    if (!state.cvc) {
      errors.cvc = "CVC is required.";
    } else if (!/^\d{3,4}$/.test(state.cvc)) {
      errors.cvc = "Invalid CVC.";
    }

    return errors;
  };

  return (
    <div className="container mx-auto pb-[100px]">
      <div className="flex items-center justify-center">
        {showLocationForm && (
          <form onSubmit={handleLocationSubmit} className="max-w-md mx-auto">
            <label className="font-semibold text-lg" htmlFor="location">
              შეიყვანეთ თქვენი მდებარეობა:
            </label>
            <input
              type="text"
              id="location"
              value={userLocation}
              onChange={(e) => {
                setUserLocation(e.target.value);
                setUserLocationError("");
              }}
              className="border border-gray-400 px-4 py-2 rounded-md w-full focus:outline-none focus:border-primary"
            />
            {userLocationError && (
              <div className="text-red-500">{userLocationError}</div>
            )}
            <Button
              type="submit"
              children="გაგზავნა"
              className="bg-primary text-white w-full py-2 rounded-md hover:bg-primary-dark mt-4"
            />
          </form>
        )}
      </div>
      {showCardForm && (
        <div className="flex flex-col items-center max-w-md mx-auto mt-8">
          <>
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            <form onSubmit={handleSubmit} className="w-full">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={`border ${
                  errors.number ? "border-red-500" : "border-gray-400"
                } px-4 py-2 rounded-md w-full focus:outline-none focus:border-primary mt-4`}
              />
              {errors.expiry && (
                <div className="text-red-500">{errors.expiry}</div>
              )}
              <input
                type="number"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={`border ${
                  errors.number ? "border-red-500" : "border-gray-400"
                } px-4 py-2 rounded-md w-full focus:outline-none focus:border-primary mt-4`}
              />
              {errors.cvc && <div className="text-red-500">{errors.cvc}</div>}
              <input
                type="number"
                name="number"
                placeholder="ბარათის ნომერი"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={`border ${
                  errors.number ? "border-red-500" : "border-gray-400"
                } px-4 py-2 rounded-md w-full focus:outline-none focus:border-primary mt-4`}
              />
              {errors.number && (
                <div className="text-red-500">{errors.number}</div>
              )}
              <input
                type="text"
                name="name"
                placeholder="სახელი"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={`border ${
                  errors.number ? "border-red-500" : "border-gray-400"
                } px-4 py-2 rounded-md w-full focus:outline-none focus:border-primary mt-4`}
              />
              {errors.name && <div className="text-red-500">{errors.name}</div>}

              <Button
                type="submit"
                children="გაგზავნა"
                className="bg-primary text-white w-full py-2 rounded-md hover:bg-primary-dark mt-4"
              />
            </form>
            {successMessage && (
              <div className="text-green-500 mt-4">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
          </>
        </div>
      )}
      {showSuccessModal && (
        <Success
          title="გადახდა წარმატებით შესრულდა"
          showModal={showSuccessModal}
          handleClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentForm;
