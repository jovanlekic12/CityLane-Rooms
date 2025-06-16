import Header from "./header/Index";
import PieChart from "./PieChart/Index";

type Props = {
  dateRange: string;
};

export default function HomeMain({ dateRange }: Props) {
  return (
    <div className="section__main">
      <Header dateRange={dateRange} />
      <PieChart dateRange={dateRange} />
    </div>
  );
}
