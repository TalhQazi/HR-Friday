import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { LuPlusCircle } from "react-icons/lu";
import { IoArrowDownOutline } from "react-icons/io5";
import PeiChart from "../peiChart";

const Seniority = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const Department = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const Status = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const GenderSelectOption = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    maxWidth: "80px",
    editable: true,
    maxWidth: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.Name,
    editable: true,
  },
  {
    name: "Role",
    selector: (row) => row.Role,
    minWidth: "250px",
    editable: true,
  },
  {
    name: "Department",
    selector: (row) => row.Department,
    editable: true,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
    editable: true,
  },
];

const dataTbale = [
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
    id: 7,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 8,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 9,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 10,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
  },
  {
    id: 11,
    Name: "Zara",
    Role: "Marketing ",
    Department: "Marketing",
    Status: "Present",
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
    minWidth: "400px",
  },
  {
    name: "Deadline",
    selector: (row) => row.Deadline,
  },
];

const Studentdata = [
  {
    id: "1",
    Description: "Provide employment contract to New hires",
    Deadline: "25-07-2024",
  },
];

const EmployeeAloo = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(dataTbale);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    Name: "",
    Role: "",
    Department: "",
    Status: "",
  });
  const handleRowClick = (row) => {
    setSelectedEmployee(row);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      maxWidth: "80px",
    },
    {
      name: "Name",
      selector: (row) =>
        editRowId === row.id ? (
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
          />
        ) : (
          row.Name
        ),
    },
    {
      name: "Role",
      selector: (row) =>
        editRowId === row.id ? (
          <input
            type="text"
            name="Role"
            value={formData.Role}
            onChange={handleInputChange}
          />
        ) : (
          row.Role
        ),
      minWidth: "250px",
    },
    {
      name: "Department",
      selector: (row) =>
        editRowId === row.id ? (
          <input
            type="text"
            name="Department"
            value={formData.Department}
            onChange={handleInputChange}
          />
        ) : (
          row.Department
        ),
    },
    {
      name: "Status",
      selector: (row) =>
        editRowId === row.id ? (
          <input
            type="text"
            name="Status"
            value={formData.Status}
            onChange={handleInputChange}
          />
        ) : (
          row.Status
        ),
    },
  ];
  return (
    <div className="bg-white px-6 pt-20 md:pt-0 pb-8">
      <h1 className="text-3xl md:text-4xl text-[#000000]">
        Employee Management
      </h1>
      <div className="emplyee-cards pt-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Total employees</p>
          <p className="text-4xl">104</p>
        </div>
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Full-time</p>
          <p className="text-4xl">92</p>
        </div>
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Contractors</p>
          <p className="text-4xl">08</p>
        </div>
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Part-time</p>
          <p className="text-4xl">16</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-2 xl:gap-12">
        <div className="emplyee-selects bg-[#BC9DF6AD] py-2 px-2 my-4 rounded-2xl w-full lg:w-[75%] xl:w-[75%] flex flex-wrap gap-2 lg:gap-4 xl:gap-6">
          <div className="rounded-[15px] w-full md:w-fit  h-[50px] bg-white py-1 px-4 flex items-center jsutify-center">
            <input
              type="text"
              placeholder="Enter Employee Name"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              className="text-md text-[#000000] placeholder-black w-full md:w-auto h-full bg-transparent focus:outline-none text-md text-[#000000]"
            />
          </div>
          <div className="w-full md:w-fit">
            <Select placeholder="Seniority" options={Seniority} />
          </div>
          <div className="w-full md:w-fit">
            <Select placeholder="Department" options={Department} />
          </div>
          <div className="w-full md:w-fit">
            <Select placeholder="Status" options={Status} />
          </div>
        </div>
        <button className="bg-[#BC9DF6] py-2 px-2 my-4 text-lg rounded-2xl h-fit md:h-auto flex items-center justify-center gap-3 w-full md:w-fit lg:w-[35%] xl:w-[23%]">
          <LuPlusCircle className="text-3xl lg:text-2xl xl:text-3xl" />
          Add new employee
        </button>
      </div>
      <div className="employee-data-table flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6">
        <div className="w-full h-fit md:w-[60%] lg:w-full xl:w-[70%] border-[1px] border-[#000000] rounded-3xl overflow-hidden">
          <DataTable
            onRowClicked={handleRowClick}
            highlightOnHover
            pointerOnHover
            className=""
            columns={columns}
            data={data}
          />
        </div>

        <div className="genderchart emplyee-selects w-full md:w-[40%] xl:w-[30%] h-fit border-[1px] bg-[#D9D9D9] border-[#000000] rounded-3xl overflow-hidden">
          <div className="px-8 py-4 gender-select-sec">
            <h2 className="text-2xl lg:text-3xl">Diversity by </h2>
            <h2 className="text-2xl lg:text-3xl flex gap-3 items-center pt-3">
              <Select placeholder="Gender" options={GenderSelectOption} />
            </h2>
          </div>

          <div className="gender-chart-main flex justify-center items-center border-[#000000] border-[1px] rounded-3xl bg-white p-4">
            <PeiChart />
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999999999999999999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-[70%] max-w-[90%]">
              {/content/}
              <div className="h-[85vh] overflow-y-scroll lg:h-auto border-[3px] border-black rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/header/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold">Employee Name</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      width="19"
                      height="21"
                      viewBox="0 0 19 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.61 21L9.08 13.95L4.97 21H0.23L6.83 10.44L0.14 0.0599996H4.97L9.5 7.08L13.58 0.0599996H18.32L11.75 10.59L18.44 21H13.61Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
                {/body/}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 px-4">
                  <div className="bg-[#91D27A] rounded-xl p-4 border-[#000000] border-[1px]">
                    <p className="text-2xl text-center">Personal details</p>
                    <ul className="text-[16px]">
                      <li className="flex gap-2 justify-between">
                        <p>Name</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>CNIC #</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Gender</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Phone #</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Email</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Address</p> <p></p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#57A6C8] rounded-xl p-4 border-[#000000] border-[1px]">
                    <p className="text-2xl text-center">Work details</p>
                    <ul className="text-[16px]">
                      <li className="flex gap-2 justify-between">
                        <p>Employee id</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Joining date</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Job title</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Department</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Seniority level</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Branch</p> <p></p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#BC9DF6] rounded-xl p-4 border-[#000000] border-[1px]">
                    <p className="text-2xl text-center">Personal details</p>
                    <ul className="text-[16px]">
                      <li className="flex gap-2 justify-between">
                        <p>Base Salary</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Commission</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Overtime pay</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Tax Rate</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Payout freq.</p> <p></p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Benefits provided</p> <p></p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 flex flex-col lg:flex-row gap-8">
                  <div className="GoalTracking-table w-full lg:w-[66%] rounded-xl border-[#000000] border-[1px] overflow-hidden">
                    <div className="flex justify-between px-5 py-3">
                      <p className="text-2xl font-[500]">Goal Tracking</p>
                      <div className="w-full md:w-fit emplyee-selects">
                        <Select placeholder="Search" options={Seniority} />
                      </div>
                    </div>
                    <div className="w-full studentTable">
                      <DataTable
                        className=""
                        columns={Studentcolumns}
                        data={Studentdata}
                      />
                    </div>
                  </div>
                  <div className="overl-all-per flex flex-col gap-4 w-full lg:w-[32%]">
                    <div className="bg-[#91D27A] w-full text-2xl justify-between rounded-[20px] p-4 flex items-center text-center">
                      <p>Performance</p>
                      <p>08/10</p>
                    </div>
                    <div className="bg-[#7C97E8] w-full text-2xl justify-between rounded-[20px] p-4 flex items-center text-center">
                      <p>Attendance</p>
                      <p>16/30</p>
                    </div>
                    <div className="bg-[#BC9DF6] w-full text-2xl justify-between rounded-[20px] p-4 flex items-center text-center">
                      <p>Coworker </p>
                      <p>5/10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default EmployeeAloo;
