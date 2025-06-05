import { useCallback, useState } from "react";
import { bookingsPerPage } from "../../../../utils/constants";
import { fetchBookings } from "../../../../API/bookings";
import { useFetchData } from "../../../../API/useFetchData";
import { useSearchParams } from "react-router";
import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import { Booking } from "../../../../utils/types";
import BookingListItem from "./BookingListItem/Index";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

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
  }, [params, firstBookingIndex, lastBookingIndex]);

  const { data, isLoading } = useFetchData<{
    data: Booking[];
    count: number | null;
  }>(getBookings);

  const bookings = data?.data ?? [];
  const totalCount = data?.count ?? 0;
  console.log(firstBookingIndex);
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
      <ul>
        {isLoading && <Loader />}
        {bookings.map((booking) => {
          return <BookingListItem {...booking} />;
        })}
      </ul>
      {totalCount > bookingsPerPage && (
        <div className="bookings__pagination">
          <p className="bookings__counter">
            Showing <span>{firstBookingIndex + 1}</span> to{" "}
            <span>{Math.min(lastBookingIndex + 1, totalCount)}</span> of{" "}
            <span>{totalCount}</span> results
          </p>

          <div className="pagination__buttons">
            <Button
              type="pagination"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <HiChevronLeft />
              Previous
            </Button>

            <Button
              type="pagination"
              disabled={lastBookingIndex + 1 >= totalCount}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
              <HiChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
