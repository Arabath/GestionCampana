import { DATA_RESET } from "../../../constants/endpoints";
import { handler } from "../../../utils/error-handler";

export const postsResetPass = async (formData) => {
  const response = await fetch(DATA_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return handler(response);
};


