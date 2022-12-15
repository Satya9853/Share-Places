import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(async (url, method = "GET", body = null, headers = {}) => {
    setIsLoading(true);

    const httpAbortController = new AbortController();
    activeHttpRequest.current.push(httpAbortController);

    try {
      const response = await fetch(url, { method, body, headers, signal: httpAbortController.signal });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);

      return responseData;
    } catch (error) {
      setError(error.message || "Something went wrong please try again");
    }
    setIsLoading(false);
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const cleanUpFunction = () => {
      activeHttpRequest.current.forEach((abortControl) => abortControl.abort());
    };
    return cleanUpFunction;
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
