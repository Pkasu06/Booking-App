import React from "react";
import { v4 as uuidv4 } from "uuid";

type modalConfirmProps = {
  children: React.ReactNode;
  label: string;
  id?: string;
  testId?: string;
  modalBtn?: React.ReactNode;
};

const Modal = ({
  children,
  label,
  testId,
  id,
  modalBtn,
}: modalConfirmProps) => {
  const modalId = id ? id : "modal" + label;
  const dataTestId = testId ? testId : "modal" + label + uuidv4().slice(-8);

  return (
    <section className="bg-white">
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {modalBtn ? (
        <div
          data-test={dataTestId}
          onClick={() => {
            //@ts-expect-error document exists
            document.getElementById(modalId).showModal();
          }}>
          {modalBtn}
        </div>
      ) : (
        <div
          className={"btn"}
          data-test={dataTestId}
          onClick={() => {
            //@ts-expect-error document exists
            document.getElementById(modalId).showModal();
          }}>
          {label}
        </div>
      )}

      {/* inside of modal */}
      <dialog
        id={modalId}
        className="modal">
        <div className="modal-box bg-white">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* component to display */}
          <section className="">{children}</section>
        </div>
      </dialog>
    </section>
  );
};

export default Modal;
