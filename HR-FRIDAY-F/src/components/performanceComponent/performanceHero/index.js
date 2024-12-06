import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { LuPlusCircle } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";
const Seniority = [
  { value: "In progress", label: "In progress" },
  { value: "In review", label: "In review" },
  { value: "Done", label: "Done" },
];

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    maxWidth: "10px",
  },
  {
    name: "Name",
    selector: (row) => row.Name,
    maxWidth: "180px",
  },
  {
    name: "score",
    selector: (row) => row.score,
    maxWidth: "20px",
  },
  {
    name: "Date",
    selector: (row) => row.date,
    maxWidth: "145px",
  },
];

const data = [
  {
    id: "021",
    Name: "Zara",
    score: "10/10",
    date: "04/05/2024",
  },
  {
    id: "01",
    Name: "Iqra",
    score: "08/10",
    date: "04/05/2024",
  },
  {
    id: "05",
    Name: "Mubashir",
    score: "08/10",
    date: "04/05/2024",
  },
  {
    id: "02",
    Name: "Iftikhar",
    score: "07/10",
    date: "04/05/2024",
  },
  {
    id: "012",
    Name: "Aimen",
    score: "07/10",
    date: "04/05/2024",
  },
  {
    id: "32",
    Name: "Zulfiqar",
    score: "07/10",
    date: "04/05/2024",
  },
];

const Studentcolumns = [
  {
    name: "#",
    selector: (row) => row.id,
    maxWidth: "10px",
  },
  {
    name: "Description",
    selector: (row) => row.Description,
    maxWidth: "380px",
  },
  {
    name: "Deadline",
    selector: (row) => row.Deadline,
    maxWidth: "145px",
  },
  {
    name: "Status",
    selector: (row) => row.Status,
    maxWidth: "205px",
  },
];

const Studentdata = [
  {
    id: "1",
    Description: "Provide employment contract to New hires",
    Deadline: "25-07-2024",
    Status: "In progress",
  },

  {
    id: "2",
    Description: "Increase Organic website traffic by 30%",
    Deadline: "25-07-2024",
    Status: "In progress",
  },
  {
    id: "3",
    Description: "Boost social media engagement by 20%",
    Deadline: "25-07-2024",
    Status: "In progress",
  },
  {
    id: "4",
    Description: "Generate 50 high-quality leads",
    Deadline: "25-07-2024",
    Status: "In progress",
  },
];

const Goalcolumns = [
  {
    name: "id",
    selector: (row) => row.id,
    maxWidth: "10px",
  },
  {
    name: "Name",
    selector: (row) => row.Name,
  },
  {
    name: "Goal",
    selector: (row) => row.Goal,
    minWidth: "400px",
  },
  {
    name: "Deadline",
    selector: (row) => row.Deadline,
  },

  {
    name: "",
    cell: (row) => (
      <div
        className={`status-cell ${
          row.Status.toLowerCase() === "Review"
            ? "bg-[#BC9DF6] text-center py-1 px-5 rounded-full w-38"
            : "bg-[#BC9DF6] text-center py-1 px-5 rounded-full w-38"
        }`}
      >
        {row.Status}
      </div>
    ),
    selector: (row) => row.Status,
    minWidth: "150px",
  },
];
const Goaldata = [
  {
    id: "1",
    Name: "Akbar Ihasan",
    Goal: "Provide employment contract to New hires",
    Deadline: "25-07-2024",
    Status: "Review",
  },
  {
    id: "2",
    Name: "Akbar Ihasan",
    Goal: "Provide employment contract to New hires",
    Deadline: "25-07-2024",
    Status: "Review",
  },
  {
    id: "3",
    Name: "Akbar Ihasan",
    Goal: "Provide employment contract to New hires",
    Deadline: "25-07-2024",
    Status: "Review",
  },
  {
    id: "4",
    Name: "Akbar Ihasan",
    Goal: "Provide employment contract to New hires",
    Deadline: "25-07-2024",
    Status: "Review",
  },
];

