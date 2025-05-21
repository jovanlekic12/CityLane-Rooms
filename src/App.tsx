import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Cabins from "./pages/Cabins/Index";
import Settings from "./pages/Settings/Index";
import { useEffect, useState } from "react";
import LogInPage from "./pages/LogIn/Index";
import Users from "./pages/Users/Index";

function App() {
  const [token, setToken] = useState<string | null>(null);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored) {
      setToken(JSON.parse(stored));
    }
  }, []);

  console.log(token);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LogInPage setToken={setToken} />} />
        <Route path="/" element={<Layout />}>
          {token && <Route path="cabins" element={<Cabins />} />}
          {token && <Route path="settings" element={<Settings />} />}
          {token && <Route path="users" element={<Users />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
