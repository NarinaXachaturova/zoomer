import React from "react";

/* Icons */
import ErrorIcon from "../Icons/ErrorIcon";

/* Buttons */
import Button from "../button/Button";

/* Modals */
import Modal from "./Modal";

export default function Error({ title, Close, showModal }) {
  return (
    <Modal isModalOpen={showModal} onClose={Close}>
      <div>
        <div className="flex justify-center items-center">
          <ErrorIcon />
        </div>

        <h1 className="text-center font-bold mt-4 mb-12">{title}</h1>

        <div className="flex justify-center w-100">
          <Button
            className="bg-primary text-white w-full"
            children={"კარგი"}
            onClick={Close}
          />
        </div>
      </div>
    </Modal>
  );
}
