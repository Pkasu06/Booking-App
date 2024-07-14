import useGetParts from "@/app/_hooks/part-api/useGetParts";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function AdminLowInventoryWidget() {
  let lowInventory = false;
  const {
    data: getPartsData,
    isLoading: getPartsIsLoading,
    error: getPartsError,
  } = useGetParts(lowInventory);

  const findLowInventoryParts = (partsInventory) => {
    let lowInventoryParts = [];
    for (let i = 0; i < partsInventory.length; i++) {
      let lowInventoryPart = { name: "", quantity: 0 };
      if (partsInventory[i].quantity < partsInventory[i].threshold) {
        lowInventoryPart.name = partsInventory[i].name;
        lowInventoryPart.quantity = partsInventory[i].quantity;
        lowInventoryParts.push(lowInventoryPart);
      }
    }
    return lowInventoryParts;
  };
  let lowInventoryList = findLowInventoryParts(getPartsData);

  if (getPartsIsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-black text-center pb-10 font-bold">
        Low Inventory Summary
      </h1>
      <table className=" text-black w-full min-w-full divide-y divide-gray-200">
        <thead className="text-black w-full max-w-full border-2 border-black rounded-3xl bg-gray-50">
          <tr className="mb-7">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mt-4 overflow-scroll max-h-max">
          {lowInventoryList.map((item, index) => {
            return (
              <tr
                className="hover"
                key={uuidv4()}>
                <th
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  key={uuidv4()}>
                  {index + 1}
                </th>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  key={uuidv4()}>
                  {item.name}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  key={uuidv4()}>
                  {item.quantity}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
