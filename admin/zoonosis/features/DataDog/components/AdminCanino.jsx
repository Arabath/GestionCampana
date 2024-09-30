import React from "react";
import { Box } from "@mui/material";
import AdminDatum from "../../../../components/AdminDatum"
import useBreakpoint from "../../../../../common/hooks/useBreakpoint";
import { LinearProgress } from "@mui/material";
import altaIcon from "../../../../../assets/alta.svg";
import bajaIcon from "../../../../../assets/baja.svg";
import pendienteIcon from "../../../../../assets/pendiente.svg";

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
const AdminCanino = ({ dataDog, isLoading }) => {
  const matches = useBreakpoint("sm");
  // console.log(dataDog);
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
        Canino:
      </h3>
      <Box sx={matches ? grid : gridResponsive}>
        <AdminDatum
          title="Nombre:"
          text={dataDog?.canino?.nombre}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Edad:"
          text={dataDog?.canino?.edad}
          isLoading={isLoading}
        />
        <div
          style={{
            display: "grid",
            width: "90%",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <h1
            style={{
              margin: "0 20px 0 0 ",
              fontSize: "1.8rem",
              whiteSpace: "wrap",
              color: "#4428a2",
            }}
          >
            Estado:
          </h1>
          {isLoading ? (
            <LinearProgress sx={{ mt: 1, mb: 2 }} />
          ) : (
            <div
              style={{
                fontSize: "1.8rem",
                width: "100%",
                wordBreak: "break-word",
              }}
            >
              {dataDog?.estado === 0 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={pendienteIcon} alt="icono de baja" />
                  <div style={{ color: "#01579b" }}>Pendiente</div>
                </div>
              ) : dataDog?.estado === 1 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={altaIcon} alt="icono de baja" />
                  <div style={{ color: "#1b5e20" }}>Aceptado</div>
                </div>
              ) : (
                dataDog?.estado === 2 && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={bajaIcon} alt="icono de baja" />
                    <div style={{ color: "#c62828" }}>Rechazado</div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <AdminDatum
          title="Color del pelo:"
          text={dataDog?.canino?.pelajeColor}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Tamaño del pelo:"
          text={dataDog?.canino?.pelajeTamaño}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Raza:"
          text={dataDog?.canino?.raza}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Tamaño:"
          text={dataDog?.canino?.tamaño}
          isLoading={isLoading}
        />
        <AdminDatum
          title="Sexo:"
          text={
            dataDog?.canino?.sexo === false
              ? "Perro"
              : dataDog?.canino?.sexo === true && "Perra"
          }
          isLoading={isLoading}
        />
      </Box>
    </div>
  );
};

export default AdminCanino;
