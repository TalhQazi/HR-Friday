import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { Link } from "react-router-dom";
// import "./dashboard.css";
import "../assets/style/style.css";
// Import the image
import fridayImage from "./dashboardImages/friday.jpg";
import bellImage from "./dashboardImages/bell.jpg";
import messageImage from "./dashboardImages/message.jpg";
import womanImage from "./dashboardImages/woman.jpg";
import DoughnetChart from "./DoughnetChart";
import BarChart from "./BarChart";
import { useNavigate } from "react-router-dom";
import DashboardHero from "./dashboardComponent/dashboardHero/DashboardHero";
import DashboardEmplTable from "./dashboardComponent/dashboardEmplTable/DashboardEmplTable";
import Header from "./layout/header/Header";
import SideBar from "./layout/sideBar/SideBar";
function Dashboard() {
  let { user, logoutUser } = useContext(AuthContext);
  const api = useAxios();
  const [totalEmployees, setTotalEmployees] = useState("");
  const [employees, setEmployees] = useState([]);
  const [permanentEmployees, setPermanentEmployees] = useState([]);
  const [newHireEmployees, setNewHireEmployees] = useState([]);
  const [internEmployees, setInternEmployees] = useState([]);
  const [contractEmployees, setContractEmployees] = useState([]);
  const [employeeLabels, setEmployeeLabels] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const employeeArray = [];

  const navigate = useNavigate();
  useEffect(() => {
    if (user.is_manager) {
      setIsManager(true);
    } else {
      logoutUser();
    }
    api
      .get(`main/employee-list/${user.company}/`)
      .then((response) => {
        if (response.status == -401) {
          logoutUser();
          navigate("/login");
        }
        console.log(response.data);
        setEmployees(response.data);

        setPermanentEmployees(
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
        array = array.filter((item) => item !== "");

        setEmployeeLabels(array);
        setTotalEmployees(response.data.length);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-full bg-white">
          <DashboardHero
            permanentEmployees={permanentEmployees}
            newHireEmployees={newHireEmployees}
            totalEmployees={totalEmployees}
            employees={employees}
          />
          <DashboardEmplTable employees={employees} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
