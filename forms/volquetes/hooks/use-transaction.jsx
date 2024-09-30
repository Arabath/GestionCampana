import { useQuery } from '@tanstack/react-query'
import { KEY_ETRANSACTION } from '../../../constants/query_keys'
import { getETransaction } from '../api/get-transaction'

export const useETransaction = (transactionId) => {
  return useQuery({
    queryKey: [KEY_ETRANSACTION, transactionId], 
    queryFn: async () => await getETransaction(transactionId), 
    enabled: !!transactionId,
  })
}

