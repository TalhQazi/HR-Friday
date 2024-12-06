import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";

const columns = [
  {
    name: "Name",
    selector: (row) => row.Name,
  },
  {
    name: "Level",
    selector: (row) => row.Level,
  },
  {
    name: "Position",
    selector: (row) => row.Position,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
  },
];

const aloodata = [
  {
    id: 1,
    Name: "Zara",
    Role: "Marketing Manager  ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 2,
    Name: "Zara",
    Role: "Python developer ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 3,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 4,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 5,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 6,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 6,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
];

const initialTasks = [
  "Provide employment contract to new hires",
  "Conduct session on workplace ethics",
  "Arrange training session for junior marketers",
  "Meet with Sales and Design managers to discuss new hiring needs",
  "Train new HR interns about company policies",
  "Arrange training session for junior marketers",
  "Meet with Sales and Design managers to discuss new hiring needs",
];

const DashboardEmplTable = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [editableTaskIndex, setEditableTaskIndex] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { user } = useContext(AuthContext);
  const api = useAxios();
  useEffect(() => {
    api.get(`main/employee-list/${user.company}/`).then((response) => {
      console.log(response.data);
      setEmployees(response.data);
      setData(
        response.data.map((employee) => {
          return {
            id: employee.id,
            Name: employee.full_name,
            Level: employee.level,
            Position: employee.position,
            Status:
              employee.attendance_today.length > 0
                ? employee.attendance_today[0].status
                : "NA",
          };
        })
      );
    });
  }, []);
  console.log("Employees", employees);
  console.log(data);
  const handleTaskClick = (index) => {
    setEditableTaskIndex(index);
  };

  const handleTaskChange = (e, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = e.target.value;
    setTasks(updatedTasks);
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskSubmit = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask.trim()]);
      setNewTask("");
    }
  };
  return (
    <div className="px-4 dashboard-tables py-8 flex flex-col xl:flex-row gap-10">
      <div className="w-full h-fit xl:w-[70%] border-[1px] border-[#000000] rounded-3xl overflow-hidden">
        <h2 className="text-2xl md:text-3xl text-center bg-[#D9D9D9] py-2">
          Employees
        </h2>
        <DataTable className="" columns={columns} data={data} />
      </div>
      <div className="upcommingTask bg-[#D9D9D9] p-4 rounded-3xl w-full xl:w-[30%]">
        <h2 className="text-2xl md:text-3xl text-center bg-[#D9D9D9] py-1">
          Upcoming Tasks{" "}
        </h2>
        <div className="pt-2 flex flex-col gap-4 xl:gap-0">
          {tasks.map((task, index) => (
            <div key={index} className="border-b-black border-b-[1px]">
              {editableTaskIndex === index ? (
                <input
                  className="text-lg w-full p-2"
                  value={task}
                  onChange={(e) => handleTaskChange(e, index)}
                  onBlur={() => setEditableTaskIndex(null)}
                  autoFocus
                />
              ) : (
                <p
                  className="text-lg cursor-pointer"
                  onClick={() => handleTaskClick(index)}
                >
                  {index + 1}- {task}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardEmplTable;
