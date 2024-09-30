import { Button } from '@mui/material'
import payAction from '../../../../services/epagos'

export default function BotonEPago({ data }) {

  const handleClick = () => {
    payAction(data)
  }
  return <Button variant='contained' onClick={handleClick}>Pagar</Button>
}