import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import LoadingButton from "../../../../../common/components/LoadingButton";
import altaIcon from "../../../../../assets/alta.svg";
import bajaIcon from "../../../../../assets/baja.svg";
import ModalSolicitude from "./ModalSolicitude";
import useAuth from "../../../../hooks/useAuth";

const VolqueteStatus = ({ id, token, data, mutate, loading, handleOpen, handleCloseModal, open}) => {
  const { auth } = useAuth();

  const changeStatus = (volqueteStatus, message) => {
    const payload = {
      id: parseInt(id),
      aprobado: volqueteStatus,
      message: message,
      token: token,
    };
    mutate(payload, {
      onSuccess: () => {
        handleClose();  
      },
    });
  };
 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
// console.log(auth)
  return (
    <>
      {/* <LoadingButton
        loading={loading}
        variant="contained"
        onClick={handleMenu}
        sx={{ fontWeight: "600" }}
        color="secondary"
        loadingColor="tertiary"
        disabled={data?.aprobado !== null || (auth?.permisos?.includes("VOLQUETES_READ_ONLY"))}

      >
        Cambiar estado
      </LoadingButton> */}
      <Menu
        sx={{ mt: "50px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          style={{ color: "#1b5e20", fontWeight: "600" }}
          onClick={() => {
            changeStatus(true, null);
            handleClose();
          }}
        >
          <img src={altaIcon} alt="icono de alta" />
          Aprobar
        </MenuItem>
        <MenuItem
          style={{ color: "#c62828", fontWeight: "600" }}
          onClick={() => {
            handleClose();
            handleOpen();
          }}
        >
          <img src={bajaIcon} alt="icono de baja" />
          Rechazar
        </MenuItem>
      </Menu>
      <ModalSolicitude 
        loading={loading}
        changeStatus={changeStatus}
        open={open}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default VolqueteStatus;
