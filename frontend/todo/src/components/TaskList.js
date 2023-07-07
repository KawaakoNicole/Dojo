import React from "react";
import Task from "./Task";
import Progress from "./Progress";

function TaskList({ tasks, startEditing, strikeThrough, fetchTasks }) {
  let completed_task = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].completed === true) {
      completed_task = completed_task + 1;
    }
  }


  // Getting the details of the logged in user from local storage
  
    const details = localStorage.getItem("person");
    const JsontoPerson = JSON.parse(details);

  


  return (
    <div className="w-80 container">
      {/* This is for the progress bar */}
      <span className="me-3 fw-bold">Overall Progress</span>
      <Progress max={tasks.length} value={completed_task} color={"red"} />

      {JsontoPerson ? (
        <p className="text-center text-light p-2 bg-dark mt-3 rounded">
          {JsontoPerson.fname} {JsontoPerson.lname}'s list of tasks
        </p>
      ) : (
        <p className="text-center text-light p-2 bg-dark mt-3 rounded">
          My list of tasks
        </p>
      )}

      <div className="" id="item">
        {tasks
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((task) => (
            <Task
              tasktext={task.name}
              key={task.id}
              task={task}
          
              startEditing={startEditing}
              strikeThrough={strikeThrough}
              fetchTasks={fetchTasks}
            />
          ))}
      </div>
    </div>
  );
}

export default TaskList;
