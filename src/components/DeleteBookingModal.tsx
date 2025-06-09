import { useState } from "react";
import { deleteSingleBooking } from "../API/bookings";
import Button from "./Button";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";

type ModalProps = {
  setIsModalOpened: (isModalOpened: boolean) => void;
  bookingId: string;
};

export default function DeleteBookingModal({
  setIsModalOpened,
  bookingId,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function handleDeleteBooking() {
    setIsLoading(true);
    try {
      await deleteSingleBooking(bookingId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigate("/bookings");
    }
  }

  return (
    <div className="deletebooking__overlay">
      <div className="deletebooking__modal">
        <h6>Delete booking</h6>
        <p>
          Are you sure you want to delete this booking permanently? This action
          cannot be undone.
        </p>
        <div className="modal__btns">
          <Button type="cancel" onClick={() => setIsModalOpened(false)}>
            Cancel
          </Button>
          <Button
            type="delete"
            onClick={handleDeleteBooking}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
        <RxCross2
          className="cross__icon"
          onClick={() => setIsModalOpened(false)}
        />
      </div>
    </div>
  );
}
