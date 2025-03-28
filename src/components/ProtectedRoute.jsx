import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
