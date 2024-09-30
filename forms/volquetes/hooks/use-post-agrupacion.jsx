import { useMutation, useQueryClient } from "@tanstack/react-query";
import getAgrupacion from "../api/apiAgrupacion";
import { KEY_AGRUPACION } from "../../../constants/query_keys";

export const usePostAgrupacion = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => getAgrupacion(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_AGRUPACION] });
    },
  });
};
