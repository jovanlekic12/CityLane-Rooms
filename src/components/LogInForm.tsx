import { useNavigate } from "react-router";
import { logInUser } from "../API/demoLogin";
import Button from "./Button";
import { Dispatch, SetStateAction } from "react";

type LogInFormProps = {
  setToken: Dispatch<SetStateAction<string | null>>;
};

export default function LogInForm({ setToken }: LogInFormProps) {
  const userEmail = "demo@example.com";
  const userPassword = "demo12345";

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { data, error } = await logInUser({ userEmail, userPassword });
    if (error) {
      console.error("Login failed:", error.message);
    } else {
      setToken(data.session?.access_token ?? null);
      navigate("/cabins");
    }
  }

  return (
    <main className="login__container">
      <div className="logo__div">
        <img
          src="https://city-lane-rooms.vercel.app/assets/logo-N6oXZ67_.jpg"
          alt="logo image"
          className="logo"
        />
        <h4 className="logo__header">City Lane Rooms</h4>
      </div>
      <h1 className="login__header">Log in as a demo user</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__div">
          <label className="login__label">Email address</label>
          <input type="text" defaultValue={userEmail} readOnly />
        </div>
        <div className="login__div">
          <label className="login__label">Password</label>
          <input type="password" defaultValue={userPassword} readOnly />
        </div>
        <Button type="submit">Log In DEMO</Button>
      </form>
    </main>
  );
}
