import { useState, useCallback } from "react";
import { useApi } from "../configs/api";

export function useEmail() {
  const { post, loading: apiLoading } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const sendEmail = useCallback(
    async (data) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const res = await post("/mail/send", data);

        if (res.success) {
          setSuccess(res.message || "Gửi email thành công!");
          return { success: true, message: res.message };
        } else {
          setError(res.message || "Gửi email thất bại!");
          return { success: false, message: res.message };
        }
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra!");
        return { success: false, message: err.message };
      } finally {
        setLoading(false);
      }
    },
    [post],
  );

  return { sendEmail, loading: loading || apiLoading, error, success };
}
