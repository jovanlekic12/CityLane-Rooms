import { useCallback } from "react";
import { fetchCabinsStatistics } from "../../../../../API/statistics";
import { useFetchData } from "../../../../../API/useFetchData";
import ReactECharts from "echarts-for-react";
import Loader from "../../../../../components/Loader";
type Props = {
  dateRange: string;
};

const PieChart: React.FC<Props> = ({ dateRange }) => {
  const getStatistics = useCallback(() => {
    return fetchCabinsStatistics(dateRange);
  }, [dateRange]);

  const { data: stats, isLoading } = useFetchData(getStatistics);
  const total = stats?.reduce((sum, stat) => sum + stat.value, 0) ?? 0;

  console.log(total);

  console.log(stats);

  const colors = [
    "#1e1b4b",
    "#3730a3",
    "#4f46e5",
    "#6366f1",
    "#818cf8",
    "#a5b4fc",
    "#c7d2fe",
    "#d5dafe",
  ];
  const options = {
    color: colors,
    tooltip: {
      trigger: "item",
    },
    graphic: {
      type: "text",
      left: "center",
      top: "center",
      style: {
        text: `Ukupno\n${total}`,
        textAlign: "center",
        fill: "#374151",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 25,
      },
    },
    series: [
      {
        name: "Most visited cabin",
        type: "pie",
        radius: ["40%", "80%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          show: false,
          position: "center",
        },

        labelLine: {
          show: false,
        },
        data: stats,
      },
    ],
  };

  return (
    <section className="pie__chart__section">
      {isLoading && <Loader />}

      <h1 className="pie__chart__heading">
        Most visited cabins in {dateRange}
      </h1>
      <div className="pie__chart__main__div">
        <ReactECharts
          option={options}
          style={{ height: "350px", width: "500px" }}
        />
        <div className="pie__chart__infos">
          {stats?.map((stat, index) => {
            return (
              <div className="chart__info__div">
                <div className="chart__name__div">
                  <h5>Cabin {stat.name}</h5>
                  <p>
                    {stat.value.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div
                  className="pie__chart__hr"
                  style={{
                    width: `${total > 0 ? (stat.value / total) * 100 : 0}%`,
                    height: "4px",
                    backgroundColor: `${colors[index]}`,
                  }}
                ></div>
                <div className="pie__chart__hr__shadow"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PieChart;
