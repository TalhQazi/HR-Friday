import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      display: "Date",
    },
    y: {
      min: 0,
      max: 11,
      beginAtZero: false,
      ticks: {
        stepSize: 1,
        callback: function (value, index, values) {
          return `${value.toLocaleString()}`;
        },
      },
    },
  },
};

const DashboardHero = ({
  employees,
  permanentEmployees,
  newHireEmployees,
  totalEmployees,
}) => {
  const [needTraining, setNeedTraining] = useState([]);
  const [onLeave, setOnLeave] = useState([]);
  const [employeesPerformance, setEmployeePerformance] = useState([]);
  const [labels, setLabels] = useState([]);
  const [barData, setBarData] = useState([]);
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const data = {
    labels,
    datasets: [
      {
        label: "Team Performance",
        data: barData,
        backgroundColor: "rgba(54, 162, 235 0.8)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        opacity: 0.2,
      },
    ],
  };

  useEffect(() => {
    api
      .get(`main/training-list/${user.company}/`)
      .then((response) => {
        setNeedTraining(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    api.get(`main/attendance/Leave/${user.company}/`).then((response) => {
      setOnLeave(response.data);
    });
  }, []);
  useEffect(() => {
    api.get(`main/performance/${user.company}/`).then((response) => {
      setEmployeePerformance(response.data);
      setLabels(
        response.data.map((performance) => {
          return performance.name.full_name;
        })
      );
      setBarData(
        response.data.map((performance) => {
          return Number(performance.score);
        })
      );
    });
  }, []);
  console.log(employeesPerformance);
  return (
    <>
      <div className="bg-white px-4 pt-20 ">
        <h1 className="text-2xl md:text-3xl text-[#000000]">
          Hi, Anderson N. Horvath
        </h1>
        <p className="text-xl md:text-1xl text-[#1E1E1E]">
          Lets create a productive workplace, today!
        </p>
        <div className="flex flex-col xl:flex-row gap-4 md:gap-4 pt-4">
          <div className="hero-cards w-full xl:w-[30%] grid grid-cols-2 gap-2 md:gap-4">
            <div className="singleCard bg-[#D9D9D9] rounded-3xl flex flex-col justify-around px-4 py-2">
              <p className="text-[1.2rem] text-center xl:text-start leading-[1.4rem] line-clamp-2">
                Total Employees
              </p>
              <p className="text-4xl 2xl:text-6xl text-center  line-clamp-1">
                {totalEmployees}
              </p>
            </div>
            <div className="singleCard bg-[#D9D9D9] rounded-3xl flex flex-col justify-around px-4 py-2" >
              <p className="text-[1.2rem]  text-center xl:text-start leading-[1.4rem] line-clamp-2">
                New hires
              </p>
              <p className="text-4xl 2xl:text-6xl text-center  line-clamp-1">
                {newHireEmployees.length}
              </p>
            </div>
            <div className="singleCard bg-[#D9D9D9] rounded-3xl flex flex-col justify-around px-4 py-2">
              <p className="text-[1.2rem]  text-center xl:text-start leading-[1.4rem] line-clamp-2">
                Need Training
              </p>
              <p className="text-4xl 2xl:text-6xl text-center  line-clamp-1">
                {needTraining.length}
              </p>
            </div>
            <div className="singleCard bg-[#D9D9D9] rounded-3xl flex flex-col justify-around px-4 py-2" >
              <p className="text-[1.2rem]  text-center x;:text-start leading-[1.4rem] line-clamp-2">
                On leave
              </p>
              <p className="text-4xl 2xl:text-6xl text-center  line-clamp-1">
                {onLeave.length}
              </p>
            </div>
          </div>
          <div className="heroChart w-full xl:w-[70%] border-[1px] border-[#000000] rounded-3xl p-3">
            <div className="chart-container" style={{}}>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;
