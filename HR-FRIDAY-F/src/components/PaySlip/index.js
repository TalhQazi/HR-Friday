import React from "react";

const Payslip = ({ paySlipData }) => {
  const payslipStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #000",
    backgroundColor: "#fff",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
    textAlign: "center",
    textTransform: "uppercase",
  };

  const boxStyle = {
    marginBottom: "20px",
  };

  const tableStyle = {
    marginBottom: "20px",
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  const tdStyle = {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div style={payslipStyle} className="payslip box" id="payslip">
      <h1 style={titleStyle}>
        Payslip - {paySlipData.employee.full_name} - {paySlipData.date}
      </h1>
      <div className="columns">
        <div className="column">
          <div style={boxStyle} className="box">
            <h2 className="subtitle">Company Details</h2>
            <p>
              <strong>Company Name:</strong> {paySlipData.company.name}
            </p>
            <p>
              <strong>Address:</strong> 123 Business Rd, Business City, BC 12345
            </p>
            <p>
              <strong>Email:</strong> info@friday.com
            </p>
            <p>
              <strong>Phone:</strong> +92-344-1010960
            </p>
          </div>
        </div>
        <div className="column">
          <div style={boxStyle} className="box">
            <h2 className="subtitle">Employee Details</h2>
            <p>
              <strong>Employee Name:</strong>{" "}
              <span id="emp_name">{paySlipData.employee.full_name}</span>
            </p>
            <p>
              <strong>Employee ID:</strong> {paySlipData.employee.id}
            </p>
            <p>
              <strong>Department:</strong>

              {paySlipData.employee.employee_department?.name}
            </p>
            <p>
              <strong>Designation:</strong> {paySlipData.employee.position}
            </p>
          </div>
        </div>
      </div>
      <div style={boxStyle} className="box">
        <h2 className="subtitle">Pay Details</h2>
        <table style={tableStyle} className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>Basic Salary</td>
              <td style={tdStyle}>${paySlipData.basic_salary}</td>
            </tr>
            <tr>
              <td style={tdStyle}>Overtime pay Rate</td>
              <td style={tdStyle}>${paySlipData.overtime_pay_rate}</td>
            </tr>
            <tr>
              <td style={tdStyle}>Commissions</td>
              <td style={tdStyle}>${paySlipData.commissions}</td>
            </tr>
            <tr>
              <td style={tdStyle}>Deductions</td>
              <td style={tdStyle}>-${paySlipData.deductions}</td>
            </tr>
            <tr>
              <td style={tdStyle}>Tax Rate</td>
              <td style={tdStyle}>-${paySlipData.tax}</td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: "bold" }}>Gross Pay</td>
              <td style={{ ...tdStyle, fontWeight: "bold" }}>
                ${Number(paySlipData.total) + 1000}
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, fontWeight: "bold" }}>Net Pay</td>
              <td style={{ ...tdStyle, fontWeight: "bold" }}>
                ${paySlipData.total}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="columns">
        <div className="column">
          <div style={boxStyle} className="box">
            <p>
              <strong>Pay Date:</strong> {paySlipData.date}
            </p>
            <p>
              <strong>Authorized By:</strong> HR Manager
            </p>
          </div>
        </div>
        <div className="column">
          <div style={boxStyle} className="box">
            <p>
              <strong>Employee Signature:</strong> ____________________
            </p>
            <p>
              <strong>Employer Signature:</strong> ____________________
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payslip;
