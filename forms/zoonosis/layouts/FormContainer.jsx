import React from "react";
import backgroundZoonosis from "../../../assets/dalmata.jpg";
import useBreakpoint from "../../../common/hooks/useBreakpoint";
import logoMuni from "../../../assets/logo-municipal.png";
import { Box } from "@mui/material";
import Form from "./Form";

const css = {
  backgroundImage: {
    display: { xs: "none", sm: "block" },
    backgroundImage: `url(${backgroundZoonosis})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
  },
  container: {
    display: "grid",
    gridTemplateColumns: { lg: "1fr 2fr" },
  },
  formContainer: {
    width: "100%",
    height: "100vh",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center",
    p: "2.5vh 0",
  },
};

const FormContainer = () => {
  const matchesLG = useBreakpoint("lg");

  return (
    <Box sx={css.container}>
      {matchesLG && (
        <Box style={css.backgroundImage}>
          <Box
            component="a"
            href="https://www.campana.gob.ar/"
            style={{ cursor: "pointer" }}
          >
            <Box
              component="img"
              className="logo"
              src={logoMuni}
              alt="logo municipalidad de campana"
            />
          </Box>
        </Box>
      )}
      <Box sx={css.formContainer}>
        <Form />
      </Box>
    </Box>
  );
};

export default FormContainer;
