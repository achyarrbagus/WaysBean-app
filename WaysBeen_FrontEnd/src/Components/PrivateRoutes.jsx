import { ContextGlobal } from "../context/Context";
import { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./../context/UserContext";

function PrivateRoute() {
  const { kumpulanState } = useContext(ContextGlobal);
  const [state] = useContext(UserContext);
  const { adminlogin, setAdminLogin } = kumpulanState;

  const isSignIn = state.user.role;

  return isSignIn === "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
