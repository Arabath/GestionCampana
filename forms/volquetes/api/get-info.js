import { DATA_GET } from '../../../constants/endpoints'
import { handler } from '../../../utils/error-handler'

export const getData = async()  => {
  const response = await fetch(DATA_GET)
  return handler(response)
}
