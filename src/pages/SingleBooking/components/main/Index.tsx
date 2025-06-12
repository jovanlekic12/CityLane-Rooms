import { Booking } from "../../../../utils/types";
import { createPortal } from "react-dom";
import DeleteBookingModal from "../../../../components/DeleteBookingModal";
import { useState } from "react";
import SingleBookingMainHeader from "./header/Index";
import SingleBookingMainInfoSection from "./info section/Index";
import SingleBookingMainFooter from "./footer/Index";
export default function SingleBookingMain({
  numNights,
  startDate,
  endDate,
  cabins,
  status,
  guests,
  numGuests,
  observations,
  hasBreakfast,
  isPaid,
  totalPrice,
  cabinPrice,
  extrasPrice,
  id,
}: Booking) {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <div className="section__main">
      <SingleBookingMainHeader
        startDate={startDate}
        endDate={endDate}
        cabins={cabins}
        numNights={numNights}
        status={status}
      />
      <SingleBookingMainInfoSection
        numGuests={numGuests}
        guests={guests}
        observations={observations}
        startDate={startDate}
        hasBreakfast={hasBreakfast}
        isPaid={isPaid}
        totalPrice={totalPrice}
        cabinPrice={cabinPrice}
        extrasPrice={extrasPrice}
      />
      <SingleBookingMainFooter
        id={id}
        status={status}
        setIsModalOpened={setIsModalOpened}
      />
      {isModalOpened &&
        createPortal(
          <DeleteBookingModal
            setIsModalOpened={setIsModalOpened}
            bookingId={id}
          />,
          document.body
        )}
    </div>
  );
}
