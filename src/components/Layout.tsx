import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
