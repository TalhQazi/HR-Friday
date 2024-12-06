import React from "react";
import PerformanceHero from "../../components/performanceComponent/performanceHero";
import Header from "../layout/header/Header";
import SideBar from "../layout/sideBar/SideBar";
const Performance = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-full bg-white">
          <PerformanceHero />
        </div>
      </div>
    </>
  );
};

export default Performance;
