//ProtectedRoutes.jsx
//ProtectedRoutes.jsx
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const trainer = useSelector((reducer) => reducer.trainer);

  if (trainer && trainer.length >= 3) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
