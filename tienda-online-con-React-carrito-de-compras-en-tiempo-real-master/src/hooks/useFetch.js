import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fullUrl = `${API_URL}${endpoint}`;
        console.log("API_URL:", API_URL);
        console.log("Endpoint:", endpoint);
        console.log("Full URL:", fullUrl);

        const response = await axios.get(fullUrl);
        console.log("Response:", response);

        if (response.data) {
          console.log("Received data:", response.data);
          setData(response.data);
        } else {
          throw new Error("No data received from API");
        }
      } catch (err) {
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          headers: err.response?.headers,
          config: err.config,
        });

        setError(
          err.response?.data?.message ||
            err.message ||
            "Error connecting to API"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
      fetchData();
    },
  };
};

export default useFetch;
