import { useContext } from "react"
import { AdminAuthContext } from '../context/auth/AdminAuthProvider'

const useAuth = () => {
  return useContext(AdminAuthContext)
}

export default useAuth