const PerformanceHero = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [topPerformers, setTopPerformers] = useState([]);
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [currentGoals, setCurrentGoals] = useState([]);
  const [doneGoals, setDoneGoals] = useState([]);
  const handleDateChange = (date) => {
    setStartDate(date);
    setShowCalendar(false);
  };

  const handleIconClick = () => {
    setShowCalendar(true);
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  useEffect(() => {
    api
      .get(`main/top-performance/${user.company}/`)
      .then((response) => {
        setTopPerformers(
          response.data.map((performer) => {
            return {
              id: performer.name.id,
              Name: performer.name.full_name,
              marks: performer.score,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    api
      .get(`main/employee-goals-list/${user.company}/`)
      .then((response) => {
        setGoals(response.data);
        setCurrentGoals([response.data[0]]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    api
      .get(`main/done-goals/${user.company}/`)
      .then((response) => {
        setDoneGoals(
          response.data.map((goal) => {
            return {
              id: goal.id,
              Name: goal.employee.full_name,
              Goal: goal.description,
              Deadline: goal.deadline,
              Status: goal.review,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const FilterEmployeeByName = (name) => {
    if (name != "") {
      setCurrentGoals(
        goals.filter((goal) => {
          return goal.full_name.toLowerCase().includes(name.toLowerCase());
        })
      );
    } else {
      setCurrentGoals([goals[0]]);
    }
  };
  // console.log(goals);
  return (
    <div
      className="bg-white px-4 pt-20 "
      style={{
        boxSizing: "border-box",
        marginLeft: "5px",
      }}
    >
      <div style={{ width: "10px" }}></div>
      <h1 className="text-2xl md:text-3xl text-[#000000]">
        Performance Management
      </h1>
      <div className="flex justify-between flex-col xl:flex-row gap-2 xl:gap-6">
        <div className="lg:w-[100%] xl:w-[100%]">
          <div className="emplyee-selects h-fit justify-between bg-[#BC9DF6AD] py-2 px-2 my-4 rounded-2xl w-full  flex flex-wrap gap-2 lg:gap-4 xl:gap-6">
            <div className="rounded-[15px] w-full md:w-fit  h-[50px] bg-white py-1 px-4 flex items-center jsutify-center">
              <input
                type="text"
                placeholder="Enter Employee Name"
                onChange={(e) => FilterEmployeeByName(e.target.value)}
                className="text-md text-[#000000] placeholder-black w-full md:w-auto h-full bg-transparent focus:outline-none text-md text-[#000000]"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-full md:w-full">
                <Select placeholder="Goal Status" options={Seniority} />
              </div>
              <div className="flex gap-5 items-center">
                <label>Pick Date</label>
                <div className="flex items-center gap-2 relative">
                  <span className="cursor-pointer" onClick={handleIconClick}>
                    <svg
                      width="28"
                      height="40"
                      viewBox="0 0 39 51"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.0544566 0V12.5085H38.1741V0H0.0544566ZM0.0544566 18.7628V49.4711C0.0544566 49.7839 0.272283 50.034 0.544566 50.034H37.6295C37.9018 50.034 38.1196 49.7839 38.1196 49.4711V18.7628H0H0.0544566ZM5.50012 25.017H10.9458V31.2713H5.50012V25.017ZM16.3914 25.017H21.8371V31.2713H16.3914V25.017ZM27.2828 25.017H32.7284V31.2713H27.2828V25.017ZM5.50012 37.5255H10.9458V43.7798H5.50012V37.5255ZM16.3914 37.5255H21.8371V43.7798H16.3914V37.5255Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  {showCalendar && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: "-30px",
                        zIndex: 1,
                      }}
                    >
                      <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        inline={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {currentGoals.map((goal) => {
            return (
              <div className="w-full mt-4 border-[1px] border-[#000000] rounded-3xl overflow-hidden">
                <div className="flex flex-wrap gap-5 justify-between px-6 py-4">
                  <div>
                    <p className="text-2xl">{goal.full_name}</p>
                    <p className="border-b-[1px] border-b-black">
                      {goal.position}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <p className="border-b-[1px] border-b-black">
                      {goal.employee_department.name}
                    </p>
                  </div>
                </div>

                <div className="w-full studentTable">
                  <DataTable
                    className=""
                    columns={Studentcolumns}
                    data={goal.goals.map((empGoal) => {
                      return {
                        id: empGoal.id,
                        Description: empGoal.description,
                        Deadline: empGoal.deadline,
                        Status: empGoal.status,
                      };
                    })}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-4 border-[1px] border-[#000000] rounded-3xl overflow-hidden">
        <div className="studentTable">
          <p className="text-2xl font-[500] px-6 py-2">Goal review requests</p>
          <DataTable className="" columns={Goalcolumns} data={doneGoals} />
        </div>
      </div>
      <div className="w-full flex justify-between md:gap-6 xl:gap-0 flex-row md:flex-row xl:flex-row md:w-[100%] w-[100%]">
          <div className="bg-[#91D27A] flex-col py-3 px-4 my-4  w-[50%] text-lg rounded-2xl h-fit md:h-auto flex items-center justify-center gap-3 w-full">
            <p className="text-2xl font-[500]">Top performers</p>
            <div className="w-full top-performance-table">
              <DataTable className="" columns={columns} data={data} />
            </div>
          </div>
          <div className="bg-[#57A6C8] flex-col py-3 px-4 my-4 w-[50%] text-lg rounded-2xl h-fit md:h-auto flex items-center justify-center gap-3 w-full">
            <p className="text-2xl font-[500]">Need some help</p>
            <div className="w-full top-performance-table">
              <DataTable className="" columns={columns} data={data} />
            </div>
          </div>
        </div>
    </div>
  );
};

export default PerformanceHero;
