import React, { useState } from "react";
import "../../../Pages_css/ReportsPage.css";
import BackButton from "../../../Compo/BackButton";

export default function ReportsPage() {
  const initial = [
    {
      id: 1,
      name: "Monthly Report - June",
      date: "2025-06-30",
      description: "Summary of June activities",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      name: "Performance Review",
      date: "2025-05-20",
      description: "Quarterly performance review",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const [reports] = useState(initial);
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedReports = [...reports].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="page-wrap">
      <header className="header">
        <div className="back-wrapper">
          <BackButton />
        </div>
        <h2 className="page-title">Reports</h2>
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
        <div className="reports-list">
          {sortedReports.map((r) => (
            <div key={r.id} className="report-card">
              <div className="title">{r.name}</div>
              <div className="meta">{r.date}</div>
              <div className="desc">{r.description}</div>
              <div className="actions">
                <button onClick={() => window.open(r.url, "_blank")}>
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
