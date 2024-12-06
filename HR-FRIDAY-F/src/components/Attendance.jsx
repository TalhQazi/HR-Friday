import React from "react";
import Header from "./layout/header/Header";
import SideBar from "./layout/sideBar/SideBar";
// import AttendanceHero from "./attendaceComponent/attendanceHero/index";
import AttendanceHero from "./attendaceComponent/AttendanceHero/index";

function Attendance() {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-full lg:w-[85%] bg-white">
          <AttendanceHero />
          {/* <AttendanceTable /> */}
        </div>
      </div>
    </>
  );
}

export default Attendance;
