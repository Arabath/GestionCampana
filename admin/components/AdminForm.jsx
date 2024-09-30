import React, { useState, useEffect } from "react";
import AdminFormText from "./AdminFormText";
import useBreakpoint from "../../common/hooks/useBreakpoint";
import useAuth from "../hooks/useAuth";
import AdminInputsResponsive from "../zoonosis/features/AdminInputsResponsive";

const AdminForm = () => {
  const matches = useBreakpoint("sm");
  const { login, auth, serverError, isLoading } = useAuth();
  const initialState = "";
  const [emailText, setEmailText] = useState(initialState);
  const [inputPassword, setInputPassword] = useState(initialState);
  const [selected, setSelected] = useState("");
  const [isError, setIsError] = useState("");
  const [password, setPasword] = useState(false);
  const handleEmailChange = (e) => {
    setEmailText(e.target.value);
  };
  const handleInputPasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setSelected(e.target.checked);

    if (e.target.checked === false) {
      localStorage.removeItem("nombre", emailText);
      localStorage.removeItem("contraseña", inputPassword);
      localStorage.setItem("toggle-switch", false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dependencie) {
      if (selected === true) {
        localStorage.setItem("nombre", emailText);
        localStorage.setItem("contraseña", inputPassword);
      }
      if (emailText !== "" && inputPassword !== "") {
        localStorage.setItem("toggle-switch", selected === true);
      }
      login({ email: emailText, password: inputPassword });
      // navigate("/admin/zoonosis");
    }
    if (emailText === "" && inputPassword === "") {
      setTimeout(() => {
        setIsError("vacio");
      }, 0);
      setTimeout(() => {
        setIsError("");
      }, 3000);
    } else if (emailText === "" && inputPassword.length > 1) {
      setTimeout(() => {
        setIsError("nombre");
      }, 0);
      setTimeout(() => {
        setIsError("");
      }, 3000);
    } else if (inputPassword === "" && emailText.length > 1) {
      setTimeout(() => {
        setIsError("apellido");
      }, 0);
      setTimeout(() => {
        setIsError("");
      }, 3000);
    } else if (auth.status === 1) {
      setTimeout(() => {
        setIsError("incorrecto");
      }, 0);
      setTimeout(() => {
        setIsError("");
      }, 3000);
    } else if (serverError === true) {
      setTimeout(() => {
        setIsError("server");
      }, 0);
      setTimeout(() => {
        setIsError("");
      }, 3000);
    }
  };

  const dependencie =
    emailText !== initialState &&
    inputPassword !== initialState &&
    emailText != null &&
    inputPassword != null;

  // RECIBIR INFORMACION DE LOCAL STORAGE

  const getNameData = () => {
    return localStorage.getItem("nombre");
  };

  const getPasswordData = () => {
    return localStorage.getItem("contraseña");
  };

  const getToggleData = () => {
    return localStorage.getItem("toggle-switch") === "true";
  };

  useEffect(() => {
    if (window.localStorage.length === 1) {
      const inputP = document.getElementById("input-password");
      const inputN = document.getElementById("input-name");
      if (inputP.value === "" || inputN.value === "") {
        setInputPassword(inputPassword);
        setEmailText(emailText);
      } else {
        setInputPassword(inputP.value);
        setEmailText(inputN.value);
      }
    } else {
      setEmailText(getNameData());
      setInputPassword(getPasswordData());
      setSelected(getToggleData());
    }
  }, []);
  
  return (
    <div className="container">
      <form
        className={matches ? "form-container" : "form-container-mobile"}
        onSubmit={handleSubmit}
      >
        <AdminFormText />
        <AdminInputsResponsive
          serverError={serverError}
          isError={isError}
          isLoading={isLoading}
          selected={selected}
          password={password}
          handleEmailChange={handleEmailChange}
          setPasword={setPasword}
          emailText={emailText}
          inputPassword={inputPassword}
          handleInputPasswordChange={handleInputPasswordChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      </form>
    </div>
  );
};

export default AdminForm;
