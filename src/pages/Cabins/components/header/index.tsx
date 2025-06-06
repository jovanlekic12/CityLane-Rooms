import { useState } from "react";
import Button from "../../../../components/Button";
import { useNavigate, useSearchParams } from "react-router";

function CabinsHeader() {
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
              handleFilterChange(filter.value, "discount");
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

export default CabinsHeader;
