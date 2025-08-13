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

    setTasks(tasks.filter((task) => task.id !== formData.id));
    setFormData({ title: "", complete: false, id: undefined });
  }

  function saveTask() {
    setShowInput("");
    if (formData.title === "") return;
    if (formData.id === undefined) {
      const newTask = { ...formData, id: Date.now() };
      setTasks((prev) => [...prev, newTask]);
      setFormData({ title: "", complete: false, id: undefined });
      return;
    }
    setTasks(tasks.map((task) => (task.id === formData.id ? formData : task)));
    setFormData({ title: "", complete: false, id: undefined });
  }

  function editTask(id) {
    setShowInput("show");
    setShowBtn("show-block");
    const taskToEdit = tasks.find((task) => task.id === id);
    setFormData(taskToEdit);
  }

  function preventSubmit(e) {
    e.preventDefault();
  }

  const [showInput, setShowInput] = useState("");
  const [showBtn, setShowBtn] = useState("");
  const [backColor, setBackColor] = useState(false);

  function changeBackColor() {
    setBackColor((prev) => !prev);

    if (backColor) {
      document.documentElement.style.setProperty("--color", "255, 255, 255");
      document.documentElement.style.setProperty("--back", "0, 0, 0");
    } else {
      document.documentElement.style.setProperty("--color", "0, 0, 0");
      document.documentElement.style.setProperty("--back", "255, 255, 255");
    }
  }

  return (
    <div className={`background`}>
      <button
        onClick={() => {
          changeBackColor();
        }}
        className="color-switch"
        type="button"
      ></button>
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
        <form onSubmit={preventSubmit} className={`form ${showInput}`}>
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
    </div>
  );
}

export default App;
