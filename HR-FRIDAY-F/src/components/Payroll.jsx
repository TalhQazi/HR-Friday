import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../utils/useAxios";
import fridayImage from "./dashboardImages/friday.jpg";
import bellImage from "./dashboardImages/bell.jpg";
import messageImage from "./dashboardImages/message.jpg";
import womanImage from "./dashboardImages/woman.jpg";
import DownloadPDF from "./DownloadPDF";
import PDFDownload from "./PDFDownload";
import AuthContext from "../context/AuthContext";
const swal = require("sweetalert2");
function Payroll() {
  const { user, logoutUser } = useContext(AuthContext);
  const [isManager, setIsManager] = useState(false);
  const api = useAxios();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [hours, setHours] = useState("");
  const [bonus, setBonus] = useState("");
  const [deductions, setDeductions] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [payroll, setPayroll] = useState({});
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");
  const handlePaymentStatus = function (event) {
    setPaymentStatus(event.target.value);
  };
  const generatePayroll = async function () {
    const formData = new FormData();
    const myDate = date.split("-");
    const year = myDate[0];
    const month = myDate[1];
    const tax = Number(baseSalary) * (Number(taxRate) / 100);

    const total = Number(baseSalary) - tax - Number(deductions) + Number(bonus);
    formData.append("name", name);
    formData.append("month", month);
    formData.append("year", year);
    formData.append("base_salary", baseSalary);
    formData.append("overtime", hours);
    formData.append("bonus", bonus);
    formData.append("total", total);
    formData.append("deductions", deductions);
    formData.append("tax", taxRate);
    formData.append("status", paymentStatus);

    if (!baseSalary) {
      swal.fire({
        title: "Monthly Salary Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "top-right",
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
        position: "top-right",
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
        position: "top-right",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!hours) {
      swal.fire({
        title: "Hours OverWorked Cannot be Empty",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "top-right",
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
        position: "top-right",
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
        position: "top-right",
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
        position: "top-right",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    if (!paymentStatus) {
      swal.fire({
        title: "Select Payment Status",
        icon: "error",
        toast: true,
        timer: 5000,
        timerProgressBar: true,
        position: "top-right",
        showConfirmButton: false,
        showCancelButton: false,
      });
      return undefined;
    }
    api
      .post("main/create-payroll/", formData)
      .then((response) => {
        console.log(response.data);
        setPayroll(response.data);
        swal.fire({
          title: "Payroll Created Successfully",
          icon: "success",
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          position: "top-right",
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
  useEffect(() => {
    if (user.is_manager) {
      setIsManager(true);
    } else {
      logoutUser();
    }
  }, []);
  return (
    <div style={{ overflowX: "hidden", fontFamily: "Poppins" }}>
      {isManager ? (
        <section className="hero">
          <div
            className="hero-head"
            style={{ borderBottom: "black solid 1px" }}
          >
            <div className="container">
              <nav className="navbar">
                <div className="container">
                  <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                      <img
                        src={fridayImage}
                        alt="Logo"
                        height="250"
                        width="100"
                        style={{ maxHeight: "unset" }}
                      />
                    </a>
                    <input
                      className="input"
                      style={{
                        marginBlock: "0.51rem",
                        width: "20rem",
                        height: "70%",
                        border: "1px solid black",
                        borderRadius: "1rem",
                        marginLeft: "2.5rem",
                      }}
                      type="text"
                      placeholder="Search Anything"
                    />
                    <span
                      className="navbar-burger burger"
                      data-target="navbarMenu"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  <div id="navbarMenu" className="navbar-menu">
                    <div
                      className="navbar-end"
                      style={{ marginLeft: "auto", marginRight: "unset" }}
                    >
                      <span className="navbar-item">
                        <figure>
                          <img
                            style={{ paddingRight: "1rem" }}
                            src={bellImage}
                            alt=""
                          />
                        </figure>
                      </span>
                      <span className="navbar-item">
                        <figure>
                          <img
                            style={{ paddingRight: "1rem" }}
                            src={messageImage}
                            alt=""
                          />
                        </figure>
                      </span>

                      <span className="navbar-item">
                        <figure>
                          <img
                            style={{
                              maxHeight: "2.5rem",
                              width: "2.5rem",
                              borderRadius: "1.25rem",
                            }}
                            src={womanImage}
                            alt=""
                          />
                        </figure>
                      </span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div
            className="hero-body"
            style={{ padding: "1rem 2rem", flexDirection: "column" }}
          >
            <div className="container is-fluid">
              <div className="columns">
                {/* Sidebar */}
                <div className="column is-one-fifth sidebar">
                  <aside className="menu">
                    <p className="menu-label">Dashboard</p>
                    <ul className="menu-list">
                      <li>
                        <Link to={"/"}>Dashboard</Link>
                      </li>
                      <li>
                        <Link to={"/employees"}>Employees</Link>
                      </li>
                      <li>
                        <Link to={"/payroll"} className="is-active">
                          Payroll
                        </Link>
                      </li>
                      <li>
                        <a>Benefits</a>
                      </li>
                      <li>
                        <a>Requests</a>
                      </li>
                      <li>
                        <a>Performance</a>
                      </li>
                      <li>
                        <a>Trainings</a>
                      </li>
                      <li>
                        <a>Records</a>
                      </li>
                    </ul>
                    <p className="menu-label">Help</p>
                    <ul className="menu-list">
                      <li>
                        <a>Help Center</a>
                      </li>
                      <li>
                        <a>Settings</a>
                      </li>
                      <li>
                        <a>Logout</a>
                      </li>
                    </ul>
                  </aside>
                </div>
                {/* Main Content */}
                <div>
                  <div>
                    <div
                      className=""
                      style={{
                        display: "inline-flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* <div className="column is-12 clmn">
                      <h1>Payroll Data</h1>
                      <table>
                        <tr>
                          <th>
                            <b>Name</b>
                          </th>
                          <th>Date</th>
                          <th>Salary</th>
                          <th>Overtime</th>
                          <th>Bonus</th>
                          <th>Deduction</th>
                          <th>Total pay</th>
                          <th>Status</th>
                        </tr>

                        <tr>
                          <td>
                            <b></b>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <th></th>
                        </tr>
                      </table>
                    </div> */}
                      <div className="column is-12 clmn">
                        <h1>Payroll Calculator</h1>
                        <div className="columns">
                          <div className="column is-full">
                            <div className="field">
                              <label className="label">Name</label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="text"
                                  id="employeeName"
                                  onChange={(e) => {
                                    setName(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Date</label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="date"
                                  id="payrollDate"
                                  onChange={(e) => {
                                    setDate(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">
                                Monthly Salary ($)
                              </label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="number"
                                  id="monthlySalary"
                                  onChange={(e) => {
                                    setBaseSalary(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Hours Overworked</label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="number"
                                  id="hoursOverworked"
                                  onChange={(e) => {
                                    setHours(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Bonus ($)</label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="number"
                                  id="bonus"
                                  onChange={(e) => {
                                    setBonus(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Deductions ($)</label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="number"
                                  id="deductions"
                                  onChange={(e) => {
                                    setDeductions(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Tax Rate (%)</label>
                              <div className="control">
                                <input
                                  className="input"
                                  type="number"
                                  id="taxRate"
                                  onChange={(e) => {
                                    setTaxRate(e.target.value);
                                  }}
                                />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Payment Status</label>
                              <div className="control">
                                <label className="radio">
                                  <input
                                    type="radio"
                                    name="paymentStatus"
                                    value="paid"
                                    onChange={handlePaymentStatus}
                                  />
                                  Paid
                                </label>
                                <label className="radio">
                                  <input
                                    type="radio"
                                    name="paymentStatus"
                                    value="unpaid"
                                    onChange={handlePaymentStatus}
                                  />
                                  Unpaid
                                </label>
                              </div>
                            </div>
                            <div className="field">
                              <div className="control">
                                <button
                                  className="button is-primary"
                                  onClick={generatePayroll}
                                >
                                  Calculate
                                </button>
                              </div>
                            </div>
                          </div>
                          {!loading && <PDFDownload payroll={payroll} />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1>You don't have permission to view this page</h1>
      )}
    </div>
  );
}

export default Payroll;
