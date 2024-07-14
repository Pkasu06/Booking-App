import { useState, useEffect } from "react";

export default function useGetAppointments(date) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setError(null);
    try {
      setIsLoading(true);
      // console.log("date", date);

      const res = await fetchAppointmentsData({
        date,
      });
      setError(null);
      setData(res.data);
      if (res.data?.status === 500) {
        setError(res.data.error);
        setData(null);
      } else {
        setData(res.data);
        setError(null);
      }
      // console.log("🚀 ~ fetchData ~ res.data:", res.data);
    } catch (error) {
      console.log("failed to fetch appointment Data", error);
      setData([]);
      setError({ message: "failed to fetch appointment Data", error });
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
}

async function fetchAppointmentsData({ date }) {
  const params = new URLSearchParams({ date });
  const response = await fetch(`/api/appointments?${params}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
}
