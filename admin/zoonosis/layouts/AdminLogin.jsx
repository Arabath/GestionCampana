import React, { useState } from "react";
import AdminForm from "../../components/AdminForm";
import logoMuni from "../../../assets/logo-municipal.png";
import useBreakpoint from "../../../common/hooks/useBreakpoint";
import LoginVolquetesFooter from "../../components/LoginVolquetesFooter";

const AdminLogin = () => {
  const matches = useBreakpoint("lg");
  const matchesMD = useBreakpoint("md")

  return (
    <div className="home-container">
      {matches && <div
        className="home"
        style={{flex: 2, transition: ".5s ease"}}
        
        onClick={() => setSide(false)}
      >
        <a href="https://www.campana.gob.ar/" style={{ cursor: "pointer" }}>
          <img
            className="logo"
            src={logoMuni}
            alt="logo municipalidad de campana"
          />
        </a>
      </div>} 
      <AdminForm />

      {matchesMD && <LoginVolquetesFooter />}
    </div>
  );
};

export default AdminLogin;
