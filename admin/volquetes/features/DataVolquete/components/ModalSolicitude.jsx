import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import LoadingButton from "../../../../../common/components/LoadingButton.jsx"

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
    minWidth: "240px",
    mb: "20px",
  },
};

export default function ModalSolicitude({ open, handleClose, changeStatus, loading }) {
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
              ¿Estás seguro de rechazar la solicitud?
            </Typography>

            <Typography subtitle="h2" sx={{ mb: "20px" }}>
              Detalle los motivos del rechazo debajo.
            </Typography>

            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="Motivo del rechazo"
              helperText="max. 500 carácteres"
              inputProps={{ maxLength: 500 }}
              value={message}
              onChange={handleChange}
              sx={css.input}
            />

            <Box sx={css.buttonContainer}>
              <LoadingButton
                loading={loading}
                loadingColor="tertiary"
                variant="contained"
                onClick={() => changeStatus(false, message)}
              >
                Enviar
              </LoadingButton>
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
