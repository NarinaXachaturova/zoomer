import React, { useState } from "react";

/* Services */
import { registration } from "../../services/services";

/* Modals */
import Modal from "./Modal";
import Success from "./Success";
import Error from "./Error";

/* Inputs */
import Input from "../input/Index";

/* Buttons */
import Button from "../button/Button";

const Registration = ({ showModal, handleClose, onRegistered }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleRegister = async () => {
    try {
      setErrors({});

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !phoneNumber ||
        !confirmPassword
      ) {
        setErrors({ message: "გთხოვთ შეავსოთ ყველა ველი" });
        return;
      }

      const errors = {};
      if (phoneNumber.length < 9) {
        errors.phoneNumber =
          "ტელეფონის ნომერი უნდა იყოს 9 სიმბოლოზე მეტი ან ტოლი";
      }
      if (password.length < 8) {
        errors.password = "პაროლი უნდა იყოს 8 სიმბოლოზე მეტი ან ტოლი";
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = "პაროლი არასწორია";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.email = "ელფოსტა უნდა იყოს მოქმედი ელფოსტის მისამართი";
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      const response = await registration({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email,
        password,
      });

      if (response.status === 201) {
        setShowSuccessModal(true);
        handleClose();
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
      } else if (response.status === 400) {
        setShowErrorModal(true);
        handleClose();
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setShowErrorModal(true);
    }
  };

  return (
    <>
      <Modal isModalOpen={showModal} onClose={handleClose}>
        <div className="flex justify-center flex-col gap-4">
          <h2 className="text-center text-[20px] font-bold text-primary">
            რეგისტრაცია
          </h2>

          {errors.message && (
            <div className="text-red-600">{errors.message}</div>
          )}

          <div className="flex flex-col gap-5 items-center">
            <Input
              type="text"
              placeholder="სახელი"
              id="firstNameInput"
              value={firstName}
              onChange={(e) => setFirstName(e)}
            />
            <Input
              type="text"
              placeholder="გვარი"
              id="lastNameInput"
              value={lastName}
              onChange={(e) => setLastName(e)}
            />
            <Input
              type="email"
              placeholder="ელ.ფოსტა"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e)}
            />
            {errors.email && <div className="text-red-600">{errors.email}</div>}
            <Input
              type="text"
              id="phoneNumberInput"
              placeholder="ტელეფონის ნომერი"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e)}
            />
            {errors.phoneNumber && (
              <div className="text-red-500">{errors.phoneNumber}</div>
            )}
            <Input
              type="password"
              placeholder="პაროლი"
              id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e)}
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
            <Input
              type="password"
              placeholder="დაადასტურეთ პაროლი"
              id="confirmPasswordInput"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e)}
            />
            {errors.confirmPassword && (
              <div className="text-red-500">{errors.confirmPassword}</div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleRegister}
              children="რეგისტრაცია"
              className="text-white bg-primary w-full"
            />
          </div>
        </div>
      </Modal>

      <Success
        title="წარმატებული რეგისტრაცია"
        showModal={showSuccessModal}
        handleClose={() => setShowSuccessModal(false)}
      />
      <Error
        title="მომხმარებელი უკვე დარეგისტრირებულია"
        showModal={showErrorModal}
        handleClose={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default Registration;
