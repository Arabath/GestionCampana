import React from "react";
import useBreakpoint from "../../../../common/hooks/useBreakpoint";
//import AdminCriador from "./components/AdminCriador";

import { Box, Typography } from "@mui/material";
import AdminUsuarios from "./components/AdminUsuarios";
import AdminFechas from "./components/AdminFechas";
import AdminMap from "./components/AdminMap";
import ModalSolicitude from "./components/ModalSolicitude";
import { Tooltip, Zoom } from "@mui/material";
import AdminEmpresas from "./components/AdminEmpresas";

const GridVolqueteData = ({ data, isLoading }) => {
  const matchesXL = useBreakpoint("xl");
  const matchesLG = useBreakpoint("lg");
  const matchesMD = useBreakpoint("md");
  const matchesSM = useBreakpoint("sm");
  // console.log(data)
  return (
    <>
      <Box
        className="data-dog-container"
        sx={
          matchesMD
            ? { gridTemplateColumns: "repeat(2, 1fr)" }
            : { gridTemplateColumns: "repeat(1, 1fr)" }
        }
      >
        <AdminEmpresas data={data} isLoading={isLoading} />
        <AdminMap data={data} isLoading={isLoading} />
        <AdminFechas data={data} isLoading={isLoading} />
        <AdminUsuarios data={data} isLoading={isLoading} />
      </Box>
            
    </>
  );
};

export default GridVolqueteData;
