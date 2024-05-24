"use client";
import usePostPart from "@/app/_hooks/part-api/usePostPart";
import { useRouter } from "next/navigation";

export function AddNewItemForm() {
  const { isLoading, postPart } = usePostPart();
  const router = useRouter();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());

        try {
          await postPart({
            name: formEntries.name as string,
            quantity: Number(formEntries.quantity),
            threshold: Number(formEntries.threshold),
          });

          window.location.reload();
        } catch (error) {
          console.log("error post part data");
          console.log("error", error);
        }
      }}
      className="flex flex-col gap-2 min-h-[500px] ">
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
