import React from "react";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import useMyQuery from "../../../common/hooks/useMyQuery";
import MultipleMapMark from "../features/MultipleMap/MultipleMapMark";
import AdminNavBarContainer from "../../components/AdminNavBarContainer";
import { Box, Typography } from "@mui/material";
import { fetchVolquetesTable } from "../../../services/api";
import greenMark from "../../../assets/greenMark.png";
import goldMark from "../../../assets/goldMark.png";
import blueMark from "../../../assets/blueMark.png";

const css = {
  icon: { width: "25px" },
  iconBackground: {
    width: "45px",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    mr: "20px",
    borderRadius: "7.5px",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    mb: { xs: "10px", md: "20px" },
    // backgroundColor: "#1c87e5",
    p: "10px",
    borderRadius: "10px",
  },
  iconsContainer: { display: "flex", flexDirection: "column" },
};

const VolqueteHistorical = () => {
  const { auth } = useAuth();
  const token = auth.token;
  const { data, isLoading } = useMyQuery(["getVolquetes", token], () =>
    fetchVolquetesTable(token)
  );
  // console.log(data);
  return (
    <>
      <AdminNavBarContainer variant="volquetes" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          justifyContent: "space-between",
          p: { xs: "10px 16px 0 16px", md: "10px 25px 0 25px" },
        }}
      >
        <h2 style={{ margin: "0 0 10px 0", color: "#4428a2" }}>
          Volquetes actuales entre el{" "}
          {dayjs().subtract(9, "days").format("DD/MM/YYYY")} y hoy:
        </h2>
      </Box>

      <Box
        sx={{
          p: { xs: "0 16px", md: "0 25px" },
          display: { md: "grid", xs: "flex" },
          flexDirection: { md: "", xs: "column" },
          gridTemplateColumns: { md: "80% 20%", xs: "" },
          gap: "20px",
        }}
      >
        <MultipleMapMark data={data?.data} isLoading={isLoading} />
        <Box sx={css.iconsContainer}>
          <Typography variant="h5" fontWeight={700} sx={{mb: "15px"}}>Tipos de volquetes:</Typography>
          <Box sx={{...css.iconContainer, border: "1px solid #1aab19"}}>
            <Box sx={css.iconBackground}>
              <Box component="img" sx={css.icon} src={greenMark} />
            </Box>
            <Typography variant="h6" fontWeight={600}  color="#1aab19">
              Ramas
            </Typography>
          </Box>
          <Box sx={{...css.iconContainer, border: "1px solid #7b6921"}}>
            <Box sx={css.iconBackground}>
              <Box component="img" sx={css.icon} src={goldMark} />
            </Box>
            <Typography variant="h6" fontWeight={600} color="#7b6921">
              Aridos
            </Typography>
          </Box>
          {/* <Box sx={{...css.iconContainer, border: "1px solid #1c87e5"}}>
            <Box sx={css.iconBackground}>
              <Box component="img" sx={css.icon} src={blueMark} />
            </Box>
            <Typography variant="h6" fontWeight={600} color="#1c87e5">
              Especiales
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default VolqueteHistorical;
