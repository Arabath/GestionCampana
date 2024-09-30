import React from "react";
import { Box, Typography } from "@mui/material";

const PopupData = ({ title, datum }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
        placeItems: "center",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          justifySelf: "flex-start",
          whiteSpace: "nowrap",
          color: "#4428a2",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ justifySelf: "flex-start", whiteSpace: "nowrap" }}
      >
        {datum}
      </Typography>
    </Box>
  );
};

export default PopupData;
