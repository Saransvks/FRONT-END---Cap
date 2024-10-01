import React, { useContext } from "react";
import { mycontext } from "../App";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdminPrivateRoute = () => {
  const token = localStorage.getItem("Token");
  const [user, setUser] = useContext(mycontext);
  return (
    <>
      {/* to provide access only to admin */}
      {token && user.isAdmin ? <Outlet /> : <Navigate to="/login" />}
    </>
  );
};

export default OnlyAdminPrivateRoute;