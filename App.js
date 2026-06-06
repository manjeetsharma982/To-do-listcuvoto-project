import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    if (editId !== null) {
      // Update task
      setTasks(
        tasks.map((item) =>
          item.id === editId ? { ...item, text: task } : item
        )
      );
      setEditId(null);
    } else {
      // Add new task
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: task,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const editTask = (item) => {
    setTask(item.text);
    setEditId(item.id);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTask(item.id)}
            />

            <span className={item.completed ? "completed" : ""}>
              {item.text}
            </span>

            <div>
              <button onClick={() => editTask(item)}>Edit</button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;