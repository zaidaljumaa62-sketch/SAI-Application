import React, { useState } from "react";
import "../../../Pages_css/RemindersPage.css";
import BackButton from "../../../Compo/BackButton";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: "Submit weekly report",
      description: "Send weekly status to manager",
      deadline: "2025-06-26",
    },
  ]);
  const [sortOrder, setSortOrder] = useState("deadline-asc");
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const addReminder = (e) => {
    e.preventDefault();
    if (!form.title) return;
    setReminders((r) => [{ ...form, id: Date.now() }, ...r]);
    setForm({ title: "", description: "", deadline: "" });
  };

  const sortedReminders = [...reminders].sort((a, b) => {
    if (sortOrder === "deadline-asc")
      return new Date(a.deadline) - new Date(b.deadline);
    if (sortOrder === "deadline-desc")
      return new Date(b.deadline) - new Date(a.deadline);
    return 0;
  });

  return (
    <div className="page-wrap">
      <header className="header">
        <div className="back-wrapper">
          <BackButton />
        </div>
        <h2 className="page-title">Reminders</h2>
      </header>
      <main className="content">
        <form className="reminder-form" onSubmit={addReminder}>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
          />
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
          <button type="submit">Add</button>
        </form>

        <div className="filter-bar">
          <label>Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="deadline-asc">Deadline Ascending</option>
            <option value="deadline-desc">Deadline Descending</option>
          </select>
        </div>

        <div className="cards">
          {sortedReminders.map((r) => (
            <div key={r.id} className="card">
              <div className="card-title">{r.title}</div>
              <div className="card-deadline">{r.deadline}</div>
              <div className="card-desc">{r.description}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
