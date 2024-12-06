import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

function ApplyForLeave() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "20px auto",
  };

  const titleStyle = {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  };

  const labelStyle = {
    marginBottom: "10px",
    color: "#666",
    fontSize: "16px",
    alignSelf: "flex-start",
  };

  const textareaStyle = {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    resize: "none",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    alignSelf: "flex-start",
  };
  const swal = require("sweetalert2");
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const submitApplication = function () {
    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("date", date);
    formData.append("employee", user.employee_id);
    formData.append("company", user.company);
    api
      .post(`main/apply-for-leave/`, formData)
      .then((response) => {
        swal.fire({
          title: "Application Sent Succussfully",
          icon: "succuss",
        });
      })
      .catch((error) => {
        swal.fire({
          title: "Something Went Wrong",
          icon: "error",
        });
      });
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Apply For Leave</h1>
      <label style={labelStyle} htmlFor="reason">
        Reason
      </label>
      <textarea
        id="reason"
        style={textareaStyle}
        onChange={(e) => {
          setReason(e.target.value);
        }}
      />
      <label style={labelStyle} htmlFor="date">
        Date
      </label>
      <input
        id="date"
        type="date"
        style={inputStyle}
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <button style={buttonStyle} onClick={submitApplication}>
        Submit
      </button>
    </div>
  );
}

export default ApplyForLeave;
