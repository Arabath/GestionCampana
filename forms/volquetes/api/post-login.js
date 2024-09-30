import { DATA_LOGIN } from "../../../constants/endpoints";
import { handler } from "../../../utils/error-handler";

export const postsUserLogin = async (formData) => {
  const response = await fetch(DATA_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return handler(response);
};


// Este es para el reseteo del password