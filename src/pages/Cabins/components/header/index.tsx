import { Dispatch, SetStateAction, useState } from "react";
import Button from "../../../../components/Button";
import { useNavigate, useSearchParams } from "react-router";
import FilterSortHeader from "../../../../components/Filter&Sort";

type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

function CabinsHeader({ setCurrentPage }: Props) {
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
    <FilterSortHeader
      filters={filters}
      sorts={sorts}
      heading="All cabins"
      filterName="discount"
      sortName="sortBy"
      activeBtn={activeBtn}
      setActiveBtn={setActiveBtn}
      setCurrentPage={setCurrentPage}
    />
  );
}

export default CabinsHeader;
