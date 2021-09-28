import React, { useState } from "react";
import JobDataService from "../services/jobs.service";

const AddJob = () => {
  const initialJobState = {
    id: null,
    position: "",
    company: "",
    description: "",
    offer: false
  };
  const [job, setJob] = useState(initialJobState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const saveJob = () => {
    var data = {
      position: job.position,
      company: job.company,
      description: job.description
    };

    JobDataService.create(data)
      .then(response => {
        setJob({
          id: response.data.id,
          company: response.data.company,
          position: response.data.position,
          description: response.data.description,
          offer: response.data.offer
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newJob = () => {
    setJob(initialJobState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newJob}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              required
              value={job.company}
              onChange={handleInputChange}
              name="company"
            />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input
              type="text"
              className="form-control"
              id="position"
              required
              value={job.position}
              onChange={handleInputChange}
              name="position"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={job.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveJob} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddJob;