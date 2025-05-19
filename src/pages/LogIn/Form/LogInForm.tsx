import { useNavigate } from "react-router";
import { logInUser } from "../../../API/demoLogin";
import { userEmail, userPassword } from "../../../utils/constants";
import Button from "../../../components/Button";
import { LogInFormProps } from "../../../utils/types";

export default function LogInForm({ setToken }: LogInFormProps) {
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
  );
}
