// src/Pages/HR/Interns/InternsList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../Compo/SearchBar"; // Adjust path if needed
import "../../../Pages_css/InternsHome.css"; // New CSS file
import BackButton from "../../../Compo/BackButton";
// Simulate async fetch from DB
const fetchInternsFromDB = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        [
          { id: 1, name: "Alice Johnson", dept: "Marketing" },
          { id: 2, name: "Bob Smith", dept: "Engineering" },
          { id: 3, name: "Charlie Brown", dept: "HR" },
          { id: 4, name: "Diana Prince", dept: "Legal" },
          { id: 5, name: "Evan Davis", dept: "Finance" },
        ].sort((a, b) => a.name.localeCompare(b.name)),
      );
    }, 500);
  });

export default function InternsList() {
  const navigate = useNavigate();
  const [interns, setInterns] = useState([]);
  const [filteredInterns, setFilteredInterns] = useState([]);

  useEffect(() => {
    fetchInternsFromDB().then((data) => {
      setInterns(data);
      setFilteredInterns(data);
    });
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredInterns(interns);
      return;
    }
    const lowerQuery = query.toLowerCase();
    setFilteredInterns(
      interns.filter((intern) =>
        intern.name.toLowerCase().includes(lowerQuery),
      ),
    );
  };

  const handleFilterApply = (filters) => {
    const entries = Object.entries(filters || {}).filter(
      ([, v]) => v && String(v).trim() !== "",
    );

    if (entries.length === 0) {
      setFilteredInterns(interns);
      return;
    }

    let next = interns.slice();

    entries.forEach(([k, v]) => {
      const val = String(v).toLowerCase();
      if (
        k.toLowerCase().includes("file") ||
        k.toLowerCase().includes("name")
      ) {
        next = next.filter((i) => i.name && i.name.toLowerCase().includes(val));
      } else if (
        k.toLowerCase().includes("department") ||
        k.toLowerCase().includes("dept")
      ) {
        next = next.filter((i) => i.dept && i.dept.toLowerCase().includes(val));
      }
      // other fields ignored by this page
    });

    next = next.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredInterns(next);
  };

  const goToFillInfo = (id) => {
    navigate(`/hr/interns/${id}`);
  };

  return (
    <div className="container">
      <div className="intern-info-page">
        <BackButton />
      </div>

      <div className="interns-container">
        <h1 className="interns-title">Interns List</h1>

        <SearchBar
          placeholder="Search interns by name..."
          onSearch={handleSearch}
          onFilterApply={handleFilterApply}
        />

        <table className="interns-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredInterns.length > 0 ? (
              filteredInterns.map(({ id, name, dept }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{dept}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button
                      className="fill-info-btn"
                      onClick={() => goToFillInfo(id)}
                    >
                      Info
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  No interns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
