import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";
import AttendanceTable from "../AttendanceTable";
// import "bulma/css/bulma.min.css";
import "./leave_requests.css";

const AttendanceHero = () => {
  const swal = require("sweetalert2");
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [absentEmployees, setAbsentEmployees] = useState([]);
  const [onLeaveEmployees, setOnLeaveEmployees] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const handleDateChange = (date) => {
    setStartDate(date);
    setShowCalendar(false);
  };

  const handleIconClick = () => {
    setShowCalendar(true);
  };

  const handleModalToggle = () => {
    setModalActive(!modalActive);
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const api = useAxios();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    api
      .get(`main/leave-applications-list/${user.company}/`)
      .then((response) => {
        setLeaveRequests(response.data);
      });
  }, []);
  useEffect(() => {
    api
      .get(`main/employee-attendance/${user.company}/${formatDate(startDate)}/`)
      .then((response) => {
        const employees = response.data;
        setEmployees(employees);

        const present = [];
        const absent = [];
        const onLeave = [];

        employees.forEach((employee) => {
          const attendanceStatus =
            employee.attendance && employee.attendance.length > 0
              ? employee.attendance[0].status
              : "Absent";

          if (attendanceStatus === "Present") {
            present.push(employee);
          } else if (attendanceStatus === "Leave") {
            onLeave.push(employee);
          } else if (attendanceStatus === "Absent") {
            absent.push(employee);
          }
        });
        setTableData(
          response.data.map((employee) => {
            return {
              id: employee.id,
              Name: employee.full_name,
              Role: employee.position,
              InTime:
                employee.attendance.length > 0
                  ? employee.attendance[0].time
                  : "NA",
              Outtime:
                employee.attendance.length > 0 &&
                employee.attendance[0]?.checkout
                  ? employee.attendance[0].checkout
                  : "NA",
              Hoursworked:
                employee.attendance.length > 0 &&
                employee.attendance[0]?.hours_worked
                  ? employee.attendance[0].hours_worked
                  : "Not Checked Out",
              Status:
                employee.attendance.length > 0
                  ? employee.attendance[0].status
                  : "NA",
            };
          })
        );

        setPresentEmployees(present);
        setOnLeaveEmployees(onLeave);
        setAbsentEmployees(absent);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [startDate]);
  const CreateLeave = (leave) => {
    const formData = new FormData();

    formData.append("employee", leave.employee.id);
    formData.append("status", "Leave");
    formData.append("date", leave.from_date);
    formData.append("date", leave.from_date);
    formData.append("time", "00:00:00");
    formData.append("company", leave.company.id);
    formData.append("checkout", "00:00:00");
    formData.append("hours_worked", null);
    api
      .post(`main/create-attendance/`, formData)
      .then((response) => {
        window.location.href = "/attendance";
        swal.fire({
          title: "Leave Approved",
          icon: "success",
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          position: "center",
          showConfirmButton: false,
          showCancelButton: false,
        });
      })
      .then((response) => {
        api.delete(`main/delete-leave-applications/${leave.id}/`);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  const DeleteAppliaction = (leave) => {
    api
      .delete(`main/delete-leave-applications/${leave.id}/`)
      .then((response) => {
        window.location.href = "/attendance";
      });
  };

  return (
    <>
      <div className="bg-white px-4 pt-20 ">
        <h1 className="text-2xl md:text-3xl text-[#000000]">
          Attendance and Leave Management
        </h1>

        <div className="flex flex-col md:flex-row gap-2 xl:gap-12">
          <div className="emplyee-selects bg-[#BC9DF6AD] py-2 px-4 my-4 font-[500] text-xl rounded-2xl w-full md:w-[75%] flex justify-between gap-2 lg:gap-4 xl:gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <label>Today’s Date:</label>
              <span className="ml-2">{formatDate(startDate)}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <label>Filter by date:</label>
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
            onClick={handleModalToggle}
          >
            Leave Requests
          </button>
        </div>

        <div className="emplyee-cards pt-3 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
          <div className="Empl-single-card bg-white py-2 px-6 rounded-[30px] flex justify-between items-center gap-4">
            <p className="text-xl">Total employees</p>
            <p className="text-4xl">{employees.length}</p>
          </div>
          <div className="Empl-single-card py-2 px-6 rounded-[30px] bg-[#91D27A] flex justify-between items-center gap-4">
            <p className="text-xl">Present</p>
            <p className="text-4xl">{presentEmployees.length}</p>
          </div>
          <div className="Empl-single-card py-2 px-6 bg-[#D53C3C] rounded-[30px] flex justify-between items-center gap-4">
            <p className="text-xl">Absent</p>
            <p className="text-4xl">{absentEmployees.length}</p>
          </div>
          <div className="Empl-single-card py-2 px-6 bg-[#7C97E8] rounded-[30px] flex justify-between items-center gap-4">
            <p className="text-xl">On-leave</p>
            <p className="text-4xl">{onLeaveEmployees.length}</p>
          </div>
        </div>
      </div>
      {!loading && <AttendanceTable tableData={tableData} />}

      <div
        className={`modal ${modalActive ? "is-active" : ""}`}
        style={{ marginTop: "80px" }}
        id="payrollModal"
      >
        <div className="modal-background" onClick={handleModalToggle}></div>
        <div className="modal-content">
          <div className="modal-card">
            <div className="columns is-mobile">
              <p className="modal-card-title">Leave Requests</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalToggle}
              ></button>
            </div>
            <section className="modal-card-body">
              <div className="columns is-mobile is-multiline">
                {leaveRequests.map((leave, index) => (
                  <div className="column is-6" key={index}>
                    <div className="leave-request">
                      <div className="leave-details">
                        <p>
                          <strong>Emp_id:</strong> {leave.employee.id}
                        </p>
                        <p>
                          <strong>Name:</strong> {leave.employee.full_name}
                        </p>
                        <p>
                          <strong>Department:</strong> {leave.department.name}
                        </p>
                        <p>
                          <strong>From:</strong> {leave.from_date}
                        </p>
                        <p>
                          <strong>To:</strong> {leave.to_date}
                        </p>
                        <p>
                          <strong>Reason:</strong> {leave.reason}
                        </p>
                        <p>
                          <strong>Paid leaves left:</strong>{" "}
                          {leave.employee.no_of_paid_leaves}
                        </p>
                      </div>
                      <div className="leave-actions">
                        <button
                          className="deny"
                          onClick={(e) => {
                            DeleteAppliaction(leave);
                          }}
                        >
                          Deny
                        </button>
                        <button
                          className="approve"
                          onClick={(e) => {
                            CreateLeave(leave);
                          }}
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceHero;
