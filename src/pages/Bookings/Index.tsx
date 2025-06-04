import { useState } from "react";
import BookingsMain from "./components/BookingsMain/Index";
import BookingsHeader from "./components/header/Index";

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
      </section>
    </main>
  );
}
