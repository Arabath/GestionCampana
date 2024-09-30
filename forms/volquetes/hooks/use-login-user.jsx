import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsUserLogin } from "../api/post-login";
import { KEY_LOGIN } from "../../../constants/query_keys";

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => postsUserLogin(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_LOGIN] });
    },
  });
};
