import Button from "../../../../components/Button";
import { Booking } from "../../../../utils/types";

export default function SingleBookingHeader({ status, id }: Booking) {
  return (
    <div className="booking__header">
      <div className="booking__header__div">
        <h1 className="booking__header__name">Booking #{id}</h1>
        <div className={`booking__status booking__${status}`}>{status}</div>
      </div>
      <Button type="standard">Back</Button>
    </div>
  );
}
