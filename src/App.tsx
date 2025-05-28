import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Cabins from "./pages/Cabins/Index";
import Settings from "./pages/Settings/Index";
import { useEffect, useState } from "react";
import LogInPage from "./pages/LogIn/Index";
import Users from "./pages/Users/Index";
import { Token } from "./utils/types";

function App() {
  const [token, setToken] = useState<Token | null>(null);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) {
      let data = JSON.parse(stored);
      setToken(data);
    }
  }, []);

  console.log(sessionStorage);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LogInPage setToken={setToken} />} />
        <Route path="/" element={<Layout token={token} />}>
          {token && <Route path="cabins" element={<Cabins />} />}
          {token && <Route path="settings" element={<Settings />} />}
          {token && <Route path="users" element={<Users />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
