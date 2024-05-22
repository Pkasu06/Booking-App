import React from "react";
import { v4 as uuidv4 } from "uuid";

type modalConfirmProps = {
  children: React.ReactNode;
  label: string;
  id?: string;
  testId?: string;
};

const ModalConfirm = ({ children, label, testId, id }: modalConfirmProps) => {
  const modalId = id ? id : "modal" + label;
  const dataTestId = testId ? testId : "modal" + label + uuidv4().slice(-8);
  return (
    <section>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <div
        className="btn"
        data-test={dataTestId}
        onClick={() => {
          //@ts-expect-error document exists
          document.getElementById(modalId).showModal();
        }}>
        {label}
      </div>
      <dialog
        id={modalId}
        className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* component to display */}
          <section>{children}</section>
        </div>
      </dialog>
    </section>
  );
};

export default ModalConfirm;
