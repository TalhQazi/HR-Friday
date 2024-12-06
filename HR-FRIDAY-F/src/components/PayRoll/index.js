import React from "react";
import PayrollHero from "../../components/payrollComponent/payrollHero";
import PayrollTable from "../../components/payrollComponent/payrollTable";
// import PayrollHero from '../../components/payrollComponent/payrollHero';
import "../../assets/style/style.css";
import SideBar from "../layout/sideBar/SideBar";
import Header from "../layout/header/Header";
const PayRoll = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <SideBar />
        <div className="w-full lg:w-[85%] bg-white">
          <PayrollHero />
          {/* <PayrollTable /> */}
        </div>
      </div>
    </>
  );
};

export default PayRoll;
