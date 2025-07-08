import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { UserProps } from "../utils/types";
import { useState } from "react";

const Layout = ({ token }: UserProps) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  return (
    <div className="root">
      <Navbar
        token={token}
        setIsSidebarOpened={setIsSidebarOpened}
        isSidebarOpened={isSidebarOpened}
      ></Navbar>
      <Sidebar
        token={token}
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
      ></Sidebar>
      {isSidebarOpened && <div className="overlay"></div>}
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
