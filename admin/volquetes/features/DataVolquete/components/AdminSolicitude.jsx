import React from "react";
import { Box } from "@mui/material";
import AdminDatum from "../../../../components/AdminDatum"
import useBreakpoint from "../../../../../common/hooks/useBreakpoint";

const grid = {
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "20px",
  alignItems: "start",
  mb: 3,
  width: "95%",
};
const gridResponsive = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "5px",
  alignItems: "start",
  mb: 3,
  width: "95%",
};

const AdminSolicitude = ({ dataDog, isLoading }) => {
  const matches = useBreakpoint("sm")
  return (
    <div className="data-dog">
      <h3
        style={{
          textTransform: "uppercase",
          color: "#4428a2",
          alignSelf: "flex-start",
          paddingLeft: "2.5%",
        }}
      >
        Estado solicitud
      </h3>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum
          title="Aprobacion:"
          text={
            dataDog?.propietario?.nombres +
            " " +
            dataDog?.propietario?.apellidos
          }
          isLoading={isLoading}
        />
        <AdminDatum
          title="N° Autorización:"
          text={dataDog?.propietario?.domicilio}
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
};

export default AdminSolicitude;
