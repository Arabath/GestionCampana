import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const css = {
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "30px",
    minWidth: "310px",
    p: 4,
  },
  buttonContainer: {
    mt: "5px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    width: "100%",
    minWidth: {
        xs:'240px',
        md:'500px'
    } ,
    mb: "20px",
  },
};

export default function ModalSolicitude({ open, handleClose, changeStatus, data }) {
  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <Modal 
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={css.modal}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "#4428a2",
                alignSelf: "center",
                margin: 0,
              }}
            >
              Motivo del rechazo
            </Typography>

            <TextField
              id="outlined-multiline-static"
              multiline
              minRows={5}
              maxRows={10}
              inputProps={{ maxLength: 128 }}
              value={data.mensaje}
              sx={css.input}
            />

            <Box sx={css.buttonContainer}>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Cerrar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
