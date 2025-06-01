import { useState } from "react";
import Button from "../../../../components/Button";
import { useNavigate, useSearchParams } from "react-router";

export default function BookingsHeader() {
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
    <div className="section__header">
      <h1 className="section__heading">All bookings</h1>
      <div className="section__header__right">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            type="filter"
            isActive={activeBtn === filter.value}
            onClick={() => {
              handleFilterChange(filter.value, "status");
              setActiveBtn(filter.value);
            }}
          >
            {filter.label}
          </Button>
        ))}
        <select
          className="section__header__sort"
          onChange={(e) => handleSortChange(e.target.value, "sortBy")}
        >
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>
              {sort.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
