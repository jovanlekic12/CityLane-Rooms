import { useNavigate, useSearchParams } from "react-router";

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
    <div className="section__header">
      <h1 className="section__heading">All users</h1>
      <div className="section__header__right">
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
