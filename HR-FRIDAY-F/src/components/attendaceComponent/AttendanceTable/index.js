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
    maxWidth: "200px",
  },
  {
    name: "Role",
    selector: (row) => row.Role,
    maxWidth: "300px",
  },
  {
    name: "In-Time",
    selector: (row) => row.InTime,
    maxWidth: "300px",
  },
  {
    name: "Out-time",
    selector: (row) => row.Outtime,
    maxWidth: "300px",
  },
  {
    name: "Hours worked",
    selector: (row) => row.Hoursworked,
    minWidth: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.Status,
  },
];

const data = [
  {
    id: "1",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "2",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "3",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "4",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "5",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "6",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "7",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },

  {
    id: "8",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "9",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "10",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "11",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
  {
    id: "12",
    Name: "Zara",
    Role: "Marketing Manager  ",
    InTime: "14-6-2022 06:30 AM",
    Outtime: "14-6-2022 06:30 AM",
    Hoursworked: "10 hours",
    Status: "Present",
  },
];

const AttendanceTable = ({ tableData }) => {
  return (
    <div className="bg-white px-3 pt-4 pb-6">
      <div className="employee-data-table w-full border-[1px] border-[#000000] rounded-3xl overflow-hidden">
        <DataTable className="" columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default AttendanceTable;
