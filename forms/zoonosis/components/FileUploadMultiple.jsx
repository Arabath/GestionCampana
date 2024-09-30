function FileUploadMultiple({selectedPhoto, setSelectedPhoto}) {
  return (
    <div className='upload-wrapper'>
      <div className='seccion-izq'>

        <p className="adjuntar-img"> ● Adjuntar imagen Frente</p>
        <div className='upload-photo'>
            <input type="file"  
                  accept='image/png, image/jpeg'
                  name="frente"
                  value={selectedPhoto}
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}

                  />
        </div>

        <p className="adjuntar-img"> ● Adjuntar imagen Trasera</p>
        <div className='upload-photo'>
          <input type="file"  
                accept='image/png, image/jpeg'
                name="trasera"
                value={selectedPhoto}
                onChange={(e) => setSelectedPhoto(e.target.files[0])}

                />
          </div>
        
        <p className="adjuntar-img"> ● Adjuntar imagen Lateral izquierdo</p>
        <div className='upload-photo'>
          <input type="file"         
                accept='image/png, image/jpeg'
                name="latizq"
                value={selectedPhoto}
                onChange={(e) => setSelectedPhoto(e.target.files[0])}

                />
        </div>
      </div>
      
      <div className='seccion-der'>

        <p className="adjuntar-img"> ● Adjuntar imagen Lateral derecho </p>
        <div className='upload-photo'>
          <input type="file" 
                accept='image/png, image/jpeg'
                name="latder"
                value={selectedPhoto}
                onChange={(e) => setSelectedPhoto(e.target.files[0])}

                />
        </div>
       
        <p className="adjuntar-img"> ● Adjuntar imagen 3/4 perfil dcho.</p>
          <div className='upload-photo'>
            <input type="file"                 
                  accept='image/png, image/jpeg'
                  name="trescuartosdcho"
                  value={selectedPhoto}
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}

                  />
          </div>

        <p className="adjuntar-img"> ● Adjuntar imagen 3/4 perfil izq.</p>
          <div className='upload-photo'> 
            <input type="file"  
                  accept='image/png, image/jpeg'
                  name="trescuartosizq"
                  value={selectedPhoto}
                  onChange={(e) => setSelectedPhoto(e.target.files[0])}

                  />
          </div>
      </div>  
    </div>
  );
}

export default FileUploadMultiple;
