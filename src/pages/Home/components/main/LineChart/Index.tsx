import React from "react";
import ReactECharts from "echarts-for-react";
import { fetchChartStatistics } from "../../../../../API/statistics";
import { useFetchData } from "../../../../../API/useFetchData";
import { fromToday } from "../../../../../utils/helpers";
import Loader from "../../../../../components/Loader";

const LineChart: React.FC = () => {
  const { data, isLoading } = useFetchData(fetchChartStatistics);

  const days = data?.map(({ day }) => fromToday(day)).reverse();
  const stats = data?.map(({ value }) => value);

  console.log(days, stats);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: days,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: stats,
        type: "line",
        smooth: true,
        areaStyle: {
          color: "#818cf8",
        },
      },
    ],
  };

  return (
    <section className="pie__chart__section">
      {isLoading && <Loader />}
      {days && (
        <h1 className="pie__chart__heading">
          Most cabin views from {days[0]} to {days[6]}
        </h1>
      )}
      <ReactECharts option={options} className="line__chart" />
    </section>
  );
};

export default LineChart;
