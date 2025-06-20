import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { UserProps } from "../utils/types";

const Layout = ({ token }: UserProps) => {
  return (
    <div className="root">
      <Navbar token={token}></Navbar>
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
