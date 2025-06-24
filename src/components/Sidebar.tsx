import { IoHomeOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineCabin } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { LayoutProps } from "../utils/types";
import Button from "./Button";
import useIsSmallScreen from "../hooks/useIsSmallScreen";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
function Sidebar({ isSidebarOpened, setIsSidebarOpened }: LayoutProps) {
  function onClickOutside() {
    setIsSidebarOpened(false);
  }

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  const isSmallScreen = useIsSmallScreen();
  const pages = [
    {
      name: "home",
      svg: <IoHomeOutline />,
    },
    {
      name: "bookings",
      svg: <IoCalendarOutline />,
    },
    {
      name: "cabins",
      svg: <MdOutlineCabin />,
    },
    {
      name: "users",
      svg: <IoPeopleOutline />,
    },
    {
      name: "settings",
      svg: <IoSettingsOutline />,
    },
  ];

  const location = useLocation();

  return (
    <aside
      ref={ref}
      className={isSidebarOpened ? "sidebar__mobile sidebar" : "sidebar"}
    >
      <div className="logo__div">
        <img
          src="https://city-lane-rooms.vercel.app/assets/logo-N6oXZ67_.jpg"
          alt="logo image"
          className="logo"
        />
        <h4 className="logo__header">City Lane Rooms</h4>
      </div>
      <div className="sidebar__links">
        {pages.map((page) => {
          const isActive = location.pathname === `/${page.name}`;
          return (
            <Link
              key={page.name}
              to={page.name}
              className={`sidebar__link ${isActive ? "active__link" : ""}`}
            >
              {page.svg}
              <h5 className="link__name">{page.name}</h5>
            </Link>
          );
        })}
      </div>
      {isSmallScreen && (
        <Button type="sidebar" onClick={() => setIsSidebarOpened(false)}>
          <IoClose />
        </Button>
      )}
    </aside>
  );
}
export default Sidebar;
