import React, { useState, useMemo } from "react";
import "../../../Pages_css/AttendancePage.css";
import BackButton from "../../../Compo/BackButton";

export default function AttendancePage() {
  // create dummy attendance for last 14 days
  const today = new Date();
  const makeDay = (offset) => {
    const d = new Date();
    d.setDate(today.getDate() - offset);
    const statuses = ["Present", "Absent", "Late"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hours = status === "Present" ? 8 : status === "Late" ? 6 : 0;
    return { date: d.toISOString().slice(0, 10), status, hours };
  };

  const initial = Array.from({ length: 14 }).map((_, i) => makeDay(i));
  const [data] = useState(initial);
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const summary = useMemo(() => {
    const s = { Present: 0, Absent: 0, Late: 0, hours: 0 };
    data.forEach((d) => {
      s[d.status]++;
      s.hours += d.hours;
    });
    return s;
  }, [data]);

  return (
    <div className="page-wrap">
      <header className="header">
        <div className="back-wrapper">
          <BackButton />
        </div>
        <h2 className="page-title">Attendance</h2>
      </header>
      <div className="filter-bar">
        <label>Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <main className="content">
        <div className="summary-bar">
          <div className="summary-item">
            <div>Present</div>
            <strong>{summary.Present}</strong>
          </div>
          <div className="summary-item">
            <div>Late</div>
            <strong>{summary.Late}</strong>
          </div>
          <div className="summary-item">
            <div>Absent</div>
            <strong>{summary.Absent}</strong>
          </div>
          <div className="summary-item">
            <div>Total hours</div>
            <strong>{summary.hours}</strong>
          </div>
        </div>

        <div className="calendar-grid">
          {sortedData.map((d) => (
            <div key={d.date} className={`day-card ${d.status.toLowerCase()}`}>
              <div className="d-date">{d.date}</div>
              <div className="d-status">{d.status}</div>
              <div className="d-hours">{d.hours}h</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
