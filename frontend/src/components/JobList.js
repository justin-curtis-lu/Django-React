import React, { useState, useEffect } from "react";
import JobDataService from "../services/jobs.service";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchPosition, setSearchPosition] = useState("");

  useEffect(() => {
    retrieveJobs();
  }, []);

  const onChangeSearchPosition = e => {
    const searchPosition = e.target.value;
    setSearchPosition(searchPosition);
  };

  const retrieveJobs = () => {
    JobDataService.getAll()
      .then(response => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveJobs();
    setCurrentJob(null);
    setCurrentIndex(-1);
  };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
  };

  const removeAllJobs = () => {
    JobDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByPosition = () => {
    JobDataService.findByPosition(searchPosition)
      .then(response => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by position"
            value={searchPosition}
            onChange={onChangeSearchPosition}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByPosition}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Jobs List</h4>

        <ul className="list-group">
          {jobs &&
            jobs.map((job, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveJob(job, index)}
                key={index}
              >
                {job.position}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllJobs}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <h4>Job</h4>
            <div>
              <label>
                <strong>Position:</strong>
              </label>{" "}
              {currentJob.position}
            </div>
            <div>
              <label>
                <strong>Company:</strong>
              </label>{" "}
              {currentJob.company}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentJob.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentJob.offer ? "Accepted" : "Pending"}
            </div>

            <Link
              to={"/jobs/" + currentJob.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
