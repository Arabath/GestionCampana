import { useQuery } from '@tanstack/react-query'
import { getData } from '../api/get-info'
import { KEY_GET } from '../../../constants/query_keys'

export const useInfo = () => {
  return useQuery({
    queryKey: [KEY_GET],
    queryFn: async () => await getData(),
  })
}
