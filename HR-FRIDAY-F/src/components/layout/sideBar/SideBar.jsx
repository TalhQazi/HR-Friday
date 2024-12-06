import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logoutUser } = useContext(AuthContext);
  const isActive = (path) => (currentPath === path ? "active-link" : "");

  return (
    <footer className="hidden lg:block bg-[#BC9DF6] w-[15%] h-screen pl-3 xl:pl-12 pr-6 py-2">
      <div className="fixed flex flex-col justify-between gap-8 xl:gap-10 2xl:gap-20 pt-20">
        <div className="sidebar-nave-links">
          <ul className="flex flex-col gap-[2px] xl:gap-1 text-md xl:text-md 2xl:text-lg">
            <Link
              to="/"
              className={`${isActive(
                "/"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Dashboard</li>
            </Link>
            <Link
              to="/employees"
              className={`${isActive(
                "/employees"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Employees</li>
            </Link>
            <Link
              to="/attendance"
              className={`${isActive(
                "/attendance"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Attendance</li>
            </Link>
            <Link
              to="/payroll"
              className={`${isActive(
                "/payroll"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Payroll</li>
            </Link>
            {/* <Link
              to="/benefits"
              className={`${isActive(
                "/benefits"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Benefits</li>
            </Link> */}
            {/* <Link
              to="/requests"
              className={`${isActive(
                "/requests"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Requests</li>
            </Link> */}
            <Link
              to="/performance"
              className={`${isActive(
                "/performance"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Performance</li>
            </Link>
            <Link
              to="/trainings"
              className={`${isActive(
                "/trainings"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Trainings</li>
            </Link>
            {/* <Link
              to="/records"
              className={`${isActive(
                "/records"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Records</li>
            </Link> */}
          </ul>
        </div>
        <div className="sidebar-nave-links">
          <ul className="flex flex-col gap-2 text-md 2xl:text-lg">
            <Link
              to="/help"
              className={`${isActive(
                "/help"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Help</li>
            </Link>
            <Link
              to="/settings"
              className={`${isActive(
                "/settings"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Settings</li>
            </Link>
            <Link
              onClick={logoutUser}
              className={`${isActive(
                "/signout"
              )} py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 ease-in-out`}
            >
              <li>Sign Out</li>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default SideBar;
