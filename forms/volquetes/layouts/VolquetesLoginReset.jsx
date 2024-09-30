import React, { useMemo, useState } from "react";
import useBreakpoint from "../../../common/hooks/useBreakpoint";
import logoMuni from "../../../assets/logo-municipal.png";
import LoginVolquetesFooter from "../../../admin/components/LoginVolquetesFooter";
import { useForm } from "react-hook-form";
import volquetesMini from "../../../assets/volquetesMini.png";
import { Button, TextField } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPass } from "../hooks/use-reset-pass";

const VolquetesLoginReset = () => {
  const matches = useBreakpoint("lg");
  const matchesMD = useBreakpoint("md");
  const mutation = useResetPass();

  const [responseMessage, setResponseMessage] = useState('')
  
  const validationSchema = useMemo(
    () =>
      z.object({
        email: z.string().email({ message: "El formato del email es incorrecto" }),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    // console.log("Form data:", formData);
    try {
      const response = await mutation.mutateAsync(formData);
      if (response) {
        setResponseMessage(response.message);
      }     
    } catch (error) {
      setResponseMessage('Error al enviar: ' + error.message);
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
      <div className="container">
        <form
          className={matches ? "form-container user-login" : "form-container-mobile"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="img-login">
            <img src={volquetesMini} alt="volquetes mini" />
          </div>
          <div className={matches ? "text-container" : "text-container-mobile"}>
            <p className="text">
              <span className="span-text">
                Ingrese el correo electrónico registrado, le enviaremos instrucciones.
              </span>
            </p>
          </div>
          <div className="input-users">
            <TextField
              fullWidth
              label="Correo: "
              variant="standard"
              id="new-email"
              type="text"
              placeholder="correo electrónico"
              className=""
              {...register("email", {
                required: "El email es requerido",
              })}
            />
            {!errors.email && <div style={{ minHeight: '2em' }}></div>}
            {errors.email && (
              <p role="alert" className="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button variant="contained" type="submit" className="button">
            enviar
          </Button>
          <div className="reset-pass">
            <a href="/volquetes/login">Volver a login</a>
          </div>
        </form>
      </div>
      {matchesMD && <LoginVolquetesFooter />}
    </div>
  );
}

export default VolquetesLoginReset;
