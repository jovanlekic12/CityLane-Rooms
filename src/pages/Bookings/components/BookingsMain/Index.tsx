import { useCallback, useState } from "react";
import { bookingsPerPage } from "../../../../utils/constants";
import { fetchBookings } from "../../../../API/bookings";
import { useFetchData } from "../../../../API/useFetchData";
import { useSearchParams } from "react-router";
import { formatDateShort, timeDifference } from "../../../../utils/helpers";
import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";

export default function BookingsMain() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastBookingIndex = currentPage * bookingsPerPage;
  const firstBookingIndex = lastBookingIndex - bookingsPerPage;
  const [params] = useSearchParams();

  const getBookings = useCallback(() => {
    return fetchBookings(params, firstBookingIndex, lastBookingIndex);
  }, [params, firstBookingIndex, lastBookingIndex]);

  const { data: bookings, isLoading } = useFetchData(getBookings);
  console.log(bookings);

  const infos = ["Cabin", "Guest", "Dates", "Status", "Amount", ""];
  const options = [
    {
      text: "See details",
    },
    {
      text: "Check in",
    },
    {
      text: "Delete booking",
    },
  ];
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
        {isLoading && <Loader />}
        {bookings.map((booking) => {
          return (
            <li className="booking__list__item" key={booking.id}>
              <div className="booking__cabin">{booking.cabins.name}</div>
              <div className="booking__guest__div">
                <span>{booking.guests.fullName}</span>
                <span>{booking.guests.email}</span>
              </div>
              <div className="booking__guest__div">
                <span>
                  {" "}
                  {booking.status === "Checked out" ? "Over" : "In"}{" "}
                  {timeDifference(booking.startDate)} → {""}
                  {booking.numNights} night stay
                </span>
                <span>
                  {formatDateShort(booking.startDate)} -{" "}
                  {formatDateShort(booking.endDate)}
                </span>
              </div>
              <div className={`booking__status booking__${booking.status}`}>
                {booking.status}
              </div>
              <div className="booking__totalprice">
                {booking.totalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                $
              </div>
              <Button type="options">0</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
