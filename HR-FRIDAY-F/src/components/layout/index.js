import React from "react";
import Header from "./header";
import SideBar from ".";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <SideBar />
    </>
  );
};

export default Layout;
