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

const AdminDetalleSanitario = ({ dataDog, isLoading }) => {
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
        Detalle sanitario:
      </h3>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum
          title="Antirrabica:"
          text={dataDog?.detalleSanitario?.antirrabica === false ? "No" : "Si"}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Castrado:"
          text={dataDog?.detalleSanitario?.castrado === false ? "No" : "Si"}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Quintuple:"
          text={dataDog?.detalleSanitario?.quintuple === false ? "No" : "Si"}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Sextuple:"
          text={dataDog?.detalleSanitario?.sextuple === false ? "No" : "Si"}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Fecha de vencimiento:"
          text={dataDog?.detalleSanitario?.fechaDeVencimento.slice(0, 10)}
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
};

export default AdminDetalleSanitario;
