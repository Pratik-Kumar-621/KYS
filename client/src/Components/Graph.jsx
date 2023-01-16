import React from "react";
import ReactApexChart from "react-apexcharts";

const Graph = ({ arr }) => {
  const value = arr?.map((item) => ({
    x: new Date(item.Date),
    y: [item.Open, item.High, item.Low, item.Close],
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
      text: "",
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
    <>
      <ReactApexChart options={options} series={series} type="candlestick" />
    </>
  );
};

export default Graph;
