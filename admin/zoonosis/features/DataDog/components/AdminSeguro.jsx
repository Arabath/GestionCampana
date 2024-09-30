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

const AdminSeguro = ({ dataDog, isLoading }) => {
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
        Seguro:
      </h3>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum
          title="Agente productor:"
          text={dataDog?.seguro?.agenteProductor}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Aseguradora:"
          text={dataDog?.seguro?.aseguradora}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Numero de Poliza:"
          text={dataDog?.seguro?.numeroPoliza}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Vencimiento:"
          text={dataDog?.seguro?.vencimiento.slice(0, 10)}
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
};

export default AdminSeguro;
