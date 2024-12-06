import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
const swal = require("sweetalert2");
function AddEmployee() {
  // Inline styles as JavaScript objects
  const bodyStyle = {
    backgroundColor: "#f5f5f5",
  };

  const boxStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "2rem",
    borderRadius: "8px",
    backgroundColor: "#fcfcfc",
    boxShadow:
      "0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)",
  };

  const inputStyle = {
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "100%",
  };

  const labelStyle = {
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  const fieldStyle = {
    marginBottom: "1rem",
  };

  const api = useAxios();
  const getDateTime = function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are zero-based, so add 1
    const day = now.getDate();

    // Get the current time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the date and time as desired
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return [formattedDate, formattedTime];
  };
  const { user } = useContext(AuthContext);

  const CreateEmployee = function () {
    const formData = new FormData();
    const date = getDateTime()[0];
    const time = getDateTime()[1];
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("username", email.split("@")[0]);
    formData.append("password", password);
    formData.append("password2", password);
    formData.append("level", level);
    formData.append("salary", salary);
    // formData.append("department", department);
    formData.append("profile_picture", profile_picture);
    formData.append("position", position);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("company_id", user.company);

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
          position: "top-right",
          showConfirmButton: false,
          showCancelButton: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [salary, setSalary] = useState("");
  const [profile_picture, setProfilePicture] = useState();
  const [position, setPosition] = useState("");

  return (
    <div style={bodyStyle}>
      <section className="section">
        <div className="container">
          <div className="box" style={boxStyle}>
            <div className="field" style={fieldStyle}>
              <label className="label" style={labelStyle}>
                Full Name
              </label>
              <div className="control">
                <input
                  className="input"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  style={inputStyle}
                  type="text"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="field" style={fieldStyle}>
              <label className="label" style={labelStyle}>
                Email
              </label>
              <div className="control">
                <input
                  className="input"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  style={inputStyle}
                  type="text"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="field" style={fieldStyle}>
              <label className="label" style={labelStyle}>
                Salary
              </label>
              <div className="control">
                <input
                  className="input"
                  style={inputStyle}
                  type="number"
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                  placeholder="Department"
                />
              </div>
            </div>
            <div className="field" style={fieldStyle}>
              <label className="label" style={labelStyle}>
                Profile Picture
              </label>
              <div className="control">
                <input
                  className="input"
                  onChange={(e) => {
                    setProfilePicture(e.target.files[0]);
                  }}
                  style={inputStyle}
                  type="file"
                  placeholder="Profile Picture"
                />
              </div>
            </div>
            <div className="field" style={fieldStyle}>
              <label className="label" style={labelStyle}>
                Position
              </label>
              <div className="control">
                <select
                  className="input"
                  style={inputStyle}
                  type="text"
                  placeholder="Position"
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                >
                  <option value={null}>None</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                </select>
              </div>
            </div>
            <div className="field" style={fieldStyle}>
              <label className="label" style={labelStyle}>
                Level
              </label>
              <div className="control">
                <select
                  className="input"
                  style={inputStyle}
                  type="text"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                  placeholder="Level"
                >
                  <option value={null}>None</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Contractor">Contractor</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
            </div>
            <div className="field" style={fieldStyle}>
              <label className="label" style={labelStyle}>
                Password
              </label>
              <div className="control">
                <input
                  className="input"
                  style={inputStyle}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  onClick={CreateEmployee}
                  className="button is-dark"
                  style={buttonStyle}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddEmployee;
