import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY_CHANGE_PASS } from "../../../constants/query_keys";
import { postsChangePass } from "../api/post-change-password";

export const useChangePass = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => postsChangePass(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_CHANGE_PASS] });
    },
  });
};
