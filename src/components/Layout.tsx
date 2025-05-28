import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { User } from "@supabase/supabase-js";
import { UserProps } from "../utils/types";

const Layout = ({ user }: UserProps) => {
  return (
    <>
      <Navbar user={user}></Navbar>
      <Sidebar></Sidebar>
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
