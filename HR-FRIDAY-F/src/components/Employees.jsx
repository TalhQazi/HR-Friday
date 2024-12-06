import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import fridayImage from "./dashboardImages/friday.jpg";
import AuthContext from "../context/AuthContext";
import bellImage from "./dashboardImages/bell.jpg";
import messageImage from "./dashboardImages/message.jpg";
import womanImage from "./dashboardImages/woman.jpg";
import useAxios from "../utils/useAxios";
import AddEmployee from "./AddEmployee";
import EmployeeHero from "./employeesComponent/EmployeesHero/EmployeeHero";
import SideBar from "./layout/sideBar/SideBar";
import Header from "./layout/header/Header";
import EmployeeAloo from "./employeesComponent/EmployeesHero/aloo";
function Employees() {
  let { user, logoutUser } = useContext(AuthContext);
  const api = useAxios();
  const [employees, setEmployees] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullTimeEmployees, setFullTimeEmployees] = useState([]);
  const [contractEmployees, setContractEmployees] = useState([]);
  const [newHireEmployees, setNewHireEmployees] = useState([]);
  const [employeeLabels, setEmployeeLabels] = useState([]);
  const [internEmployees, setInternEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [name, setName] = useState("");

  function formatTimestamp(timestamp) {
    // Parse the timestamp
    const date = new Date(timestamp);

    // Extract hours, minutes, and seconds
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Determine AM or PM suffix
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Add leading zeros to minutes and seconds if needed
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;

    // Format the time string
    const formattedTime = `${hours}:${minutesStr}:${secondsStr} ${ampm}`;

    return formattedTime;
  }

  const FilterEmployee = function (value) {
    if (value != "Level") {
      setLoading(true);
      if (value == "All") {
        setCurrentEmployees(employees);
      } else {
        setCurrentEmployees(
          employees.filter((employee) => {
            return employee.level == value;
          })
        );
      }

      setLoading(false);
    }
  };
  const employeeAttendance = function (status) {
    if (status != "Status") {
      setLoading(true);
      if (status == "Present") {
        api.get(`main/attendance/Present/${user.company}/`).then((response) => {
          setCurrentEmployees(response.data);
          setLoading(false);
        });
      } else if (status == "On-leave") {
        api.get(`main/attendance/Leave/${user.company}/`).then((response) => {
          setCurrentEmployees(response.data);
          setLoading(false);
        });
      }
    }
  };
  useEffect(() => {
    if (user.is_manager) {
      setIsManager(true);
    } else {
      logoutUser();
    }
    api.get(`main/employee-list/${user.company}/`).then((response) => {
      setEmployees(response.data);
      setCurrentEmployees(response.data);

      setFullTimeEmployees(
        response.data.filter((employee) => {
          return employee.level == "Full Time";
        })
      );
      setNewHireEmployees(
        response.data.filter((employee) => {
          return employee.level == "New Hire";
        })
      );
      setInternEmployees(
        response.data.filter((employee) => {
          return employee.level == "Intern";
        })
      );
      setContractEmployees(
        response.data.filter((employee) => {
          return employee.level == "Contractors";
        })
      );
      const labelArray = response.data.map((employee) => {
        return employee.level;
      });
      const labelSet = new Set(labelArray);
      let array = [...labelSet];
      setEmployeeLabels(array);
      setLoading(false);
    });
    api
      .get(`main/department-list/${user.company}/`)
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getEmployeeByName = function (name) {
    setLoading(true);
    const filteredEmployees = employees.filter((employee) => {
      return employee.full_name.toLowerCase().includes(name.toLowerCase());
    });
    setCurrentEmployees(filteredEmployees);
    setLoading(false);
  };
  const employeeByDepartment = function (department_id) {
    if (department_id == "Department") {
      return;
    }
    setLoading(true);
    api.get(`main/employee-department/${department_id}/`).then((response) => {
      setCurrentEmployees(response.data);
      setLoading(false);
    });
  };
  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <>
      {isManager ? (
        <>
          {/* <SideBar /> */}

          <Header />
          <div className="flex">
            <SideBar />
            <div className="w-full bg-white">
              <EmployeeHero />
              {/* <EmployeeAloo /> */}
            </div>
          </div>
        </>
      ) : (
        <h2>You don't permission to view this page</h2>
      )}

      <script
        src="https://kit.fontawesome.com/a076d05399.js"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default Employees;
