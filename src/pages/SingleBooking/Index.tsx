import { useCallback } from "react";
import { useParams } from "react-router";
import { fetchSingleBooking } from "../../API/bookings";
import { useFetchData } from "../../API/useFetchData";
import SingleBookingHeader from "./components/header/Index";
import SingleBookingMain from "./components/main/Index";
import { Slide, ToastContainer } from "react-toastify";
import Loader from "../../components/Loader";

export default function SingleBooking() {
  let params = useParams();

  const getBooking = useCallback(
    () => fetchSingleBooking(params.id),
    [params.id]
  );

  const { isLoading, data: booking } = useFetchData(getBooking);

  return (
    <main className="main__container">
      {isLoading && <Loader />}
      {booking && (
        <section className="section">
          <SingleBookingHeader {...booking} />
          <SingleBookingMain {...booking} />
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
      )}
    </main>
  );
}
