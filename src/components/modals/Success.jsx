import React from "react";

/* Modals */
import Modal from "./Modal";

/* Buttons */
import Button from "../button/Button";

/* Icons */
import SuccessIcon from "../Icons/SuccessIcon";

const Success = ({ showModal, onClose, title }) => {
  return (
    <Modal isModalOpen={showModal} onClose={onClose}>
      <div>
        <div className="flex justify-center items-center">
          <SuccessIcon />
        </div>

        <h2 className="text-center font-bold mt-4 mb-12 text-2xl ">{title}</h2>
        <div className="flex justify-center w-100">
          <Button
            children="კარგი"
            onClick={onClose}
            className="w-full bg-primary text-white"
          />
        </div>
      </div>
    </Modal>
  );
};

export default Success;
