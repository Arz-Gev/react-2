import { useState } from "react";
import "./App.css";
import { FileSource } from "@google/genai";

function App() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    complete: false,
    id: undefined,
  });

  function saveInput(e) {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  }

  function saveStatus() {
    setFormData((prev) => ({ ...prev, complete: !prev.complete }));
  }

  function deleteTask() {
    setShowInput("");
    if (formData.title === "") return;
    setTasks(tasks.filter((task, index) => index !== formData.id));
  }

  function saveTask() {
    setShowInput("");
    if (formData.title === "") return;
    if (formData.id === undefined) {
      formData.id = tasks.length;
      setTasks((prev) => [...prev, formData]);
      setFormData({ title: "", complete: false, id: undefined });
      return;
    }
    setTasks(
      tasks.map((task, index) => (index === formData.id ? formData : task))
    );
    setFormData({ title: "", complete: false, id: undefined });
  }

  function editTask(id) {
    setShowInput("show");
    setShowBtn("show-block");
    setFormData(tasks[id]);
  }

  const [showInput, setShowInput] = useState("");
  const [showBtn, setShowBtn] = useState("");

  return (
    <>
      <div className="sider">
        <button
          onClick={() => {
            setShowInput("show");
            setShowBtn("");
          }}
          className="add-task"
        >
          ADD NEW TASK
        </button>
        <form className={`form ${showInput}`}>
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
              className="option-btn show-block"
              type="button"
            >
              SAVE
            </button>
            <button
              onClick={deleteTask}
              className={`option-btn ${showBtn}`}
              type="button"
            >
              DELETE
            </button>
            <button
              onClick={saveStatus}
              className={`option-btn ${showBtn}`}
              type="button"
            >
              DONE
            </button>
          </div>
        </form>
        {tasks.map((task, index) => (
          <button
            onClick={() => {
              editTask(task.id);
            }}
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
