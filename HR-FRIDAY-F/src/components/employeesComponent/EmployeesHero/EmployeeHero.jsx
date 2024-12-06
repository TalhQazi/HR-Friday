import React, { useContext, useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { LuPlusCircle } from "react-icons/lu";

import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import DoughnetChart from "../../DoughnetChart";
import "../../payroll_calculator.css";
const Status = [
  { value: "Present", label: "Present" },
  { value: "Leave", label: "On-Leave" },
];
const GenderSelectOption = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    maxwidth: "80px",
    editable: false,
  },
  {
    name: "Name",
    selector: (row) => row.Name,
    editable: false,
  },
  {
    name: "Position",
    selector: (row) => row.Position,
    minwidth: "250px",
    editable: false,
  },
  {
    name: "Department",
    selector: (row) => row.Department,
    editable: false,
  },
  {
    name: "Status",
    selector: (row) => row.Status,
    editable: false,
  },
];

const EmployeeHero = () => {
  const [employeeName, setEmployeeName] = useState("");

  const [editRowId, setEditRowId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    Name: "",
    Role: "",
    Department: "",
    Status: "",
  });

  const api = useAxios();
  const { user, logoutUser } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullTimeEmployees, setFullTimeEmployees] = useState([]);
  const [contractEmployees, setContractEmployees] = useState([]);
  const [newHireEmployees, setNewHireEmployees] = useState([]);
  const [employeeLabels, setEmployeeLabels] = useState([]);
  const [internEmployees, setInternEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const swal = require("sweetalert2");
  const [isManager, setIsManager] = useState(false);
  const [employeePositions, setEmployeePositions] = useState([]);
  const [departmentNames, setDepartNames] = useState([]);
  useEffect(() => {
    if (user.is_manager) {
      setIsManager(true);
    } else {
      logoutUser();
    }
    api.get(`main/employee-list/${user.company}/`).then((response) => {
      setEmployees(response.data);
      setCurrentEmployees(response.data);
      setDataTable(
        response.data.map((employee) => {
          return {
            id: employee.id,
            Name: employee.full_name,
            Position: employee.position,
            Department: employee.employee_department
              ? employee.employee_department.name
              : "Not Assigned",
            Status:
              employee.attendance_today.length > 0
                ? employee.attendance_today[0].status
                : "NA",
          };
        })
      );
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
      const positions = [];
      response.data.forEach((employee) => {
        if (!positions.some((pos) => pos.value === employee.position)) {
          positions.push({
            value: employee.position,
            label: employee.position,
          });
        }
      });
      setEmployeePositions(positions);

      const labelSet = new Set(labelArray);
      let array = [...labelSet];
      setEmployeeLabels(array);
      // setEmployeePositions(positionArray);
      setLoading(false);
    });
    api
      .get(`main/department-list/${user.company}/`)
      .then((response) => {
        setDepartments(response.data);
        setDepartNames(
          response.data.map((department) => {
            return { value: department.id, label: department.name };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      maxwidth: "80px",
    },
    {
      name: "Name",
      selector: (row) =>
        editRowId === row.id ? (
          <input type="text" name="Name" value={formData.Name} />
        ) : (
          row.Name
        ),
    },
    {
      name: "Position",
      selector: (row) => row.Position,
      minwidth: "250px",
      editable: false,
    },
    {
      name: "Department",
      selector: (row) =>
        editRowId === row.id ? (
          <input type="text" name="Department" value={formData.Department} />
        ) : (
          row.Department
        ),
    },
    {
      name: "Status",
      selector: (row) =>
        editRowId === row.id ? (
          <input type="text" name="Status" value={formData.Status} />
        ) : (
          row.Status
        ),
    },
  ];

  const getEmployeeByName = (name) => {
    if (name === "") {
      setCurrentEmployees(employees);
      setDataTable(
        employees.map((employee) => ({
          id: employee.id,
          Name: employee.full_name,
          Position: employee.position,
          Department: employee.employee_department
            ? employee.employee_department.name
            : "Not Assigned",
          Status:
            employee.attendance_today.length > 0
              ? employee.attendance_today[0].status
              : "NA",
        }))
      );
    } else {
      setLoading(true);
      const filteredEmployees = employees.filter((employee) =>
        employee.full_name.toLowerCase().includes(name.toLowerCase())
      );
      setCurrentEmployees(filteredEmployees);
      setDataTable(
        filteredEmployees.map((employee) => ({
          id: employee.id,
          Name: employee.full_name,
          Position: employee.position,
          Department: employee.employee_department
            ? employee.employee_department.name
            : "Not Assigned",
          Status:
            employee.attendance_today.length > 0
              ? employee.attendance_today[0].status
              : "NA",
        }))
      );
      setLoading(false);
    }
  };
  const getEmployeeByPosition = (position) => {
    const filteredEmployees = employees.filter((employee) => {
      return employee.position == position.value;
    });
    setCurrentEmployees(filteredEmployees);
    setDataTable(
      filteredEmployees.map((employee) => ({
        id: employee.id,
        Name: employee.full_name,
        Position: employee.position,
        Department: employee.employee_department
          ? employee.employee_department.name
          : "Not Assigned",
        Status:
          employee.attendance_today.length > 0
            ? employee.attendance_today[0].status
            : "NA",
      }))
    );
  };
  const employeeAttendance = function (status) {
    api
      .get(`main/attendance/${status.value}/${user.company}/`)
      .then((response) => {
        setCurrentEmployees(response.data);
        setDataTable(
          response.data.map((employee) => ({
            id: employee.id,
            Name: employee.full_name,
            Position: employee.position,
            Department: employee.employee_department
              ? employee.employee_department.name
              : "Not Assigned",
            Status:
              employee.attendance_today.length > 0
                ? employee.attendance_today[0].status
                : "NA",
          }))
        );
        setLoading(false);
      });
  };
  const getEmployeeByDepartment = function (department_id) {
    if (department_id.value == "Department" || department_id.value == "") {
      return;
    }
    setLoading(true);
    api
      .get(`main/employee-department/${department_id.value}/`)
      .then((response) => {
        setCurrentEmployees(response.data);
        setDataTable(
          response.data.map((employee) => ({
            id: employee.id,
            Name: employee.full_name,
            Position: employee.position,
            Department: employee.employee_department
              ? employee.employee_department.name
              : "Not Assigned",
            Status:
              employee.attendance_today.length > 0
                ? employee.attendance_today[0].status
                : "NA",
          }))
        );
        setLoading(false);
      });
  };

  const myData = [];
  if (fullTimeEmployees.length > 0) {
    myData.push(fullTimeEmployees.length);
  }
  if (contractEmployees.length > 0) {
    myData.push(contractEmployees.length);
  }
  if (internEmployees.length > 0) {
    myData.push(internEmployees.length);
  }
  if (newHireEmployees.length > 0) {
    myData.push(newHireEmployees.length);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [formdepartment, setFormDepartmentName] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [jobType, setJobType] = useState("");
  const [branch, setBranch] = useState("");
  const [seniorityLevel, setSeniorityLevel] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [base_salary, setBaseSalary] = useState("");
  const [salaryPaymentDate, setSalaryPaymentDate] = useState("");
  const [commission, setCommission] = useState("");
  const [benefitsOffered, setBenefitsOffered] = useState("");
  const [overtimePayrate, setOvertimePayrate] = useState("");
  const [noOfPaidLeaves, setNoOfPaidLeaves] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const handleRowClick = (row) => {
    api
      .get(`main/employee-details/${row.id}`)
      .then((response) => {
        // console.log(response.data);
        setSelectedEmployee(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
    // setSelectedEmployee(row);
    // console.log(row);

    // console.log(selectedEmployee);
  };
  const addEmployee = () => {
    const formData = new FormData();
    formData.append("full_name", name);
    formData.append("email", email);
    formData.append("work_email", workEmail);
    formData.append("cnic", CNIC);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("department", formdepartment);
    formData.append("date", joiningDate);
    formData.append("level", jobType);
    formData.append("branch", branch);
    formData.append("position", seniorityLevel);
    formData.append("job_title", jobTitle);
    formData.append("salary", base_salary);
    formData.append("salary_payment_date", salaryPaymentDate);
    formData.append("commission", commission);
    formData.append("benefits_offered", benefitsOffered);
    formData.append("overtime_pay_rate", overtimePayrate);
    formData.append("no_of_paid_leaves", noOfPaidLeaves);
    formData.append("tax_rate", taxRate);
    formData.append("company_id", user.company);
    formData.append("password", password);
    formData.append("password2", password);
    formData.append("username", email.split("@")[0]);
    console.log("Inside ADD EMPLOYEE FUNCTION");
    api
      .post("register/", formData)
      .then((response) => {
        window.location.href = "/employees";
        swal.fire({
          title: "Employee Added Successfully",
          icon: "success",
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          position: "center",
          showConfirmButton: false,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-white px-4 pt-20 ">
      <h1 className="text-2xl md:text-3xl text-[#000000]">
        Employee Management
      </h1>
      <div className="emplyee-cards pt-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Total employees</p>
          <p className="text-4xl">{employees.length}</p>
        </div>
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Full-time</p>
          <p className="text-4xl">{fullTimeEmployees.length}</p>
        </div>
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Contractors</p>
          <p className="text-4xl">{contractEmployees.length}</p>
        </div>
        <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
          <p className="text-xl">Interns</p>
          <p className="text-4xl">{internEmployees.length}</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-2 xl:gap-12">
        <div className="emplyee-selects bg-[#BC9DF6AD] py-2 px-2 my-4 rounded-2xl w-full lg:w-[100%] xl:w-[75%] flex flex-wrap gap-2 lg:gap-4 xl:gap-6">
          <div className="rounded-[15px] w-full md:w-fit  h-[50px] bg-white py-1 px-4 flex items-center jsutify-center">
            <input
              type="text"
              placeholder="Enter Employee Name"
              onChange={(e) => getEmployeeByName(e.target.value)}
              className="text-md text-[#000000] placeholder-black w-full md:w-auto h-full bg-transparent focus:outline-none text-md text-[#000000]"
            />
          </div>
          <div className="w-full md:w-fit">
            <Select
              placeholder="Seniority"
              options={employeePositions}
              onChange={getEmployeeByPosition}
            />
          </div>
          <div className="w-full md:w-fit">
            <Select
              placeholder="Department"
              options={departmentNames}
              onChange={getEmployeeByDepartment}
            />
          </div>
          <div className="w-full md:w-fit">
            <Select
              placeholder="Status"
              options={Status}
              onChange={employeeAttendance}
            />
          </div>
        </div>
        <button
          onClick={handleModalOpen}
          className="bg-[#BC9DF6] py-2 px-2 my-4 text-lg rounded-2xl h-fit md:h-auto flex items-center justify-center gap-3 w-full md:w-fit lg:w-[35%] xl:w-[23%]"
        >
          <LuPlusCircle className="text-3xl lg:text-2xl xl:text-3xl" />
          Add new employee
        </button>
      </div>
      <div className="employee-data-table flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4">
        <div className="w-full h-fit md:w-[60%] lg:w-full xl:w-[70%] border-[1px] border-[#000000] rounded-3xl overflow-hidden">
          <DataTable
            highlightOnHover
            pointerOnHover
            className=""
            onRowClicked={handleRowClick}
            columns={columns}
            data={dataTable}
          />
        </div>

        <div className="genderchart emplyee-selects w-full md:w-[40%] xl:w-[30%] h-fit border-[1px] bg-[#D9D9D9] border-[#000000] rounded-3xl overflow-hidden">
          <div className="px-8 py-4 gender-select-sec">
            <h2 className="text-2xl lg:text-3xl">Employees </h2>
            <h2 className="text-2xl lg:text-3xl flex gap-3 items-center pt-3">
              {/* <Select placeholder="Gender" options={GenderSelectOption} /> */}
            </h2>
          </div>

          <div className="gender-chart-main flex justify-center items-center border-[#000000] border-[1px] rounded-3xl bg-white p-4">
            {/* <PeiChart myData={myData} labels={employeeLabels} /> */}
            {!loading && (
              <DoughnetChart dataLabels={employeeLabels} myData={myData} />
            )}
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999999999999999999999] outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto min-w-[70%] max-w-[90%]">
              {/*content*/}
              <div className="h-[85vh] overflow-y-scroll lg:h-auto border-[3px] border-black rounded-[20px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-2xl font-semibold">
                    {selectedEmployee.full_name}
                  </h3>
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
                {/*body*/}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8 px-4">
                  <div className="bg-[#91D27A] rounded-xl p-4 border-[#000000] border-[1px]">
                    <p className="text-2xl text-center">Personal details</p>
                    <ul className="text-[16px]">
                      <li className="flex gap-2 justify-between">
                        <p>Name</p> <p>{selectedEmployee.full_name}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>CNIC #</p> <p>{selectedEmployee.cnic}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Gender</p> <p>{selectedEmployee.gender}</p>
                      </li>
                      {/* <li className="flex gap-2 justify-between">
                        <p>Phone #</p> <p></p>
                      </li> */}
                      <li className="flex gap-2 justify-between">
                        <p>Email</p> <p>{selectedEmployee.email}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Address</p> <p>{selectedEmployee.address}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#57A6C8] rounded-xl p-4 border-[#000000] border-[1px]">
                    <p className="text-2xl text-center">Work details</p>
                    <ul className="text-[16px]">
                      <li className="flex gap-2 justify-between">
                        <p>Employee id</p> <p>{selectedEmployee.id}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Joining date</p>{" "}
                        <p>{selectedEmployee.joined_date}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Job title</p> <p>{selectedEmployee.job_title}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Department</p>{" "}
                        <p>{selectedEmployee.employee_department?.name}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Seniority level</p>{" "}
                        <p>{selectedEmployee.position}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Branch</p> <p>{selectedEmployee.branch}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#BC9DF6] rounded-xl p-4 border-[#000000] border-[1px]">
                    <p className="text-2xl text-center">Salary Package</p>
                    <ul className="text-[16px]">
                      <li className="flex gap-2 justify-between">
                        <p>Base Salary</p> <p>{selectedEmployee.salary}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Commission</p> <p>{selectedEmployee.commission}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Overtime pay</p>{" "}
                        <p>{selectedEmployee.overtime_pay_rate}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Tax Rate</p> <p>{selectedEmployee.tax_rate}</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Payout freq.</p> <p>2</p>
                      </li>
                      <li className="flex gap-2 justify-between">
                        <p>Benefits provided</p>{" "}
                        <p>{selectedEmployee.benefits_offered}</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 flex flex-col lg:flex-row gap-8">
                  <div className="GoalTracking-table w-full lg:w-[66%] rounded-xl border-[#000000] border-[1px] overflow-hidden">
                    <div className="flex justify-between px-5 py-3">
                      <p className="text-2xl font-[500]">Goal Tracking</p>
                      <div className="w-full md:w-fit emplyee-selects">
                        <Select placeholder="Search" />
                      </div>
                    </div>
                    <div className="w-full studentTable">
                      <DataTable className="" />
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
                      <p>Goals </p>
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
      {isModalOpen && (
        <div
          className="modal is-active"
          id="payrollModal"
          style={{ marginTop: "80px" }}
        >
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="modal-card">
              <div className="columns is-mobile">
                <p className="modal-card-title">Welcome a new hire!</p>
                <button
                  className="delete"
                  aria-label="close"
                  id="closeModal"
                  onClick={onClose}
                ></button>
              </div>
              <section className="modal-card-body">
                <div
                  className="columns"
                  style={{ borderBottom: "1px dashed black" }}
                >
                  <div className="column">
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="name"
                          placeholder="Enter name"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">CNIC #</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="cnic"
                          placeholder="Enter CNIC number"
                          onChange={(e) => {
                            setCNIC(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Gender</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="gender"
                          placeholder="Specify gender"
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Phone#</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="phone"
                          placeholder="Enter Contact number"
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          id="email"
                          placeholder="Enter Email address"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Work Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          id="workemail"
                          onChange={(e) => {
                            setWorkEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            id="email"
                            placeholder="Enter Password"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Address</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="address"
                          placeholder="Add address"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  className="modal-card-title"
                  style={{ marginLeft: "0", marginBottom: "1rem" }}
                >
                  Work Details
                </p>
                <div
                  className="columns"
                  style={{ borderBottom: "1px dashed black" }}
                >
                  <div className="column">
                    <div className="field">
                      <label className="label" for="employeeId">
                        Employee ID
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="employeeId"
                          placeholder="Enter employee ID"
                          onChange={(e) => {
                            setEmployeeID(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="joiningDate">
                        Joining Date
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="date"
                          id="joiningDate"
                          onChange={(e) => {
                            setJoiningDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="branch">
                        Branch
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="branch"
                          placeholder="Enter branch"
                          onChange={(e) => {
                            setBranch(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="jobTitle">
                        Job Title
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="jobTitle"
                          placeholder="Enter job title"
                          onChange={(e) => {
                            setJobTitle(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label" for="department">
                        Department
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="department"
                          placeholder="Enter department"
                          onChange={(e) => {
                            setFormDepartmentName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="jobType">
                        Job Type
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="jobType"
                          placeholder="Enter job type"
                          onChange={(e) => {
                            setJobType(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="seniorityLevel">
                        Seniority Level
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="seniorityLevel"
                          placeholder="Enter seniority level"
                          onChange={(e) => {
                            setSeniorityLevel(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  className="modal-card-title"
                  style={{ marginLeft: "0", marginBottom: "1rem" }}
                >
                  Package Details
                </p>
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label" for="baseSalary">
                        Base Salary
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="baseSalary"
                          placeholder="Enter base salary"
                          onChange={(e) => {
                            setBaseSalary(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="commission">
                        Commission
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="commission"
                          placeholder="Enter commission"
                          onChange={(e) => {
                            setCommission(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="overtimePayrate">
                        Overtime Payrate
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="overtimePayrate"
                          placeholder="Enter overtime payrate"
                          onChange={(e) => {
                            setOvertimePayrate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="taxRate">
                        Tax Rate
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="taxRate"
                          placeholder="Enter tax rate"
                          onChange={(e) => {
                            setTaxRate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label" for="salaryPaymentDate">
                        Salary Payment Date
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="date"
                          id="salaryPaymentDate"
                          onChange={(e) => {
                            setSalaryPaymentDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="benefitsOffered">
                        Benefits Offered
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="benefitsOffered"
                          placeholder="Enter benefits offered"
                          onChange={(e) => {
                            setBenefitsOffered(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" for="paidLeaves">
                        No of Paid Leaves Offered
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="paidLeaves"
                          placeholder="Enter number of paid leaves offered"
                          onChange={(e) => {
                            setNoOfPaidLeaves(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="control">
                  <button className="button calcbtn" onClick={addEmployee}>
                    Save information
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeHero;
