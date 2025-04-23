import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { fetchCabins } from "./API/cabins";
import Cabins from "./pages/Cabins/Cabins";

function App() {
  fetchCabins();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="cabins" element={<Cabins />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
