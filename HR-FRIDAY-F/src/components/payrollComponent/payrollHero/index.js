import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import PayrollTable from "../payrollTable";
import "../../payroll_calculator.css";
import { useNavigate } from "react-router-dom";

const PayrollHero = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const handleDateChange = (date) => {
    setStartDate(date);
    setShowCalendar(false);
  };

  const handleIconClick = () => {
    setShowCalendar(true);
  };

  const handleGeneratePaySlipClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const swal = require("sweetalert2");
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [paidEmplyees, setPaidEmployees] = useState([]);
  const [unPaidEmplyees, setUnPaidEmployees] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [payrollsMade, setPayrollsMade] = useState("");

  useEffect(() => {
    api
      .get(
        `main/employee-payrolls-list/${user.company}/${formatDate(startDate)}/`
      )
      .then((response) => {
        setEmployees(response.data);
        setPaidEmployees(
          response.data.filter((employee) => {
            return (
              employee.payroll.length > 0 &&
              employee.payroll[employee.payroll.length - 1].status === "yes"
            );
          })
        );
        setUnPaidEmployees(
          response.data.filter((employee) => {
            return (
              employee.payroll.length > 0 &&
              employee.payroll[employee.payroll.length - 1].status === "No"
            );
          })
        );
        setTableData(
          response.data.map((employee) => {
            return {
              id: employee.id,
              Name: employee.full_name,
              Role: employee.position,
              hours: employee.hours,
              payslip: employee.payroll.length > 0 ? "yes" : "No",
              Status:
                employee.payroll.length > 0 &&
                employee.payroll[employee.payroll.length - 1].status === "yes"
                  ? "Paid"
                  : "Unpaid",
            };
          })
        );
      });
  }, [startDate]);
  useEffect(() => {
    api
      .get(`main/payroll-monthly/${user.company}/${formatDate(startDate)}/`)
      .then((response) => {
        setPayrollsMade(response.data);
      });
  }, [startDate]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimePayrate, setOvertimePayrate] = useState("");
  const [bonus, setBonus] = useState("");
  const [deductions, setDeductions] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [payroll, setPayroll] = useState({});
  const [loading, setLoading] = useState(true);
  const [commissions, setCommissions] = useState([]);

  const generatePayroll = async function () {
    const formData = new FormData();

    const tax = Number(basicSalary) * (Number(taxRate) / 100);

    const total =
      Number(basicSalary) - tax - Number(deductions) + Number(bonus);
    formData.append("name", name);
    formData.append("basic_salary", basicSalary);
    formData.append("overtime", overtimeHours);
    formData.append("overtime_pay_rate", overtimePayrate);
    formData.append("bonus", bonus);
    formData.append("total", total);
    formData.append("deductions", deductions);
    formData.append("tax", taxRate);
    formData.append("status", "No");
    formData.append("date", date);
    formData.append("commissions", commissions);
    formData.append("company", user.company);

    if (!basicSalary) {
      swal.fire({
        title: "Monthly Salary Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center-start",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!deductions) {
      swal.fire({
        title: "Deductions Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center-start",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!date) {
      swal.fire({
        title: "Date Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center-start",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!overtimeHours) {
      swal.fire({
        title: "Hours OverWorked Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center-start",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!bonus) {
      swal.fire({
        title: "Bonus Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center-start",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!tax) {
      swal.fire({
        title: "Tax Rate Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center-start",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!name) {
      swal.fire({
        title: "Name Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "center-start",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }

    api
      .post(`main/create-payroll/`, formData)
      .then((response) => {
        console.log(response.data);
        setPayroll(response.data);
        navigate(`/payslip/${user.company}/${response.data.id}`);
        swal.fire({
          title: "Payroll Created Successfully",
          icon: "success",
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          position: "center",
          showConfirmButton: false,
          showCancelButton: false,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
        swal.fire({
          title: error.response.data.error,
          icon: "error",
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          position: "top-right",
          showConfirmButton: false,
          showCancelButton: false,
        });
      });
  };
  return (
    <>
      <div className="bg-white px-4 pt-20 ">
        <h1 className="text-2xl md:text-3xl text-[#000000]">
          Payroll Management
        </h1>

        <div className="flex flex-col md:flex-row gap-2 xl:gap-12">
          <div className="emplyee-selects bg-[#BC9DF6AD] py-2 px-4 my-4 font-[500] text-xl rounded-2xl w-full md:w-[75%] flex justify-between gap-2 lg:gap-4 xl:gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <label>Current Month</label>
              <span className="ml-2">{formatDate(startDate)}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <label>Filter by month</label>
              <div className="flex items-center gap-2 relative">
                <span className="cursor-pointer" onClick={handleIconClick}>
                  <svg
                    width="28"
                    height="40"
                    viewBox="0 0 39 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.0544566 0V12.5085H38.1741V0H0.0544566ZM0.0544566 18.7628V49.4711C0.0544566 49.7839 0.272283 50.034 0.544566 50.034H37.6295C37.9018 50.034 38.1196 49.7839 38.1196 49.4711V18.7628H0H0.0544566ZM5.50012 25.017H10.9458V31.2713H5.50012V25.017ZM16.3914 25.017H21.8371V31.2713H16.3914V25.017ZM27.2828 25.017H32.7284V31.2713H27.2828V25.017ZM5.50012 37.5255H10.9458V43.7798H5.50012V37.5255ZM16.3914 37.5255H21.8371V43.7798H16.3914V37.5255Z"
                      fill="black"
                    />
                  </svg>
                </span>
                {showCalendar && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: "-30px",
                      zIndex: 1,
                    }}
                  >
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      inline={true}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            className="bg-[#BC9DF6] font-[500] py-2 px-2 my-4 text-lg rounded-2xl h-fit md:h-auto flex items-center justify-center gap-3 w-full md:w-[20%]"
            onClick={handleGeneratePaySlipClick}
          >
            Generate Pay slip
          </button>
        </div>

        <div className="emplyee-cards pt-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
          <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
            <p className="text-xl">Total employees</p>
            <p className="text-4xl">{employees.length}</p>
          </div>
          <div className="Empl-single-card py-2 px-6 rounded-[30px] bg-[#91D27A] flex justify-between items-center gap-4">
            <p className="text-xl">Paid</p>
            <p className="text-4xl">{paidEmplyees.length}</p>
          </div>
          <div className="Empl-single-card py-2 px-6 bg-[#D53C3C] rounded-[30px] flex justify-between items-center gap-4">
            <p className="text-xl">Unpaid</p>
            <p className="text-4xl">{unPaidEmplyees.length}</p>
          </div>
          <div className="Empl-single-card py-2 px-6 bg-[#7C97E8] rounded-[30px] flex justify-between items-center gap-4">
            <p className="text-xl">Pay slips made</p>
            <p className="text-4xl">{payrollsMade.length}</p>
          </div>
        </div>
      </div>
      <PayrollTable tableData={tableData} />
      {isModalOpen && (
        <div
          className="modal is-active"
          style={{ zIndex: "1000", marginTop: "85px" }}
        >
          <div className="modal-background" onClick={handleCloseModal}></div>
          <div className="modal-content">
            <div className="modal-card">
              <div className="columns is-mobile">
                <p className="modal-card-title">Payroll Calculator</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <section className="modal-card-body">
                <div className="columns">
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
                      <label className="label">Basic Salary</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="basicSalary"
                          placeholder="Enter basic salary"
                          onChange={(e) => {
                            setBasicSalary(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Overtime Hours</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="overtimeHours"
                          placeholder="Enter overtime hours"
                          onChange={(e) => {
                            setOvertimeHours(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Overtime pay-rate</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="overtimePayRate"
                          placeholder="Enter overtime pay-rate"
                          onChange={(e) => {
                            setOvertimePayrate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Deductions</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="deductions"
                          placeholder="Enter deductions"
                          onChange={(e) => {
                            setDeductions(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Date</label>
                      <div className="control">
                        <input
                          className="input"
                          type="date"
                          id="date"
                          onChange={(e) => {
                            setDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Commissions</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="commissions"
                          placeholder="Enter commissions"
                          onChange={(e) => {
                            setCommissions(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Bonus</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="bonus"
                          placeholder="Enter bonus"
                          onChange={(e) => {
                            setBonus(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Tax-Rate</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          id="taxes"
                          placeholder="Enter taxes"
                          onChange={(e) => {
                            setTaxRate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="control">
                  <button className="button calcbtn" onClick={generatePayroll}>
                    Generate PaySlip
                  </button>
                </div>
              </section>
              <div
                className="columns is-mobile"
                style={{
                  display: "inline-flex",
                  flexDirection: "row",
                  paddingBottom: "2rem",
                }}
              >
                <a className="lastbtns" onClick="resetForm()">
                  <p>Reset</p>
                </a>
                <a className="lastbtns" onClick="shareWithEmployee()">
                  <p>Share with employee</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PayrollHero;
