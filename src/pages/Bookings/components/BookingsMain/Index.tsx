import { useCallback } from "react";
import { bookingsPerPage } from "../../../../utils/constants";
import { fetchBookings } from "../../../../API/bookings";
import { useFetchData } from "../../../../API/useFetchData";
import { useSearchParams } from "react-router";
import Loader from "../../../../components/Loader";
import { Booking } from "../../../../utils/types";
import BookingListItem from "./BookingListItem/Index";
import Pagination from "../../../../components/Pagination";

type Props = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function BookingsMain({ setCurrentPage, currentPage }: Props) {
  const lastBookingIndex = currentPage * bookingsPerPage;
  const firstBookingIndex = lastBookingIndex - bookingsPerPage;
  const [params] = useSearchParams();

  const getBookings = useCallback(() => {
    return fetchBookings(params, firstBookingIndex, lastBookingIndex);
  }, [params, currentPage]);

  const { data, isLoading } = useFetchData<{
    data: Booking[];
    count: number | null;
  }>(getBookings);

  const bookings = data?.data ?? [];
  const totalCount = data?.count ?? 0;
  const infos = ["Cabin", "Guest", "Dates", "Status", "Amount", ""];

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
      <ul className="bookings__list">
        {isLoading && <Loader />}
        {bookings.map((booking) => {
          return <BookingListItem {...booking} />;
        })}
      </ul>
      {totalCount > bookingsPerPage && (
        <Pagination
          firstIndex={firstBookingIndex}
          lastIndex={lastBookingIndex}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}
