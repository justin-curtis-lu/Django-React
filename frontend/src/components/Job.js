import React, { useState, useEffect } from "react";
import JobDataService from "../services/jobs.service";

const Job = props => {
  const initialJobState = {
    id: null,
    position: "",
    company: "",
    description: "",
    offer: false
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");

  const getJob = id => {
    JobDataService.get(id)
      .then(response => {
        setCurrentJob(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJob(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentJob({ ...currentJob, [name]: value });
  };

  const updateOffer = status => {
    var data = {
      id: currentJob.id,
      position: currentJob.position,
      company: currentJob.company,
      description: currentJob.description,
      offer: status
    };

    JobDataService.update(currentJob.id, data)
      .then(response => {
        setCurrentJob({ ...currentJob, offer: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateJob = () => {
    JobDataService.update(currentJob.id, currentJob)
      .then(response => {
        console.log(response.data);
        setMessage("The job was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteJob = () => {
    JobDataService.remove(currentJob.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/jobs");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentJob ? (
        <div className="edit-form">
          <h4>Job</h4>
          <form>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                className="form-control"
                id="company"
                name="company"
                value={currentJob.company}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentJob.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentJob.offer ? "Offer" : "Pending"}
            </div>
          </form>

          {currentJob.offer ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateOffer(false)}
            >
              Offer Status
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateOffer(true)}
            >
              Offer Status
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteJob}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateJob}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Job...</p>
        </div>
      )}
    </div>
  );
};

export default Job;
