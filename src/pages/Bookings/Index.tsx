import { useState } from "react";
import BookingsMain from "./components/BookingsMain/Index";
import BookingsHeader from "./components/header/Index";
import { Slide, ToastContainer } from "react-toastify";

export default function Bookings() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="main__container">
      <section className="section">
        <BookingsHeader setCurrentPage={setCurrentPage} />
        <BookingsMain
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ToastContainer
          toastClassName="custom-toast"
          position="top-center"
          progressClassName="custom-progress"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          transition={Slide}
        />
      </section>
    </main>
  );
}
