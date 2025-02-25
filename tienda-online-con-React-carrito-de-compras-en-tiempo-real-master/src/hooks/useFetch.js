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
        const fullUrl = `${API_URL}${endpoint}`; // API_URL ya incluye /api
        console.log("Full URL being called:", fullUrl); // Para debugging

        const config = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };

        console.log("Making request with config:", config);
        const response = await axios.get(fullUrl, config);
        console.log("Response received:", response);

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.data) {
          console.log("Setting data:", response.data);
          setData(response.data);
        } else {
          throw new Error("No data received from API");
        }
      } catch (err) {
        console.error("Full error object:", err);
        console.error("Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError(err.message || "Error connecting to API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
