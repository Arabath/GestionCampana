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

const AdminUsuarios = ({ data, isLoading }) => {
  const matches = useBreakpoint("sm")
  // console.log(data)
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
        Datos usuario
      </h3>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum
          title="Nombre del solicitante:"
          text={data?.nombreSolicitante ?? "-"}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Calle:"
          text={data?.calle ?? "-"}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Altura:"
          text={data?.altura ?? "-"}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Entre calles:"
          text={data?.entreCalle?.item1 === null && data?.entreCalle?.item2 === null ? "-" : data?.entreCalle?.item1 + " - " + data?.entreCalle?.item2}
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
};

export default AdminUsuarios;
