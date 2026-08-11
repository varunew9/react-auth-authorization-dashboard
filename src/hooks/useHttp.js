import { useCallback, useState } from "react";
import { getApiErrorMessage } from "../services/apiError";

function useHttp(requestFunction) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError("");

      try {
        const responseData = await requestFunction(...args);

        setData(responseData);

        return responseData;
      } catch (error) {
        const errorMessage = getApiErrorMessage(error);

        setError(errorMessage);

        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [requestFunction]
  );

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}

export default useHttp;
