import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import { fetchCabins } from "./API/cabins";

function App() {
  fetchCabins();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
