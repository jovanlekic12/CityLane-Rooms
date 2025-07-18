import { useNavigate } from "react-router";
import { logInUser } from "../../../API/demoLogin";
import { userEmail, userPassword } from "../../../utils/constants";
import Button from "../../../components/Button";
import { LogInFormProps } from "../../../utils/types";
import { useState } from "react";

export default function LogInForm({ setToken }: LogInFormProps) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    try {
      const { data, error } = await logInUser({ userEmail, userPassword });
      if (error) {
        console.error("Login failed:", error.message);
      } else {
        setToken(data);
        navigate("home");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <div className="login__div">
        <label className="login__label">Email address</label>
        <input
          type="text"
          defaultValue={userEmail}
          readOnly
          className="readonly"
        />
      </div>
      <div className="login__div">
        <label className="login__label">Password</label>
        <input type="password" defaultValue={userPassword} readOnly />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Loging in..." : "Log in DEMO"}
      </Button>
    </form>
  );
}
