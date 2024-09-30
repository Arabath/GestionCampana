import { useQuery } from "@tanstack/react-query";
import useAuth from "../../admin/hooks/useAuth";

function useMyQuery() {
  const query = useQuery(...arguments);
  const { logout } = useAuth();

  // eslint-disable-next-line
  if (query.error || query.error?.message == 401) {
    logout();
  }

  return query;
}

export default useMyQuery;
