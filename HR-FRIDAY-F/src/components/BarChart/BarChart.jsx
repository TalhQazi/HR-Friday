import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });
    return () => {
      myChart.destroy();
    };
  }, [data, options]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
