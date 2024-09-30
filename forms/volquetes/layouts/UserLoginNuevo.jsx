import React, { useMemo, useState } from "react";
import useBreakpoint from "../../../common/hooks/useBreakpoint";
import logoMuni from "../../../assets/logo-municipal.png";
import LoginVolquetesFooter from "../../../admin/components/LoginVolquetesFooter";
import { useForm } from "react-hook-form";
import volquetesMini from "../../../assets/volquetesMini.png";
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUserLogin } from "../hooks/use-login-user";
import { useInfo } from "../hooks/use-info";
import useAuth from "../../../admin/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../utils/paths";

const VolquetesLogin = () => {
  const matches = useBreakpoint("lg");
  const matchesMD = useBreakpoint("md");
  const { login, auth, serverError, isLoading } = useAuth();
  // const { data, error, isLoading } = useInfo()
  const mutation = useUserLogin();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [loginError, setLoginError] = useState("");

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .email({ message: "El formato del email es incorrecto" }),
        password: z
          .string()
          .nonempty({ message: "La contraseña es requerida" }),
      }),
    []
  );

  const emailFromLocalStorage = localStorage.getItem("email") || "";
  const checkInLocalStorage = localStorage.getItem("isChecked");

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailFromLocalStorage,
      password: "",
      isChecked: Boolean(checkInLocalStorage) ?? false,
    },
    resolver: zodResolver(validationSchema),
  });

  const invalidMail = () => {
    return errors.email;
  };

  const loginSubmit = async (formData) => {
    try {
      const response = await mutation.mutateAsync(formData);

      if (response.error) {
        if (response.error.status === 401) {
          setLoginError("Email or password incorrect");
        } else {
          setLoginError(response.message || "An error occurred");
        }
      } else {
        setLoginError(""); // Clear error message if login is successful
        if (watch("isChecked")) {
          localStorage.setItem("email", formData.email);
          localStorage.setItem("isChecked", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("isChecked");
        }
        login({ email: formData.email, password: formData.password });
        navigate(routes.volquetesUserDashboard);
        // console.log("Guardado correctamente");
      }
    } catch (error) {
      setLoginError("Error al enviar el formulario: " + error.message);
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="home-container">
      {matches && (
        <div className="home" style={{ flex: 2, transition: ".5s ease" }}>
          <a href="https://www.campana.gob.ar/" style={{ cursor: "pointer" }}>
            <img
              className="logo"
              src={logoMuni}
              alt="logo municipalidad de campana"
            />
          </a>
        </div>
      )}
      <div className="container no-overflow">
        <form
          className={
            matches ? "form-container user-login auto-height" : "form-container-mobile"
          }
          onSubmit={handleSubmit(loginSubmit)}
        >
          <div className="img-login">
            <img src={volquetesMini} alt="volquetes mini" />
          </div>
          <div className={matches ? "text-container" : "text-container-mobile"}>
            <p className="text-login">
              <span className="span-text">
                Ingrese usuario y contraseña para acceder al portal de
                volquetera
              </span>
            </p>
          </div>
          <div className="input-users">
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
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
            </FormControl>
            {!errors.email && <div style={{ minHeight: "2em" }}></div>}
            {errors.email && (
              <p role="alert" className="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="input-users">
            <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                Contraseña
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {!errors.password ||
              (loginError && <div style={{ minHeight: "2em" }}></div>)}
            {errors.password && (
              <p role="alert" className="alert">
                {errors.password.message}
              </p>
            )}
            {loginError && (
              <p role="alert" className="alert">
                {loginError}
              </p>
            )}
            <div className="checkbox-user">
              <input
                id="rememberme"
                name="rememberme"
                type="checkbox"
                className="check"
                {...register("isChecked", {
                  onChange: (e) => setValue("isChecked", e.target.checked),
                })}
              />
              <label className="">Recordar el correo</label>
            </div>
          </div>
          <input type="submit" className="button" disabled={invalidMail()} />
          <div className="reset-pass">
            <a href="/volquetes/login/reset-password">¿Olvidó su contraseña?</a>
          </div>
          {/* {loginError && (
    <p role="alert" className="alert">
      {loginError}
    </p>
  )} */}
        </form>
      </div>
      {matchesMD && <LoginVolquetesFooter />}
    </div>
  );
};

export default VolquetesLogin;
