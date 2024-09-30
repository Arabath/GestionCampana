import React, { useEffect } from 'react';

const EpagosOk = ({ response }) => {
  console.log('respuesta:', response);

  useEffect(() => {
    if (response && response.pdf) {
      const pdfBase64 = response.pdf;
      
      // Decodificar el contenido base64 y crear un Blob
      const byteCharacters = atob(pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      
      // Crear una URL del Blob
      const url = window.URL.createObjectURL(blob);
      
      // // Abrir el PDF en una nueva pestaña
      const newTab = window.open();
      newTab.location = url;

      // Crear un enlace para descargar el PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = `documento-${response.id}.pdf`;  // Nombre del archivo con ID
      document.body.appendChild(a);  // Añadir el enlace al DOM
      a.click();  // Descargar el archivo
      document.body.removeChild(a);  // Remover el enlace del DOM

      // Liberar la URL después de un tiempo (para dar tiempo de abrir en pestaña y descargar)
      setTimeout(() => {
        window.URL.revokeObjectURL(url);  // Liberar la URL
      }, 100);
    }
  }, [response]);

  return null;  // No necesitas renderizar nada en este componente
};

export default EpagosOk;






// import React from 'react'

//   const pdfBase64 = response.data.pdf;
//   // Decodificar el contenido base64 a binario
//   const binaryPdf = atob(pdfBase64);
//   // Convertir la cadena binaria a un ArrayBuffer
//   const arrayBuffer = new Uint8Array(binaryPdf.length);
//   for (let i = 0; i < binaryPdf.length; i++) {
//     arrayBuffer[i] = binaryPdf.charCodeAt(i);
//   }
//   // Crear un Blob y descargar el PDF
//   const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
//   const url = window.URL.createObjectURL(blob);
//   // Crear un enlace de descarga
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'documento.pdf';  // Nombre del archivo
//   a.click();  // Descargar el archivo



// const EpagosOk = () => {
//   return (
//     <div>
//       HolaBob OK!!
//     </div>
//   )
// }

// export default EpagosOk
