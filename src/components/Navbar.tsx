import Button from "./Button";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { LayoutProps } from "../utils/types";
import useIsSmallScreen from "../hooks/useIsSmallScreen";
import { FaBars } from "react-icons/fa";
function Navbar({ token, setIsSidebarOpened }: LayoutProps) {
  const navigate = useNavigate();
  const isSmallScreen = useIsSmallScreen();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="header">
      {isSmallScreen && (
        <Button type="options" onClick={() => setIsSidebarOpened(true)}>
          <FaBars />
        </Button>
      )}
      <div className="header__div">
        {token?.user && (
          <div className="header__user__div">
            <img
              src={`https://ufcfeqrveeyzpruffbba.supabase.co/storage/v1/object/public/user-photos//${token.user.id}.jpg`}
              alt="user avatar"
              className="header__user__img"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://ufcfeqrveeyzpruffbba.supabase.co/storage/v1/object/public/user-photos//default-avatar.jpg";
              }}
            />
            <span className="header__span">
              {token.user.user_metadata.FullName}
            </span>
          </div>
        )}
        <div className="header__options__div">
          <Button type="ghost">
            <CiUser
              className="navbar__svg"
              onClick={() => navigate("account")}
            />
          </Button>
          <Button type="ghost" onClick={handleLogout}>
            <CiLogout className="navbar__svg" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
