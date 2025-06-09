import {
  formatDateShort,
  formatDateWithTime,
  timeDifference,
} from "../../../../utils/helpers";
import { Booking } from "../../../../utils/types";
import { MdOutlineCabin } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Button from "../../../../components/Button";
import { useNavigate } from "react-router";
import { updateBookingStatus } from "../../../../API/bookings";
import { createPortal } from "react-dom";
import DeleteBookingModal from "../../../../components/DeleteBookingModal";
import { useState } from "react";
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
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);
  function handleCheck() {
    if (status === "Checked in") {
      updateBookingStatus(id, "Checked out");
      return;
    } else {
      updateBookingStatus(id, "Checked in");
      return;
    }
  }

  return (
    <div className="section__main">
      <header className="singlebooking__main__header">
        <div className="number__nights__div">
          <MdOutlineCabin className="cabin__icon" />
          <p>
            {numNights} nights in Cabin {cabins.name}
          </p>
        </div>
        <p>
          {formatDateShort(startDate)}
          {status === "Checked out" ? " (Over " : " (In "}
          {`${timeDifference(startDate)})`} - {formatDateShort(endDate)}
        </p>
      </header>
      <section className="singlebooking__info__section">
        <div className="singlebooking__guest__div">
          <img
            src={guests.countryFlag}
            alt=""
            className="single__booking__flag"
          />
          <p className="singlebooking__guest__name">
            {guests.fullName}
            {numGuests > 1 &&
              ` + ${
                numGuests === 2
                  ? `${numGuests - 1} guest`
                  : `${numGuests - 1} guests`
              }`}
          </p>
          <span>•</span>
          <p>{guests.email}</p>
          <span>•</span>
          <p>National ID {guests.nationalID}</p>
        </div>
        {observations && (
          <div className="singlebooking__guest__div">
            <div>
              <MdOutlineChat />
              <p className="singlebooking__guest__name">Observations</p>
            </div>
            <span>{observations}</span>
          </div>
        )}
        <div className="singlebooking__guest__div">
          <div>
            <MdCheckCircleOutline />
            <p className="singlebooking__guest__name">Breakfast included?</p>
          </div>
          <span>{hasBreakfast ? "Yes" : "No"}</span>
        </div>
        <div className={isPaid ? "paid__div" : "notpaid__div"}>
          <div className="total__price__div">
            <span className="total__price__span">
              <AiOutlineDollarCircle />
              <span>Total price</span>
            </span>
            <span className="price__span">
              {totalPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              ${" "}
              {hasBreakfast &&
                `(${cabinPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}$ cabin + ${extrasPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}$ breakfast)`}
            </span>
          </div>
          <p className="paid__p">{isPaid ? "Paid" : "Will pay at property"}</p>
        </div>
        <p className="booked__p">Booked {formatDateWithTime(startDate)}</p>
      </section>
      <footer className="singlebooking__footer">
        {status !== "Checked out" && (
          <Button type="submit" onClick={handleCheck}>
            {status === "Unconfirmed" ? "Check in" : "Check out"}
          </Button>
        )}
        <Button type="delete" onClick={() => setIsModalOpened(true)}>
          Delete booking
        </Button>
        <Button type="back" onClick={() => navigate("/bookings")}>
          Back
        </Button>
      </footer>
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
