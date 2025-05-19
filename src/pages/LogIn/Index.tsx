import LogInForm from "./Form/LogInForm";
import { LogInFormProps } from "../../utils/types";

function LogInPage({ setToken }: LogInFormProps) {
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
      <LogInForm setToken={setToken} />
    </main>
  );
}

export default LogInPage;
