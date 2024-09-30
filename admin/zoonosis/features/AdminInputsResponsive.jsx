import React from "react";
import TextField from "@mui/material/TextField";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useBreakpoint from "../../../common/hooks/useBreakpoint";
import { CircularProgress } from "@mui/material";

const AdminInputsResponsive = ({
  isError,
  isLoading,
  selected,
  password,
  handleEmailChange,
  setPasword,
  emailText,
  inputPassword,
  handleInputPasswordChange,
  handleCheckboxChange,
}) => {
  // console.log(isLoading)
  const matches = useBreakpoint("sm");
  return (
    <>
      <div className={matches ? "input-container" : "input-container-mobile"}>
        <TextField
          error={
            isError === "vacio" || isError === "server"
              ? true
              : isError === "nombre"
              ? true
              : isError === "incorrecto"
              ? true
              : isError === "apellido" && false
          }
          id="input-name"
          // label={selected ? emailText : "Nombre"}
          label="Email"
          variant="standard"
          onChange={handleEmailChange}
          className={matches ? "input" : "input-mobile"}
          value={selected ? emailText : emailText}
        />
      </div>
      <div
        className={
          matches
            ? "input-container eye-container"
            : "input-container-mobile eye-container"
        }
      >
        <TextField
          error={
            isError === "vacio" || isError === "server"
              ? true
              : isError === "nombre"
              ? false
              : isError === "incorrecto"
              ? true
              : isError === "apellido" && true
          }
          id="input-password"
          // label={selected ? inputLastNameText : "Apellido"}
          label="Contraseña"
          type={password ? "text" : "password"}
          variant="standard"
          onChange={handleInputPasswordChange}
          className={matches ? "input" : "input-mobile"}
          // value={selected ? inputLastNameText : undefined}
          value={inputPassword}
        />

        <div
          className={matches ? "eye-position" : "eye-position-mobile"}
          onClick={() => setPasword(!password)}
        >
          {password ? (
            <FiEyeOff className="eye eye-close" />
          ) : (
            <FiEye className="eye eye-open" />
          )}
        </div>
      </div>
      {isError ? (
        <div className="error-relative">
          <div className="error-container">
            <span className="error">
              {isError === "vacio"
                ? "Debe completar los campos"
                : isError === "nombre"
                ? "Complete nombre de usuario"
                : isError === "incorrecto"
                ? "Datos incorrectos"
                : isError === "server"
                ? "Error en el servidor"
                : isError === "apellido" && "Complete apellido"}
            </span>
          </div>
        </div>
      ) : null}
      <div className="actives-container">
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="checkbox"
            // onClick={() => setCheck(!check)}
            onChange={handleCheckboxChange}
            checked={selected}
          />
          <span className={matches ? "span-text" : "span-text-mobile"}>
            Recordar usuario
          </span>
        </div>
        {/* <button className="button" onClick={saveData}>
      INGRESAR
    </button> */}
        <button className="button">INGRESAR</button>
       
      </div>
      {isLoading ? (
          <CircularProgress
            color="secondary"
            style={{
              marginTop: "20px"
            }}
          />
        ) : null}
    </>
  );
};

export default AdminInputsResponsive;
