import React from "react";

function Form({handleDate, handleText, handleSubmit }) {
  

  return (
    <div className="container w-50 mt-5">
      <h2 className="text-center">NICOLE TODO </h2>
      <form action="" method="" className="form" onSubmit={handleSubmit}>
        <input
          onChange={handleText}
          type="text"
          name="taskname"
          id=""
          value={this.state.activeItem.name}
          className="form-control"
          placeholder="Enter task here....."
        />
        <div className="row">
          <div className="col-12">
            <label for="" className="form-label mt-2 fs-bold fw-5 mb-0">
              Expiry date
            </label>
            <input
              onChange={handleDate}
              type="date"
              name="date"
              value={this.state.activeItem.deadline}
              id=""
              placeholder="Enter the task expiry date here..."
              className="form-control"
            />
          </div>
        </div>
        <button
          className="btn btn-primary mt-3"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Form;
