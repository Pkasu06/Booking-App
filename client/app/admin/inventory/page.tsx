"use client";
import Modal from "@/app/_components/Modals/Modal";
import useGetParts from "@/app/_hooks/part-api/useGetParts";
import useUpdatePart from "@/app/_hooks/part-api/useUpdatePart";
import { mockPartsData } from "@/app/utility/mockData/mockGetPartsApi";
import { partsAttributes } from "@/constants";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";

type Part = {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
};

export default function InventoryPage() {
  const [partsData, setPartsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: partsDataFromApi,
    isLoading: partsDataLoading,
    error: partsDataError,
    fetchData: fetchInventory,
  } = useGetParts(false);
  const {
    updatePart,
    error: updatePartsError,
    isLoading: updatePartsLaoding,
  } = useUpdatePart();
  const inventoryPerPage = 6;
  const indexOfLastInventory = currentPage * inventoryPerPage;
  const indexOfFirstInventory = indexOfLastInventory - inventoryPerPage;
  const currentInventory = partsData.slice(
    indexOfFirstInventory,
    indexOfLastInventory
  );
  const totalPages = Math.ceil(partsData.length / inventoryPerPage);

  useEffect(() => {
    console.log("get parts");
    fetchInventory();
  }, []);

  useEffect(() => {
    console.log("partsDataFromApi", partsDataFromApi);
    if (partsDataFromApi) {
      setPartsData(partsDataFromApi);
    }
  }, [partsDataFromApi]);

  const updateParts = async (part) => {
    try {
      await updatePart(part);
    } catch (error) {
      console.error("error posting parts data to api : ", error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuantityChange = (e, partId, delta = 0) => {
    const value = Math.max(
      0,
      parseInt(
        e.target.parentElement.querySelector('input[name="quantity"]').value
      ) + delta
    );
    setPartsData((prevData) =>
      prevData.map((part) =>
        part.id === partId ? { ...part, quantity: value } : part
      )
    );
  };

  return (
    <div>
      <div className="w-full border-2 border-black m-4  rounded-xl shadow-lg overflow-hidden">
        {/* <h1 className="text-center font-bold p-4">Inventory</h1> */}
        <table className="table text-center w-full ">
          <thead>
            <tr className="text-black bg-slate-300 w-full">
              {partsAttributes.map((item, index) => (
                <th
                  className="text-gray-500 uppercase"
                  key={index}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentInventory.map((part, index) => {
              return (
                <tr
                  key={part.id}
                  className="border-gray-300 text-black font-medium">
                  <th>{indexOfFirstInventory + index + 1}</th>
                  <td>{part.name}</td>
                  <td>{part.threshold}</td>
                  <td>
                    <div className="inline-flex">
                      <button
                        onClick={(e) => handleQuantityChange(e, part.id, 1)}
                        className="flex justify-center items-center text-2xl w-8 h-8 border-2 border-black hover:bg-gray-200">
                        +
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        value={part.quantity}
                        onChange={(e) => handleQuantityChange(e, part.id)}
                        className="text-center w-10 h-8 bg-gray-300 border-y-2 border-black daisy-custom-input"
                      />
                      <button
                        onClick={(e) => handleQuantityChange(e, part.id, -1)}
                        className="flex justify-center items-center text-2xl w-8 h-8 border-2 border-black hover:bg-gray-200">
                        -
                      </button>
                      <button
                        name="update"
                        className="h-8 ml-4 px-2 border-2 border-black hover:bg-gray-200"
                        onClick={(e) => updateParts(part)}>
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <div className="flex-1">
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg flex items-center justify-center">
                Previous
              </button>
            )}
          </div>
          <div className="flex flex-1 justify-end">
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="self-end ml-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg flex justify-center">
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      <section className=" flex justify-end">
        <InventoryTools />
      </section>
    </div>
  );
}

function InventoryTools() {
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
        <AddNewItemForm></AddNewItemForm>
      </Modal>
      <Modal
        label="remove"
        modalBtn={removeModalBtn}>
        <RemoveItem></RemoveItem>
      </Modal>
    </div>
  );
}

function AddNewItemForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-2 min-h-[500px]">
      <section>
        <h3>Add item to inventory</h3>
      </section>
      <label
        htmlFor="name"
        className="input input-bordered flex items-center gap-2 text-black">
        Item name:
        <input
          id="name"
          name="name"
          type="text"
          className="grow"
          placeholder="Type here"
        />
      </label>
      <label
        htmlFor="quantity"
        className="input input-bordered flex items-center gap-2 text-black">
        Quantity:
        <input
          id="quantity"
          name="quantity"
          type="text"
          className="grow"
          placeholder="Type here"
        />
      </label>
      <label
        htmlFor="threshold"
        className="input input-bordered flex items-center gap-2 text-black">
        Inventory low alert:
        <input
          id="threshold"
          name="threshold"
          type="number"
          min={0}
          className="grow"
          placeholder="optional"
        />
      </label>

      <div className="flex justify-end">
        <button className="btn bg-green-700 hover:bg-green-700 hover:scale-105 text-white">
          add item
        </button>
      </div>
    </form>
  );
}

function RemoveItem() {
  return <div>remove item</div>;
}
