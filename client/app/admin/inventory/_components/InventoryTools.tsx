"use client";
import Modal from "@/app/_components/Modals/Modal";
import { FaTrashCan } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { RemoveItemForm } from "./RemoveItemForm";
import { AddNewItemForm } from "./AddNewItemForm";

export function InventoryTools() {
  const addModalBtn = (
    <div className="flex justify-center items-center">
      <div className="btn bg-[#4796BD] text-white text-lg min-w-20 hover:-translate-y-1 hover:bg-[#4796BD]">
        <MdAddBox />
      </div>
    </div>
  );
  const removeModalBtn = (
    <div className="flex justify-center items-center">
      <div className="btn bg-[#4796BD] text-white text-lg min-w-20 hover:-translate-y-1 hover:bg-[#4796BD]">
        <FaTrashCan />
      </div>
    </div>
  );

  return (
    <div className="flex">
      <Modal
        label="add"
        modalBtn={addModalBtn}>
        <AddNewItemForm />
      </Modal>
      <Modal
        label="remove"
        modalBtn={removeModalBtn}>
        <RemoveItemForm />
      </Modal>
    </div>
  );
}
