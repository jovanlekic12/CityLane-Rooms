import { Link } from "react-router";
import { Booking } from "../../../../utils/types";
import { IoReturnDownBack } from "react-icons/io5";
export default function SingleBookingHeader({ status, id }: Booking) {
  return (
    <div className="booking__header">
      <div className="booking__header__div">
        <h1 className="booking__header__name">Booking #{id}</h1>
        <div
          className={`booking__status booking__${status} singlebooking__status`}
        >
          {status}
        </div>
      </div>
      <Link to="/bookings" className="back__link">
        <IoReturnDownBack />
        Back
      </Link>
    </div>
  );
}
