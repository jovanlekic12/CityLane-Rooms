import Button from "./Button";
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { UserProps } from "../utils/types";
function Navbar({ user }: UserProps) {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  console.log(user);

  return (
    <header className="header">
      {user && (
        <div className="header__user__div">
          <img
            src={`https://ufcfeqrveeyzpruffbba.supabase.co/storage/v1/object/public/user-photos//${user.id}.jpg`}
            alt="user avatar"
            className="header__user__img"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://ufcfeqrveeyzpruffbba.supabase.co/storage/v1/object/public/user-photos//default-avatar.jpg";
            }}
          />
          <span className="header__span">User</span>
        </div>
      )}
      <div className="header__options__div">
        <Button type="ghost">
          <CiUser className="navbar__svg" />
        </Button>
        <Button type="ghost" onClick={handleLogout}>
          <CiLogout className="navbar__svg" />
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
