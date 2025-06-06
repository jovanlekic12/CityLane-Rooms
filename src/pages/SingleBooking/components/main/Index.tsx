import { formatDateShort, timeDifference } from "../../../../utils/helpers";
import { Booking } from "../../../../utils/types";
import { MdOutlineCabin } from "react-icons/md";

export default function SingleBookingMain({
  numNights,
  startDate,
  endDate,
  cabins,
  status,
  guests,
  numGuests,
}: Booking) {
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
      </section>
    </div>
  );
}
