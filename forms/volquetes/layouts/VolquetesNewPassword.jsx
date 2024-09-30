import React, { useMemo, useState } from "react";
import useBreakpoint from "../../../common/hooks/useBreakpoint";
import logoMuni from "../../../assets/logo-municipal.png";
import LoginVolquetesFooter from "../../../admin/components/LoginVolquetesFooter";
import { useForm } from "react-hook-form";
import volquetesMini from "../../../assets/volquetesMini.png";
import { TextField, Alert } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePass } from "../hooks/use-change-pass";

const VolquetesNewPassword = () => {
  const matches = useBreakpoint("lg");
  const matchesMD = useBreakpoint("md");
  const mutation = useChangePass();
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false); 

  function getHashFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('hash');
  }

  const hash = getHashFromUrl();

  const validationSchema = useMemo(
    () =>
      z
        .object({
          password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
          confirmPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
          if (password !== confirmPassword) {
            ctx.addIssue({
              code: "custom",
              message: "Las contraseñas no coinciden",
              path: ["confirmPassword"],
            });
          }
        }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    const body = {
      Hash: hash,
      Password: formData.password,
    };

    try {
      const response = await mutation.mutateAsync(body);
      if (response) {
        setIsError(false);
        setResponseMessage("Contraseña actualizada con éxito.");
      }
    } catch (error) {
      setIsError(true);
      setResponseMessage("Error al actualizar la contraseña: " + error.message);
    }
  };

  return (
    <div className="home-container">
      {matches && (
        <div className="home" style={{ flex: 2, transition: ".5s ease" }}>
          <a href="https://www.campana.gob.ar/" style={{ cursor: "pointer" }}>
            <img className="logo" src={logoMuni} alt="logo municipalidad de campana" />
          </a>
        </div>
      )}
      <div className="container no-overflow">
        <form
          className={matches ? "form-container user-login auto-height" : "form-container-mobile"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="img-login">
            <img src={volquetesMini} alt="volquetes mini" />
          </div>
          <div className={matches ? "text-container" : "text-container-mobile"}>
            <p className="text-login">
              <span className="span-text">
                Ingrese su nueva contraseña para el portal de Volqueteras
              </span>
            </p>
          </div>
          <div className="input-users">
            <TextField
              fullWidth
              label="Nueva contraseña: "
              id="password"
              type="password"
              variant="standard"
              placeholder="nueva contraseña"
              className=""
              {...register("password")}
            />
            {!errors.password && <div style={{ minHeight: "2em" }}></div>}
            {errors.password && (
              <p role="alert" className="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="input-users">
            <TextField
              fullWidth
              label="Repita contraseña: "
              id="confirmPassword"
              type="password"
              variant="standard"
              placeholder="repita contraseña"
              className=""
              {...register("confirmPassword")}
            />
            {!errors.confirmPassword && <div style={{ minHeight: "2em" }}></div>}
            {errors.confirmPassword && (
              <p role="alert" className="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <input type="submit" className="button" />
          <div className="reset-pass">
            <a href="/volquetes/login">Volver a login</a>
          </div>
        </form>
        {/* DARLE UBICACIÓN A ESTA RESPUESTA */}
        {responseMessage && (
          <Alert severity={isError ? "error" : "success"}>{responseMessage}</Alert>
        )}
      </div>
      {matchesMD && <LoginVolquetesFooter />}
    </div>
  );
};

export default VolquetesNewPassword;
