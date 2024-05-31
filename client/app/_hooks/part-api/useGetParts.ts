import { useEffect, useState } from "react";

export default function useGetParts(lowInventory = false) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | { message: string }>(null);

  const fetchData = async () => {
    setError(null);
    try {
      setIsLoading(true);

      const res = await fetchPartsData({
        lowInventory,
      });

      setError(null);
      setData(res.data);
    } catch (error) {
      console.log("failed to fetch parts", error);
      setData([]);
      setError({ message: "Failed to fetch parts" });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
}

async function fetchPartsData({ lowInventory }: { lowInventory: boolean }) {
  const params = new URLSearchParams({ lowInventory: String(lowInventory) });

  const response = await fetch(`/api/parts?${params}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok  GET PART");
  }
  const data = await response.json();

  return data;
}
