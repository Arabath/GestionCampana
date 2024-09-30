//VENTANA MODAL CONVENIOS E-PAGOS
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../Styles/modalEpagos.css";
import BotonEPago from "../BotonEPago/BotonEPago";
// import getAgrupacion from "../../services/apiAgrupacion";
import { FaLandmark } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMoneyBill,
//   faCreditCard,
//   faLandmark,
// } from "@fortawesome/free-solid-svg-icons";


function ModalEpagos({ Price, importe, causa, detalleCuota, allCuotas }) {

  const [show, setShow] = useState(false);
  const [convenio, setConvenio] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getConvenio = (convenio) => {
    setConvenio(convenio)
  }

  // const getCall = async () => {
  //   let det_op = await getAgrupacion(causa.cuotas)
  //   dato.data.numero_operacion = det_op
  //   // console.log(det_op)
  // }
  // getCall()
  
  // let detalleOperacion = [{
  //   id_item: 0,
  //   desc_item: empresaNombre + id,
  //   monto_item: importe,
  //   cantidad_item: 1,
  // },
  // {
  //   id_item: 1,
  //   desc_item: empresaNombre + id,
  //   monto_item: importe,
  //   cantidad_item: 1,
  // }]

  // let dato = {
  //   data: {
  //     convenio: '',
  //     detalle_operacion: encodeURIComponent(JSON.stringify(detalleOperacion)),
  //     monto_operacion: sumatoria(monto_item),
  //     numero_operacion: 'det_op', de getAgrupacion
  //     error_url: 'http://192.168.10.82:4027/epagos/error',
  //     ok_url: 'http://192.168.10.82:4027/epagos/ok',
  //     id_moneda_operacion: 1,
  //     operacion: 'op_pago',
  //     version: '1.0',
  //     detalle_operacion_visible: 1
  //   }
  // }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Si, confirmo!
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        id="modal-convenio-container"
        size="lg"
      >
        <Modal.Header closeButton id="close-btn">
          <Modal.Title>
            <p className="main-title">
              PAGAR ON-LINE: Seleccione unconvenio de pago
            </p>
            <p className="main-title-price">Total a pagar: {Price}</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Tarjetas de convenio */}
          <div className="main-wrapper" >
            <div className="row align-items-center">

              {/* PAGO PRESENCIAL {#d0f500}*/}
              <a className="col py-5 text-decoration-none" id="cards-convenios" onClick={() => getConvenio('00023')}>
                <Button className="btn btn-light" id="button-convenio">
                    <FaMoneyBill className="modal-icons"/>
                  <br />
                  <hr />
                  <div className="modal-title">
                    Presencial
                  </div>
                  <hr />
                  <div className="modal-text">
                    Pago Facil
                    <br />
                    Rapipago
                    <br />
                    y mas...
                  </div>
                </Button>
              </a>

              {/* HOMEBANKING {#00de1b}*/}
              <a className="col py-5 text-decoration-none" id="cards-convenios" onClick={() => getConvenio('30023')} >
                <Button className="btn btn-light" id="button-convenio">
                  <FaLandmark className="modal-icons" />
                  <br />
                  <hr />
                  <div className="modal-title">
                    Homebanking
                  </div>
                  <hr />
                  <div className="modal-text">
                    Red Link
                    <br />
                    Pago Mis Cuentas
                    <br />
                    y mas...
                  </div>
                </Button>
              </a>

              {/* TARJETAS DE DEBITO {#00dbde} */}
              <a className="col py-5 text-decoration-none" id="cards-convenios" onClick={() => getConvenio('10023')} >
                <Button className="btn btn-light" id="button-convenio">
                    <FaCreditCard
                      className="modal-icons"
                    />
                  <br />
                  <hr />
                  <div className="modal-title">
                    Débito
                  </div>
                  <hr />
                  <div className="modal-text">
                    Visa
                    <br />
                    Maestro
                    <br />
                    y mas...
                  </div>
                </Button>
              </a>

              {/* TARJETAS DE CREDITO {#002cde} */}
              <a className="col py-5 text-decoration-none" id="cards-convenios" onClick={() => getConvenio('20023')}>
                <Button className="btn btn-light" id="button-convenio">
                    <FaCreditCard
                      className="modal-icons"
                    />
                  <hr />
                  <div className="modal-title">
                    Crédito
                  </div>
                  <hr />
                  <div className="modal-text">
                    Visa
                    <br />
                    American E.
                    <br />
                    y mas...
                  </div>
                </Button>
              </a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>

          <Button id="footer-btns" variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>

          <BotonEPago id="footer-btns"  />

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEpagos;
