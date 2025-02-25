import React from "react";

const Debug = ({ data, error, loading }) => {
  return (
    <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}>
      <h3>Debug Info:</h3>
      <p>Loading: {loading.toString()}</p>
      <p>Error: {error || "None"}</p>
      <p>Data: {data ? "Received" : "No data"}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Debug;
