import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";
// import TrainingTable from "../trainingTable";
import "./training_requests.css";
import TraningingTable from "../traingingTable";

const Seniority = [
  { value: "done", label: "done" },
  { value: "pending", label: "pending" },
  { value: "upcoming", label: "upcoming" },
];

const TrainingHero = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const { user } = useContext(AuthContext);
  const api = useAxios();
  const [trainings, setTrainings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowCalendar(false);
  };

  const handleIconClick = () => {
    setShowCalendar(true);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    api
      .get(`main/training-list/${user.company}/`)
      .then((response) => {
        setTrainings(
          response.data.map((training) => {
            return {
              id: training.id,
              Description: training.description,
              Deadline: training.deadline,
              Status: training.status,
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="bg-white px-4 pt-20 ">
        <h1 className="text-3xl md:text-4xl text-[#000000]">
          Employee Trainings
        </h1>

        <div className="flex flex-col md:flex-row gap-2 xl:gap-12">
          <div className="emplyee-selects bg-[#BC9DF6AD] py-2 px-4 my-4 font-[500] text-xl rounded-2xl w-full md:w-[75%] flex justify-between gap-2 lg:gap-4 xl:gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <label>Today’s Date:</label>
              <span className="ml-2">{formatDate(startDate)}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center">
              <div className="w-full md:w-fit">
                <Select placeholder="Filter By" options={Seniority} />
              </div>
            </div>
          </div>
          <button
            className="bg-[#BC9DF6] font-[500] py-2 px-2 my-4 text-lg rounded-2xl h-fit md:h-auto flex items-center justify-center gap-3 w-full md:w-[20%]"
            onClick={handleModalOpen}
          >
            Training Requests
          </button>
        </div>
      </div>
      <TraningingTable trainings={trainings} />
      {isModalOpen && (
        <div className="modal is-active" style={{ marginTop: "80px" }}>
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-content">
            <div className="modal-card">
              <div className="columns is-mobile">
                <p className="modal-card-title">Training Requests</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <section className="modal-card-body">
                <div className="columns is-mobile is-multiline">
                  <div className="column is-6">
                    <div className="leave-request">
                      <div className="leave-details">
                        <p>Emp_id: 001</p>
                        <p>Name: Muhammad Ishaq</p>
                        <p>Department: Software</p>
                        <p>
                          Description:
                          <strong>Need to take a mental health day.</strong>
                        </p>
                        <p>Priority: High</p>
                      </div>
                      <div className="leave-actions">
                        <button className="deny">Deny</button>
                        <button className="approve">Approve</button>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="leave-request">
                      <div className="leave-details">
                        <p>Emp_id: 001</p>
                        <p>Name: Muhammad Ishaq</p>
                        <p>Department: Software</p>
                        <p>
                          Description:
                          <strong>Need to take a mental health day.</strong>
                        </p>
                        <p>Priority: High</p>
                      </div>
                      <div className="leave-actions">
                        <button className="deny">Deny</button>
                        <button className="approve">Approve</button>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="leave-request">
                      <div className="leave-details">
                        <p>Emp_id: 001</p>
                        <p>Name: Muhammad Ishaq</p>
                        <p>Department: Software</p>
                        <p>
                          Description:
                          <strong>Need to take a mental health day.</strong>
                        </p>
                        <p>Priority: High</p>
                      </div>
                      <div className="leave-actions">
                        <button className="deny">Deny</button>
                        <button className="approve">Approve</button>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="leave-request">
                      <div className="leave-details">
                        <p>Emp_id: 001</p>
                        <p>Name: Muhammad Ishaq</p>
                        <p>Department: Software</p>
                        <p>
                          Description:
                          <strong>Need to take a mental health day.</strong>
                        </p>
                        <p>Priority: High</p>
                      </div>
                      <div className="leave-actions">
                        <button className="deny">Deny</button>
                        <button className="approve">Approve</button>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="leave-request">
                      <div className="leave-details">
                        <p>Emp_id: 001</p>
                        <p>Name: Muhammad Ishaq</p>
                        <p>Department: Software</p>
                        <p>
                          Description:
                          <strong>Need to take a mental health day.</strong>
                        </p>
                        <p>Priority: High</p>
                      </div>
                      <div className="leave-actions">
                        <button className="deny">Deny</button>
                        <button className="approve">Approve</button>
                      </div>
                    </div>
                  </div>
                  <div className="column is-6">
                    <div className="leave-request">
                      <div className="leave-details">
                        <p>Emp_id: 001</p>
                        <p>Name: Muhammad Ishaq</p>
                        <p>Department: Software</p>
                        <p>
                          Description:
                          <strong>Need to take a mental health day.</strong>
                        </p>
                        <p>Priority: High</p>
                      </div>
                      <div className="leave-actions">
                        <button className="deny">Deny</button>
                        <button className="approve">Approve</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrainingHero;
