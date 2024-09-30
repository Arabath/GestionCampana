import React from "react";
import { LinearProgress } from "@mui/material";

const AdminDatum = ({ title, text, isLoading }) => {
  return (
    <div
      style={{ display: "grid", width: "90%", gridTemplateColumns: "1fr 1fr"}}
    >
      <h1
        style={{ margin: "0 20px 0 0 ", fontSize: "1.8rem", whiteSpace: "wrap", color: "#4428a2"  }}
      >
        {title}
      </h1>
      {isLoading ? (
        <LinearProgress sx={{ mt: 1, mb: 2 }} />
      ) : (
        <div style={{ fontSize: "1.8rem", width: "100%", wordBreak: "break-word"}}>{text}</div>
      )}
    </div>
  );
};

export default AdminDatum;
