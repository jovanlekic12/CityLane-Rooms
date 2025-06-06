import { useCallback } from "react";
import { useParams } from "react-router";
import { fetchSingleBooking } from "../../API/bookings";
import { useFetchData } from "../../API/useFetchData";
import SingleBookingHeader from "./components/header/Index";
import SingleBookingMain from "./components/main/Index";

export default function SingleBooking() {
  let params = useParams();

  const getBooking = useCallback(
    () => fetchSingleBooking(params.id),
    [params.id]
  );

  const { isLoading, data: booking } = useFetchData(getBooking);

  console.log(booking);

  return (
    <main className="main__container">
      {booking && (
        <section className="section">
          <SingleBookingHeader {...booking} />
          <SingleBookingMain {...booking} />
        </section>
      )}
    </main>
  );
}
