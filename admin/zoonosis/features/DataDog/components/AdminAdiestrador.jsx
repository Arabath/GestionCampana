import React from "react";
import { Box } from "@mui/material";
import AdminDatum from "../../../../components/AdminDatum"
import useBreakpoint from "../../../../../common/hooks/useBreakpoint";

const grid = {
  display: "grid",
  gridTemplateColumns: "50% 50%",
  gap: "5px",
  alignItems: "start",
  mb: 3,
  width: "95%",
};
const gridResponsive = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "5px",
  alignItems: "start",
  mb: 4,
  width: "95%",
};

const AdminAdiestrador = ({ dataDog, isLoading }) => {
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
        Adiestrador:
      </h3>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum
          title="Nombre::"
          text={
            dataDog?.adiestrador?.nombres +
            " " +
            dataDog?.adiestrador?.apellidos
          }
          isLoading={isLoading}
        />
        <AdminDatum
          title="Fecha:"
          text={dataDog?.adiestrador?.fecha.slice(0, 10)}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Matricula:"
          text={dataDog?.adiestrador?.matricula}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Tipo:"
          text={dataDog?.adiestrador?.tipo}
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
};

export default AdminAdiestrador;
