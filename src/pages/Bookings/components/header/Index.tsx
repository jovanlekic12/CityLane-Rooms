import { useState } from "react";

import FilterSortHeader from "../../../../components/Filter&Sort";

type Props = {
  setCurrentPage: (number: number) => void;
};

export default function BookingsHeader({ setCurrentPage }: Props) {
  const [activeBtn, setActiveBtn] = useState<string>("all");

  const filters = [
    { label: "All", value: "all" },
    { label: "Checked out", value: "checked-out" },
    { label: "Checked in", value: "checked-in" },
    { label: "Unconfirmed", value: "unconfirmed" },
  ];

  const sorts = [
    { label: "Sort by date (earlier first)", value: "startDate-asc" },
    { label: "Sort by date (recent first)", value: "startDate-desc" },
    { label: "Sort by amount (low first)", value: "totalPrice-asc" },
    { label: "Sort by amount (high first)", value: "totalPrice-desc" },
  ];

  return (
    <FilterSortHeader
      filters={filters}
      sorts={sorts}
      heading="All bookings"
      filterName="status"
      sortName="sortBy"
      activeBtn={activeBtn}
      setActiveBtn={setActiveBtn}
      setCurrentPage={setCurrentPage}
    />
  );
}
