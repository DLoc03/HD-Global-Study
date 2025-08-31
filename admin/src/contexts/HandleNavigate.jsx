import { useNavigate } from "react-router-dom";

export function useCommonNavigate() {
  const navigate = useNavigate();

  const handleNavigate = (path, options = {}) => {
    if (!path) return;
    navigate(path, options);
  };

  return handleNavigate;
}
