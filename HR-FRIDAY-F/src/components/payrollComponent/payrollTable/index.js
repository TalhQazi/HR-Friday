import React, { useState } from "react";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Id",
    selector: (row) => row.id,
    maxWidth: "80px",
  },
  {
    name: "Name",
    selector: (row) => row.Name,
  },
  {
    name: "Role",
    selector: (row) => row.Role,
  },
  {
    name: "Hours worked",
    selector: (row) => row.hours,
  },
  {
    name: "Payslip made",
    selector: (row) => row.payslip,
    cell: (row) => (
      <div
        className={`payslip-cell ${
          row.payslip.toLowerCase() === "yes"
            ? "bg-[#91D27A] text-center py-1 px-2 rounded-full w-24"
            : "text-center w-24 bg-[#F32F2F] py-1 px-2 rounded-full"
        }`}
      >
        {row.payslip}
      </div>
    ),
  },

  {
    name: "Status",
    cell: (row) => (
      <div
        className={`status-cell ${
          row.Status.toLowerCase() === "yes" ||
          row.Status.toLowerCase() === "paid"
            ? "bg-[#91D27A] text-center py-1 px-2 rounded-full w-24"
            : "text-center w-24 bg-[#F32F2F] py-1 px-2 rounded-full"
        }`}
      >
        {row.Status}
      </div>
    ),
    selector: (row) => row.Status,
  },
];

const data = [
  {
    id: "1",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "yes",
  },
  {
    id: "2",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "yes",
  },
  {
    id: "3",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "No",
    Status: "yes",
  },
  {
    id: "4",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "No",
    Status: "yes",
  },
  {
    id: "5",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "no",
  },
  {
    id: "6",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "yes",
  },
  {
    id: "7",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "No",
  },

  {
    id: "8",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "yes",
  },
  {
    id: "9",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "no",
    Status: "yes",
  },
  {
    id: "10",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "paid",
  },
  {
    id: "11",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "paid",
  },
  {
    id: "12",
    Name: "Zara",
    Role: "Marketing Manager  ",
    hours: "10 Hours",
    payslip: "yes",
    Status: "paid",
  },
];

const PayrollTable = ({ tableData }) => {
  return (
    <div className="bg-white px-3 pt-4 pb-6">
      <div className="employee-data-table w-full border-[1px] border-[#000000] rounded-3xl overflow-hidden">
        <DataTable className="" columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default PayrollTable;
