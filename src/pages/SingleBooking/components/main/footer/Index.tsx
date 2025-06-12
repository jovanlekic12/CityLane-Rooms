import { useNavigate } from "react-router";
import Button from "../../../../../components/Button";
import { updateBookingStatus } from "../../../../../API/bookings";

type Props = {
  id: string;
  status: string;
  setIsModalOpened: (isOpened: boolean) => void;
};
export default function SingleBookingMainFooter({
  status,
  id,
  setIsModalOpened,
}: Props) {
  const navigate = useNavigate();
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
  );
}
