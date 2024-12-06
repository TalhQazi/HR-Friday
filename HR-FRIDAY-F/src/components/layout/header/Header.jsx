import React, { useState } from "react";
import HeaderLogo from "../../../assets/images/header-black-logo.png";
import Notifications from "../../../assets/images/notificationbill.png";
import Chats from "../../../assets/images/chat_10.png";
import User from "../../../assets/images/useicon.png";
import { AiOutlineSearch } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <header className="bg-[#BC9DF6] z-[99999] fixed w-100 right-0 left-0 px-3 xl:px-12 py-1 flex justify-between items-center border-b-black border-b-2">
      <div className="flex items-center gap-3 lg:gap-20 h-14"> {/* Adjusted fixed height */}
  <div className="header-logo">
    <img
      className="w-[80px] lg:w-[140px] h-auto max-h-full" // Adjusted logo width, maintained aspect ratio with max-height
      src={HeaderLogo}
      alt="header logo"
    />
  </div>
  <div className="hidden md:block">
    <div className="header-searchar flex items-center overflow-hidden bg-white rounded-full h-10"> {/* Slightly increased height */}
      <input
        className="px-3 py-1.5 outline-none placeholder-black text-sm" // Adjusted padding
        type="search"
        placeholder="Search anything"
      />
      <button className="bg-[#D9D9D9] px-3 py-1.5 group transition-all duration-300 ease-in-out h-full">
        <AiOutlineSearch className="text-xl group-hover:scale-[1.04] transition-all duration-300 ease-in-out" /> {/* Maintained icon size */}
      </button>
    </div>
  </div>
</div>
<div className="header-nav flex items-center gap-4 md:gap-8">
  <a
    href="#"
    className="hover:scale-[1.04] transition-all duration-300 ease-in-out"
  >
    <img
      className="w-4 md:w-6 h-auto" // Maintained aspect ratio with max-height
      src={Notifications}
      alt="notifications"
    />
  </a>
  <a
    href="#"
    className="hover:scale-[1.04] transition-all duration-300 ease-in-out"
  >
    <img className="w-4 md:w-6 h-auto" // Maintained aspect ratio with max-height
    src={Chats} alt="chats" />
  </a>
  <a href="#" className="">
    <img className="w-6 md:w-8 h-auto" src={User} alt="user icon" /> {/* Adjusted size */}
  </a>
</div>




        <div className="block lg:hidden">
          <div className="flex">
            <input
              type="checkbox"
              id="drawer-toggle"
              className="relative sr-only peer"
              checked={isChecked}
              onChange={handleToggle}
            />
            <label
              htmlFor="drawer-toggle"
              className={`absolute top-[18%] mr-2 flex right-0 inline-block p-3 transition-all duration-500 bg-black rounded-lg ${
                isChecked ? "rotate-180 right-64" : ""
              }`}
            >
              <button onClick={handleToggle} className="relative group">
                <FaChevronLeft className="text-white" />
              </button>
            </label>
            <div
              className={`fixed top-0 right-0 z-20 w-64 h-full transition-all duration-500 transform ${
                isChecked ? "translate-x-0" : "translate-x-full"
              } bg-white shadow-lg`}
            >
              <div className="px-6 py-1">
                <div className="flex flex-col justify-between gap-8 xl:gap-10 2xl:gap-20 pt-8">
                  <div className="sidebar-nave-links">
                    <ul className="flex flex-col gap-[2px] xl:gap-1 text-md xl:text-md 2xl:text-lg">
                      <Link
                        to="/"
                        className="active-link py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Dashboard</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Employees</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Attendance</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Payroll</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Benefits</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Requests</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Performance</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Trainings</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Records</li>
                      </Link>
                    </ul>
                  </div>
                  <div className="sidebar-nave-links">
                    <ul className="flex flex-col gap-2 text-md 2xl:text-lg">
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Help</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Settings</li>
                      </Link>
                      <Link
                        to="#"
                        className="py-1 px-2 hover:bg-[#57A6C8] transition-all duration-300 easi-in-out"
                      >
                        <li>Sign Out</li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
