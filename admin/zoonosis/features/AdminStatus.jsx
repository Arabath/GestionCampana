import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button } from "@mui/material";
import altaIcon from "../../../assets/alta.svg";
import bajaIcon from "../../../assets/baja.svg";


const AdminStatus = ({ id, token, mutate}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  //const [dogState, setDogState] = useState("");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatus = (dogState, message) => {
    const payload = {
      dogId: parseInt(id),
      state: dogState,
      token: token,
    };
    mutate(payload, {
      onSuccess: () => {
        handleClose();
      },
    });
  };


  return (
    <>
      <Button
        variant="contained"
        onClick={handleMenu}
        sx={{ fontWeight: "600" }}
        color="secondary"
      >
        Cambiar estado
      </Button>
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
            //setDogState(1);
            changeStatus(1);
            handleClose();
          }}
        >
          <img src={altaIcon} alt="icono de alta" />
          Aprobar
        </MenuItem>
        <MenuItem
          style={{ color: "#c62828", fontWeight: "600" }}
          onClick={() => {
            //setDogState(2);
            changeStatus(2);
            handleClose();
          }}
        >
          <img src={bajaIcon} alt="icono de baja" />
          Rechazar
        </MenuItem>
      </Menu>
    </>
  );
};

export default AdminStatus;
