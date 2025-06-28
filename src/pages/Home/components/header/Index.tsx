import React from "react";
import FilterSortHeader from "../../../../components/Filter&Sort";

type Props = {
  activeBtn: string;
  setActiveBtn: React.Dispatch<React.SetStateAction<string>>;
};

export default function HomeHeader({ activeBtn, setActiveBtn }: Props) {
  const filters = [
    { label: "7 days", value: "7 days" },
    { label: "30 days", value: "30 days" },
    { label: "90 days", value: "90 days" },
  ];

  return (
    <FilterSortHeader
      heading="Dashboard"
      filterName="last"
      filters={filters}
      sortName="-"
      activeBtn={activeBtn}
      setActiveBtn={setActiveBtn}
    />
  );
}
