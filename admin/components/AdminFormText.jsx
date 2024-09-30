import React from "react";
import useBreakpoint from "../../common/hooks/useBreakpoint"

const AdminFormText = () => {
  const matches = useBreakpoint("sm")
  return (
    <div className={matches ? "text-container" : "text-container-mobile"}>
      <h1 className="title-text">PORTAL DE GESTIÓN DE CAMPANA</h1>
      <span className="span-text">Acceso administradores</span>
      <p className="text">
        Ingrese usuario y contraseña para acceder al portal con privilegios de
        administrador
      </p>
    </div>
  );
};

export default AdminFormText;
