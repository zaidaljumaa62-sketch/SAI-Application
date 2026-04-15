import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Pages_css/TasksPage.css";
import BackButton from "../../../Compo/BackButton";
import { FaPlus } from "react-icons/fa";

export default function TasksPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy tasks
  const initialTasks = [
    {
      id: 1,
      description: "Onboard paperwork",
      deadline: "2025-07-01",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      description: "Intro meeting with team",
      deadline: "2025-06-22",
      priority: "Medium",
      completed: true,
    },
    {
      id: 3,
      description: "Set up workspace",
      deadline: "2025-06-21",
      priority: "Low",
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [sortOrder, setSortOrder] = useState("deadline-asc");
  const [form, setForm] = useState({
    description: "",
    deadline: "",
    priority: "Medium",
  });

  const addTask = (e) => {
    e.preventDefault();
    if (!form.description) return;
    const next = { ...form, id: Date.now(), completed: false };
    setTasks((t) => [next, ...t]);
    setForm({ description: "", deadline: "", priority: "Medium" });
  };

  const toggleComplete = (taskId) => {
    setTasks((t) =>
      t.map((x) => (x.id === taskId ? { ...x, completed: !x.completed } : x))
    );
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortOrder === "deadline-asc")
      return new Date(a.deadline) - new Date(b.deadline);
    if (sortOrder === "deadline-desc")
      return new Date(b.deadline) - new Date(a.deadline);
    if (sortOrder === "priority-asc")
      return a.priority.localeCompare(b.priority);
    if (sortOrder === "priority-desc")
      return b.priority.localeCompare(a.priority);
    return 0;
  });

  return (
    <div className="page-wrap">
      <header className="header">
        <div className="back-wrapper">
          <BackButton />
        </div>
        <h2 className="page-title">Tasks</h2>
      </header>

      <main className="content">
        <form className="task-form" onSubmit={addTask}>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Task description"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button type="submit" className="add-btn">
            <FaPlus /> Add
          </button>
        </form>

        <div className="filter-bar">
          <label>Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="deadline-asc">Deadline Ascending</option>
            <option value="deadline-desc">Deadline Descending</option>
            <option value="priority-asc">Priority Ascending</option>
            <option value="priority-desc">Priority Descending</option>
          </select>
        </div>

        <div className="tasks-list">
          {sortedTasks.map((t) => (
            <div
              key={t.id}
              className={`task-item ${t.completed ? "completed" : ""}`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t.id)}
                />
                <span className="desc">{t.description}</span>
              </label>
              <div className="meta">
                {t.deadline} • {t.priority}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
