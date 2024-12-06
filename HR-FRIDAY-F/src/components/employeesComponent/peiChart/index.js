import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PeiChart = ({ labels, myData }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: myData,
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#ffce98"],
        borderColor: ["white", "white", "white"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default PeiChart;
