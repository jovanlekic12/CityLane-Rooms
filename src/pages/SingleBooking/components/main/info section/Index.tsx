import { MdCheckCircleOutline, MdOutlineChat } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { formatDateWithTime } from "../../../../../utils/helpers";

type Props = {
  startDate: string;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  numGuests: number;
  guests: {
    email: string;
    fullName: string;
    nationalID?: string;
    countryFlag?: string;
  };
  totalPrice: number;
  cabinPrice: number;
  extrasPrice: number;
};

export default function SingleBookingMainInfoSection({
  guests,
  numGuests,
  observations,
  hasBreakfast,
  isPaid,
  cabinPrice,
  extrasPrice,
  startDate,
  totalPrice,
}: Props) {
  return (
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
  );
}
