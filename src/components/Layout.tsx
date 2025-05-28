import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { UserProps } from "../utils/types";

const Layout = ({ token }: UserProps) => {
  return (
    <>
      <Navbar token={token}></Navbar>
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
