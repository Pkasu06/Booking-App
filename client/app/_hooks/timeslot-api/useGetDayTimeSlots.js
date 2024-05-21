import { useEffect, useRef, useState } from "react";

export default function useGetDayTimeSlots(date) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const res = await fetchTimeSlotData({
        date,
      });

      setError(null);
      setData(res.data);
    } catch (error) {
      console.log("failed to fetch timeslots for day", error);

      setData([]);
      setError({ message: "failed to fetch timeslots for day", error });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
}

async function fetchTimeSlotData({ date, signal }) {
  const response = await fetch(`/api/timeslots/${date}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  return data;
}
