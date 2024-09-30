import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FaMoneyBill } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import BotonEPago from "../BotonEPago/BotonEPago";
import { WidthFull } from "@mui/icons-material";
import '../../../../Styles/modalConfirma.css'
import { usePostAgrupacion } from "../../hooks/use-post-agrupacion";

export default function ModalConfirma({
  montoOperacion,
  detalleOperacion,
  detalleAgrupacion,
  onClose,
  selectedRows,
}) {
  // console.log('detalleAgrupacion: ',detalleAgrupacion)
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const mutation = usePostAgrupacion();

  const [operacionAgrupada, setOperacionAgrupada] = React.useState(null);

// console.log('operacionAgrupada:', operacionAgrupada);

  let dato = {
    data: {
      convenio: "",
      detalle_operacion: encodeURIComponent(JSON.stringify(detalleOperacion)),
      monto_operacion: montoOperacion, // la sumatoria de monto_item
      numero_operacion: operacionAgrupada,  // la response.data.uuid de onSelectPay
      error_url: "https://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/Epagos/Callback/Error",
      ok_url: "http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/Epagos/Callback/Ok",
      id_moneda_operacion: 1,
      operacion: "op_pago",
      version: "1.0",
      detalle_operacion_visible: 1,
    },
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const onSelectPay = async () => {
    setOpen(true);
    try {
      mutation.mutate(detalleAgrupacion, {
        onSuccess: (response) => {
          const numeroOperacion = response.data.uuid;
          console.log("Datos a enviar:", dato);
          setOperacionAgrupada(numeroOperacion);
          setOpen(true); 
        },
        onError: (error) => {
          console.error("Error en la solicitud a getAgrupacion:", error);
        },
      });
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  // console.log(dato)

  return (
    <>
      <Button
        variant="outlined"a
        onClick={onSelectPay}
        disabled={selectedRows.length === 0}
      >
        Pagar Selección
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={true}
        maxWidth={"sm"}
      >
      <div className="warning-confirma">
        <CiWarning />
      </div>
        <DialogTitle id="responsive-dialog-title">
          {"Usted va a pagar: "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "500",
            }}
          >
            <FaMoneyBill className="bill-confirma" />
            DERECHOS DE OFICINA - SOLICITUD DE VOLQUETES: $ {montoOperacion}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <BotonEPago onClick={handleClose} autoFocus data={dato.data}>
            Aceptar
          </BotonEPago>
        </DialogActions>
      </Dialog>
    </>
  );
}
