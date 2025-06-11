import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import Button from "./Button";

type PaginationProps = {
  firstIndex: number;
  lastIndex: number;
  totalCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function Pagination({
  firstIndex,
  lastIndex,
  totalCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div className="bookings__pagination">
      <p className="bookings__counter">
        Showing <span>{firstIndex + 1}</span> to{" "}
        <span>{Math.min(lastIndex + 1, totalCount)}</span> of{" "}
        <span>{totalCount}</span> results
      </p>
      <div className="pagination__buttons">
        <Button
          type="pagination"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <HiChevronLeft />
          Previous
        </Button>

        <Button
          type="pagination"
          disabled={lastIndex + 1 >= totalCount}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
          <HiChevronRight />
        </Button>
      </div>
    </div>
  );
}
