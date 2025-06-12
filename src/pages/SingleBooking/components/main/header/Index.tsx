import { MdOutlineCabin } from "react-icons/md";
import { formatDateShort, timeDifference } from "../../../../../utils/helpers";

type Props = {
  numNights: number;
  cabins: { name: string };
  startDate: string;
  status: string;
  endDate: string;
};

export default function SingleBookingMainHeader({
  numNights,
  cabins,
  startDate,
  status,
  endDate,
}: Props) {
  return (
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
  );
}
