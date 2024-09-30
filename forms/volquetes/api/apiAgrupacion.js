import { DATA_AGRUPACION } from '../../../constants/endpoints';
import { handler } from "../../../utils/error-handler";

const getAgrupacion = async (detalleAgrupacion) => {
    console.log('detalleAgrupacion: ', detalleAgrupacion)
    const response = await fetch(DATA_AGRUPACION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detalleAgrupacion),
    });
    return handler(response);
};

export default getAgrupacion;
