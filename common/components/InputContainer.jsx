import { Box, Typography } from "@mui/material";

const css = {
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", md: "row" },
  },
  title: {
    fontWeight: "400",
    mb: "0px"
  },
  subtitle: {
    fontWeight: "400",
    mb: "10px",
    color: '#606060'
  }
};

const InputContainer = ({ children, title, subtitle, width }) => {
  return (
    <Box sx={{width: width}}>
      <Typography variant="h6" sx={css.title}>{title}</Typography>
      <Typography variant="subtitle2" sx={css.subtitle}>{subtitle}</Typography>
      <Box sx={css.inputContainer}>{children}</Box>
    </Box>
  );
};

export default InputContainer;
