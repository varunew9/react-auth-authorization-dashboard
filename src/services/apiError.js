import axios from "axios";

export function getApiErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        error.message.data?.message || "Something went wrong with the request"
      );
    }

    if (error.request) {
      return "Unable to connect to the server.";
    }

    return error.message;
  }
  return "An unexpected error occurred.";
}
