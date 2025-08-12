import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { title: "start the task", complete: true },
    { title: "finish the task", complete: false },
  ]);

  const [formData, setFormData] = useState({ title: "", complete: false });

  function saveInput(e) {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
    console.log(formData.title);
  }

  function saveStatus() {
    setFormData((prev) => ({ ...prev, complete: !prev.complete }));
    console.log(formData.complete);
  }

  function saveTask() {
    if (formData.title === "") return;
    setTasks((prev) => [...prev, formData]);
    setFormData({ title: "", complete: false });
  }

  return (
    <>
      <div className={`sider ${close ? "open-slider" : ""}`}>
        <button className="add-task">ADD NEW TASK</button>
        <form className="form">
          <input
            onChange={saveInput}
            className="task-title"
            type="text"
            name=""
            placeholder="write your task"
            value={formData.title}
          />
          <div className="options">
            <button
              onClick={() => {
                saveTask();
              }}
              className="option-btn"
              type="button"
            >
              SAVE
            </button>
            <button className="option-btn" type="button">
              DELETE
            </button>
            <button onClick={saveStatus} className="option-btn" type="button">
              DONE
            </button>
          </div>
        </form>
        {tasks.map((task, index) => (
          <button
            key={index}
            className={`task ${task.complete ? "task-complete" : ""}`}
          >
            {task.title}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
