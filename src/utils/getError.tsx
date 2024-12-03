import { AxiosError } from "axios";

export default function getError(error: unknown) {
  let errorMessage: string = "Unknown Error Occured";

  if (error instanceof AxiosError) {
    if (error.response) {
      errorMessage = `${error.response?.data.error} - ${error.response?.data.message}`;
    } else {
      errorMessage = error.message;
    }
  }

  return errorMessage;
}
