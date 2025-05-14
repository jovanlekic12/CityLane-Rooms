import Button from "../../../components/Button";

type HeaderProps = {
  handleFilterChange: (filter: string) => void;
};

function CabinsHeader({ handleFilterChange }: HeaderProps) {
  return (
    <div className="section__header">
      <h1 className="section__heading">All cabins</h1>
      <div className="section__header__right">
        <Button type="filter" onClick={() => handleFilterChange("all")}>
          All
        </Button>
        <Button type="filter" onClick={() => handleFilterChange("discount")}>
          No discount
        </Button>
        <Button type="filter">With discount</Button>
        <select>
          <option value="a-z">Sort by name (A-Z)</option>
          <option value="z-a">Sort by name (Z-A)</option>
          <option value="price-low">Sort by price (low first)</option>
          <option value="price-high">Sort by price (high first)</option>
          <option value="capacity-low">Sort by capacity (low first)</option>
          <option value="capacity-high">Sort by capacity (high first)</option>
        </select>
      </div>
    </div>
  );
}
export default CabinsHeader;
