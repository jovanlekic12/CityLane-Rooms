import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Cabins from "./pages/Cabins/Index";
import Settings from "./pages/Settings/Index";
import { useEffect, useState } from "react";
import LogInPage from "./pages/LogIn/Index";
import Users from "./pages/Users/Index";
import { Token } from "./utils/types";
import Bookings from "./pages/Bookings/Index";
import { createBookings } from "./API/bookings";
import SingleBooking from "./pages/SingleBooking/Index";
import Home from "./pages/Home/Index";
import Account from "./pages/Account/Index";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LogInPage setToken={setToken} />} />
        <Route path="/" element={<Layout token={token} />}>
          {token && <Route path="home" element={<Home />} />}
          {token && <Route path="cabins" element={<Cabins />} />}
          {token && <Route path="settings" element={<Settings />} />}
          {token && <Route path="users" element={<Users />} />}
          {token && <Route path="bookings" element={<Bookings />} />}
          {token && <Route path="booking/:id" element={<SingleBooking />} />}
          {token && (
            <Route path="account" element={<Account token={token} />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
