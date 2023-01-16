import React from "react";
import ReactApexChart from "react-apexcharts";

const Graph = ({ arr }) => {
  const value = arr?.map((item) => ({
    x: new Date(item.Date),
    y: [item.Open, item.Close, item.High, item.Low],
  }));
  const series = [
    {
      data: value,
    },
  ];
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      animations: {
        enabled: false,
      },
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div>
      <h1>
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={350}
        />
      </h1>
    </div>
  );
};

export default Graph;
