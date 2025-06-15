import Header from "./header/Index";

type Props = {
  dateRange: string;
};

export default function HomeMain({ dateRange }: Props) {
  return (
    <div className="section__main">
      <Header dateRange={dateRange} />
    </div>
  );
}
