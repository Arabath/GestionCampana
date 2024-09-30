import React from "react";
import paw from "../../assets/logos/paw.svg"
import volqueteViolet from "../../assets/logos/volqueteViolet.svg"

const Loading = () => {
  return (
    <div style={{width: "100%", height: "100vh", display: "flex", placeContent: "center"}}>
      <img src={window.location.pathname.includes("volquete") ? volqueteViolet : paw} className="paw-loading" alt="imagen de carga" />
    </div>
  );
};

export default Loading;
  