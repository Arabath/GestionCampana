import { EPAGOS_TRANSACTION } from '../../../constants/endpoints'
import { handler } from '../../../utils/error-handler'

export const getETransaction = async(transactionId) => {
  const url = `${EPAGOS_TRANSACTION}/${transactionId}`; 
  const response = await fetch(url);
  return handler(response);
}
