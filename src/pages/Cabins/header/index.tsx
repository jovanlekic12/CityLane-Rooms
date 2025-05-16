import { useState } from "react";
import Button from "../../../components/Button";

type HeaderProps = {
  handleFilterChange: (filter: string) => void;
  handleSortChange: (sort: string) => void;
};

function CabinsHeader({ handleFilterChange, handleSortChange }: HeaderProps) {
  const [activeBtn, setActiveBtn] = useState<string>("all");

  const filters = [
    { label: "All", value: "all" },
    { label: "No discount", value: "no-discount" },
    { label: "With discount", value: "discount" },
  ];

  const sorts = [
    { label: "Sort by name (A-Z)", value: "name-asc" },
    { label: "Sort by name (Z-A)", value: "name-desc" },
    { label: "Sort by price (low first)", value: "price-asc" },
    { label: "Sort by price (high first)", value: "price-desc" },
    { label: "Sort by capacity (low first)", value: "capacity-asc" },
    { label: "Sort by capacity (high first)", value: "capacity-desc" },
  ];

  return (
    <div className="section__header">
      <h1 className="section__heading">All cabins</h1>
      <div className="section__header__right">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            type="filter"
            isActive={activeBtn === filter.value}
            onClick={() => {
              handleFilterChange(filter.value);
              setActiveBtn(filter.value);
            }}
          >
            {filter.label}
          </Button>
        ))}

        <select
          className="section__header__sort"
          value={sorts[0].value}
          onChange={(e) => handleSortChange(e.target.value)}
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

export default CabinsHeader;
