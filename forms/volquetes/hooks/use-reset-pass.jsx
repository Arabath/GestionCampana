import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEY_RESET_PASS } from "../../../constants/query_keys";
import { postsResetPass } from "../api/post-reset-pass";

export const useResetPass = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => postsResetPass(data), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_RESET_PASS] });
    },
  });
};
