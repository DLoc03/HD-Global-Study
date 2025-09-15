import { useState, useCallback } from "react";
import axios from "axios";

export const api = axios.create({
  baseURL: "/server",
});

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api(config);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback(
    (url, config = {}) => request({ method: "GET", url, ...config }),
    [request],
  );
  const post = useCallback(
    (url, data = {}, config = {}) =>
      request({ method: "POST", url, data, ...config }),
    [request],
  );
  const put = useCallback(
    (url, data = {}, config = {}) =>
      request({ method: "PUT", url, data, ...config }),
    [request],
  );
  const del = useCallback(
    (url, config = {}) => request({ method: "DELETE", url, ...config }),
    [request],
  );

  return { get, post, put, del, loading, error };
}
