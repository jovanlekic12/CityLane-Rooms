import { useCallback, useState } from "react";
import { bookingsPerPage } from "../../../../utils/constants";
import { fetchBookings } from "../../../../API/bookings";
import { useFetchData } from "../../../../API/useFetchData";

export default function BookingsMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastBookingIndex = currentPage * bookingsPerPage;
  const firstBookingIndex = lastBookingIndex - bookingsPerPage;
  const getBookings = useCallback(() => {
    return fetchBookings(firstBookingIndex, lastBookingIndex);
  }, [firstBookingIndex, lastBookingIndex]);

  const { data: bookings } = useFetchData(getBookings);

  const infos = ["Cabin", "Guest", "Dates", "Status", ""];
  return (
    <div className="section__main">
      <header className="section__main__header">
        {infos.map((info) => {
          return (
            <div key={info} className="info__div">
              {info}
            </div>
          );
        })}
      </header>
      <ul>
        {bookings.map((booking) => {
          return (
            <li className="booking__list__item" key={booking.id}>
              <div className="booking__cabin">{booking.cabinId}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
