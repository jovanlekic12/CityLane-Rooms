import { useNavigate, useSearchParams } from "react-router";
import FilterSortHeader from "../../../../components/Filter&Sort";

export default function UsersHeader() {
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

  const sorts = [
    { label: "Sort by date (earlier first)", value: "created-asc" },
    { label: "Sort by date (recent first)", value: "created-desc" },
    { label: "Sort by name (A-Z)", value: "name-asc" },
    { label: "Sort by name (Z-A)", value: "name-desc" },
  ];

  return (
    <FilterSortHeader
      sorts={sorts}
      heading="All cabins"
      filterName="discount"
      sortName="sortBy"
    />
  );
}
