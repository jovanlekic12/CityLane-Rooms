import { useState } from "react";
import Button from "../../../../components/Button";
import { useNavigate, useSearchParams } from "react-router";
import FilterSortHeader from "../../../../components/Filter&Sort";

type Props = {
  setCurrentPage: (number: number) => void;
};

export default function BookingsHeader({ setCurrentPage }: Props) {
  const [activeBtn, setActiveBtn] = useState<string>("all");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleSortChange = (sort: string, name: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (sort) {
      newParams.set(name, sort);
    } else {
      newParams.delete(name);
    }
    navigate({ search: newParams.toString() });
  };
  const handleFilterChange = (filter: string, name: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (filter) {
      newParams.set(name, filter);
    } else {
      newParams.delete(name);
    }
    navigate({ search: newParams.toString() });
    setCurrentPage(1);
  };

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
      heading="All cabins"
      filterName="status"
      sortName="sortBy"
      activeBtn={activeBtn}
      setActiveBtn={setActiveBtn}
      setCurrentPage={setCurrentPage}
    />
  );
}
