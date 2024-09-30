import { DATA_CHANGE } from "../../../constants/endpoints";
import { handler } from "../../../utils/error-handler";

export const postsChangePass = async (formData) => {
  const response = await fetch(DATA_CHANGE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return handler(response);
};
