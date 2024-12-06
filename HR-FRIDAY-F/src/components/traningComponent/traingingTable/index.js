import React, { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import useAxios from "../../../utils/useAxios";
import AuthContext from "../../../context/AuthContext";

const columns = [
  {
    name: "#",
    selector: (row) => row.id,
    maxWidth: "10px",
  },
  {
    name: "Description",
    selector: (row) => row.Description,
    maxWidth: "500px",
  },
  {
    name: "Deadline",
    selector: (row) => row.Deadline,
    maxWidth: "170px",
  },
  {
    name: "Status",
    cell: (row) => (
      <div
        className={`status-cell ${
          row.Status.toLowerCase() === "done" ||
          row.Status.toLowerCase() === "paid"
            ? "bg-[#91D27A] text-center py-1 px-2 rounded-full w-38"
            : row.Status.toLowerCase() === "upcoming"
            ? "bg-[#57A6C8] text-center py-1 px-2 rounded-full w-38"
            : "bg-[#F32F2F] text-center py-1 px-2 rounded-full w-38"
        }`}
      >
        {row.Status}
      </div>
    ),
    selector: (row) => row.Status,
    maxWidth: "180px",
    
  },
];

const initialFormData = {
  id: "",
  Description: "",
  Deadline: "",
  Status: "",
};

const TraningingTable = ({ trainings }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(trainings);
  const swal = require("sweetalert2");
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: (data.length + 1).toString(),
    };
    setData([...data, newEntry]);
    setFormData(initialFormData);
    saveTraining();
  };
  const saveTraining = () => {
    const myformData = new FormData();
    myformData.append("description", formData.Description);
    myformData.append("company", user.company);
    myformData.append("deadline", formData.Deadline);
    myformData.append("status", formData.Status);
    api
      .post(`main/training-list/${user.company}/`, myformData)
      .then((response) => {
        window.location.href = "/trainings";
        swal.fire({
          title: "Added Succussfully",
          icon: "success",
          toast: true,
          timer: 5000,
          timerProgressBar: true,
          position: "center",
          showConfirmButton: false,
          showCancelButton: false,
        });
      });
  };

  return (
    <div className="flex flex-col xl:flex-row px-3 gap-6 pb-6">
      <div className="bg-white pb-6 w-full xl:w-[70%]">
        <div className="employee-data-table w-full border-[1px] border-[#000000] rounded-3xl overflow-hidden">
          <DataTable className="" columns={columns} data={trainings} />
        </div>
      </div>

      <div className="emplyee-selects mx-auto p-4 w-full md:w-[40%] xl:w-[30%] h-fit border-[1px] bg-[white] border-[#000000] rounded-3xl overflow-hidden">
        <h3 className="text-2xl font-[600]">Schedule new session</h3>

        <form className="pt-2" onSubmit={handleFormSubmit}>
          <div className="flex flex-col mb-4">
            <label className="text-lg font-[500]">Description</label>
            <input
              className="py-2 px-5 rounded-xl border-black border-2"
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg font-[500]">Deadline</label>
            <input
              className="py-2 px-5 rounded-xl border-black border-2"
              type="date"
              name="Deadline"
              value={formData.Deadline}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-lg font-[500]">Status</label>
            <input
              className="py-2 px-5 rounded-xl border-black border-2"
              type="text"
              name="Status"
              value={formData.Status}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-center pt-2">
            <button className="py-2 px-6 rounded-xl bg-[#BC9DF6] text-black font-[500]">
              Add to list
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TraningingTable;
