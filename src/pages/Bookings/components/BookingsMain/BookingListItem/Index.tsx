import { useState } from "react";
import Button from "../../../../../components/Button";
import { formatDateShort, timeDifference } from "../../../../../utils/helpers";
import { Booking } from "../../../../../utils/types";
import { BookingDialog } from "../../../../../components/BookingDialog";
import { IoMdEye } from "react-icons/io";
import { BiUpload } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";

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
  const [showDialog, setShowDialog] = useState(false);

  const checkedInOptions = [
    {
      text: "See details",
      svg: <IoMdEye />,
    },
    {
      text: status === "Unconfirmed" ? "Check in" : "Check out",
      svg: <BiUpload />,
    },
    {
      text: "Delete booking",
      svg: <TiDelete />,
    },
  ];

  const checkedOutOptions = [
    {
      text: "See details",
      svg: <IoMdEye />,
    },
    {
      text: "Delete booking",
      svg: <TiDelete />,
    },
  ];

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
      <div className="options-btn-div">
        <Button
          type="options"
          onClick={() => {
            setShowDialog(true);
          }}
        >
          ⋮
        </Button>
        {showDialog && (
          <BookingDialog
            onClickOutside={() => setShowDialog(false)}
            options={
              status === "Checked out" ? checkedOutOptions : checkedInOptions
            }
            id={id}
          />
        )}
      </div>
    </li>
  );
}
