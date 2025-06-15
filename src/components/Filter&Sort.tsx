import { useNavigate, useSearchParams } from "react-router";
import Button from "./Button";

type FilterProps = {
  heading: string;
  filters?: { value: string; label: string }[];
  filterName: string;
  sorts?: { value: string; label: string }[];
  sortName: string;
  activeBtn?: string;
  setActiveBtn?: (button: string) => void;
  setCurrentPage?: (page: number) => void;
};

export default function FilterSortHeader({
  filters,
  activeBtn,
  setActiveBtn,
  sorts,
  heading,
  filterName,
  sortName,
  setCurrentPage,
}: FilterProps) {
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
    setCurrentPage?.(1);
  };

  return (
    <div className="section__header">
      <h1 className="section__heading">{heading}</h1>
      <div className="section__header__right">
        {filters &&
          filters.map((filter) => (
            <Button
              key={filter.value}
              type="filter"
              isActive={activeBtn === filter.value}
              onClick={() => {
                handleFilterChange?.(filter.value, filterName);
                setActiveBtn?.(filter.value);
              }}
            >
              {filter.label}
            </Button>
          ))}
        {sorts && (
          <select
            className="section__header__sort"
            onChange={(e) => handleSortChange(e.target.value, sortName)}
          >
            {sorts.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
