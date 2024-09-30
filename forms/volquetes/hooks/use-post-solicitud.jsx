import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY_SOLICITUD } from "../../../constants/query_keys";
import { postsSolicitudVolquete } from "../api/post-solicitud";

export const usePostSolicitud = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => postsSolicitudVolquete(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_SOLICITUD] });
    },
  });
};
