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


const AdminFechas = ({ data, isLoading }) => {
  const matches = useBreakpoint("sm")

  // Parsing DATES
  let fechaAlta = new Date(data?.fechaAlta).toLocaleString("es-BA", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  let diaEntrega = new Date(data?.diaEntrega).toLocaleString("es-BA", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  let diaRetiro = new Date(data?.diaRetiro).toLocaleString("es-BA", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  
  return (
    <Box className="data-dog">
      <h3
        style={{
          textTransform: "uppercase",
          color: "#4428a2",
          alignSelf: "flex-start",
          paddingLeft: "2.5%",
        }}
      >
        Fechas
      </h3>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum
          title="Fecha:"
          text={fechaAlta}
          isLoading={isLoading}
        />
        <AdminDatum
          title=""
          text=""
          isLoading={isLoading}
        />
        <AdminDatum
          title="Dia de entrega:"
          text={diaEntrega}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Dia de retiro:"
          text={diaRetiro}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default AdminFechas;
