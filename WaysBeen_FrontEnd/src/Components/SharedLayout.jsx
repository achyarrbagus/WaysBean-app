import React from "react";
import MyNavbar from "./myNavbar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
};

export default SharedLayout;
