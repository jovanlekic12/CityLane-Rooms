import { useCallback } from "react";
import { fetchGeneralStatistics } from "../../../../../API/statistics";
import { useFetchData } from "../../../../../API/useFetchData";
import { IoCalendarOutline } from "react-icons/io5";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsBarChart } from "react-icons/bs";
import { PiHandbag } from "react-icons/pi";
type Props = {
  dateRange: string;
};

export default function Header({ dateRange }: Props) {
  const getStatistics = useCallback(() => {
    return fetchGeneralStatistics(dateRange);
  }, [dateRange]);

  const { data: stats } = useFetchData(getStatistics);

  return (
    <header className="dashboard__main__header">
      {stats &&
        stats.map((stat) => {
          return (
            <div className="stats">
              <div className={`${stat.name}__div stats__svg__div`}>
                {stat.name === "bookings" && <PiHandbag />}
                {stat.name === "sales" && <GiTakeMyMoney />}
                {stat.name === "check ins" && <IoCalendarOutline />}
                {stat.name === "occupancy rate" && <BsBarChart />}
              </div>
              <div className="stats__div">
                <h5 className="stats__name">{stat.name}</h5>
                <p className="stats__value">
                  {stat.name === "bookings" && stat.value}
                  {stat.name === "sales" &&
                    `$${stat.value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
                  {stat.name === "check ins" && stat.value}
                  {stat.name === "occupancy rate" && `${stat.value}%`}
                </p>
              </div>
            </div>
          );
        })}
    </header>
  );
}
