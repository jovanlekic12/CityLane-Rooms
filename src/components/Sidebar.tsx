import { IoHomeOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineCabin } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router";
function Sidebar() {
  const pages = [
    {
      name: "Home",
      svg: <IoHomeOutline />,
    },
    {
      name: "Bookings",
      svg: <IoCalendarOutline />,
    },
    {
      name: "Cabins",
      svg: <MdOutlineCabin />,
    },
    {
      name: "Users",
      svg: <IoPeopleOutline />,
    },
    {
      name: "Settings",
      svg: <IoSettingsOutline />,
    },
  ];

  return (
    <aside className="sidebar">
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
          return (
            <Link to={page.name} className="sidebar__link">
              {page.svg}
              <h5 className="link__name">{page.name}</h5>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
export default Sidebar;
