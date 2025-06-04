import Button from "../../../../../components/Button";
import { formatDateShort, timeDifference } from "../../../../../utils/helpers";
import { Booking } from "../../../../../utils/types";

export default function BookingListItem({
  id,
  cabins,
  guests,
  status,
  startDate,
  numNights,
  endDate,
  totalPrice,
}: Booking) {
  return (
    <li className="booking__list__item" key={id}>
      <div className="booking__cabin">{cabins.name}</div>
      <div className="booking__guest__div">
        <span>{guests.fullName}</span>
        <span>{guests.email}</span>
      </div>
      <div className="booking__guest__div">
        <span>
          {" "}
          {status === "Checked out" ? "Over" : "In"} {timeDifference(startDate)}{" "}
          → {""}
          {numNights} night stay
        </span>
        <span>
          {formatDateShort(startDate)} - {formatDateShort(endDate)}
        </span>
      </div>
      <div className={`booking__status booking__${status}`}>{status}</div>
      <div className="booking__totalprice">
        {totalPrice.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
        $
      </div>
      <Button type="options">⋮</Button>
    </li>
  );
}
