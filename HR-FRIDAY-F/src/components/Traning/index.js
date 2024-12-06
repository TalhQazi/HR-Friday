import React from "react";
import TraningHero from "../../components/traningComponent/traningHero";
import TraningingTable from "../../components/traningComponent/traingingTable";
import Header from "../layout/header/Header";
import SideBar from "../layout/sideBar/SideBar";

const Traning = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-full lg:w-[85%] bg-white">
          <TraningHero />
        </div>
      </div>
    </>
  );
};

export default Traning;
