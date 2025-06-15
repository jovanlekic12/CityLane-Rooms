import FilterSortHeader from "../../../../components/Filter&Sort";

export default function UsersHeader() {
  const sorts = [
    { label: "Sort by date (earlier first)", value: "created-asc" },
    { label: "Sort by date (recent first)", value: "created-desc" },
    { label: "Sort by name (A-Z)", value: "name-asc" },
    { label: "Sort by name (Z-A)", value: "name-desc" },
  ];

  return (
    <FilterSortHeader
      sorts={sorts}
      filterName="-"
      heading="All users"
      sortName="sortBy"
    />
  );
}
