import React, { useState } from "react";
import SearchBar from "../../../Compo/SearchBar";
import "../../../Pages_css/LegalHome.css";
import BackButton from "../../../Compo/BackButton";
import { GrView } from "react-icons/gr";
import FilterPanel from "../../../Compo/Filter"; // <-- use slide-in drawer

const allFiles = [
  {
    fileName: "Reports",
    description: "Reports on Q1",
  },
  {
    fileName: "Salaries",
    description: "Salaries of emp of ...",
  },
  {
    fileName: "Internship",
    description: "Report on interns",
  },
  {
    fileName: "Reports",
    description: "Reports on Q2",
  },
].sort((a, b) => a.fileName.localeCompare(b.fileName));

export default function LegalHome() {
  const [files, setFiles] = useState(allFiles);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearch = (query) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setFiles(allFiles);
      return;
    }

    const filtered = allFiles.filter((file) =>
      file.fileName.toLowerCase().includes(trimmedQuery.toLowerCase())
    );

    setFiles(filtered);
  };

  const fileFilters = [
    "File name",
    "Upload date",
    "Create date",
    "Department",
    "Creator",
    "Extension",
  ];

  const handleFilterApply = (filters) => {
    // filters keys are the display names like "File name", "Upload date", etc.
    // Apply filter rules based on fields we care about in this page.
    const entries = Object.entries(filters || {}).filter(
      ([, v]) => v && String(v).trim() !== ""
    );

    if (entries.length === 0) {
      setFiles(allFiles);
      return;
    }

    let next = allFiles.slice();

    entries.forEach(([k, v]) => {
      const val = String(v).toLowerCase();
      if (k.toLowerCase().includes("file")) {
        next = next.filter(
          (f) => f.fileName && f.fileName.toLowerCase().includes(val)
        );
      } else if (k.toLowerCase().includes("description")) {
        next = next.filter(
          (f) => f.description && f.description.toLowerCase().includes(val)
        );
      }
      // other fields ignored by this page
    });

    setFiles(next);
  };

  const openFileDrawer = (file) => {
    setSelectedFile(file);
    setDrawerOpen(true);
  };

  const closeFileDrawer = () => {
    setSelectedFile(null);
    setDrawerOpen(false);
  };

  const handleDownload = (file) => {
    // attempt to download by creating an anchor
    const a = document.createElement("a");
    a.href = file.fileUrl || "#";
    a.download = file.fileName || "file";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleView = (file) => {
    if (file.fileUrl) window.open(file.fileUrl, "_blank");
  };

  return (
    <div className="files-page">
      <div className="header">
        <div className="back-wrapper">
          <BackButton />
        </div>
        <h2 className="page-title">Legal Documents</h2>
      </div>

      <SearchBar
        onSearch={handleSearch}
        onFilter={() => setFilterOpen(true)}
        onFilterApply={handleFilterApply}
      />

      {/* Grid Table */}
      <div className="grid-table-container">
        <div className="grid-table grid-header">
          <div>File name</div>
          <div>Description</div>
          <div>Action</div>
        </div>

        {files.length === 0 ? (
          <div className="no-files">No files found</div>
        ) : (
          files.map((file, index) => (
            <div className="grid-table grid-row" key={index}>
              <div>{file.fileName}</div>
              <div>{file.description}</div>
              <div className="actions">
                <button
                  aria-label="Download"
                  onClick={() => handleDownload(file)}
                >
                  ↓
                </button>
                <button aria-label="View" onClick={() => openFileDrawer(file)}>
                  <GrView />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bottom-section">
        <div className="pagination-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <button className="view-all-button">Press to view all</button>
      </div>
      {/* File detail drawer */}
      <div className={`file-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <strong>Document</strong>
          <button onClick={closeFileDrawer}>×</button>
        </div>
        <div className="drawer-body">
          {selectedFile && (
            <div>
              <div>
                <strong>{selectedFile.fileName}</strong>
              </div>
              <div style={{ marginTop: 8 }}>{selectedFile.description}</div>
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => handleView(selectedFile)}
                  style={{ marginRight: 8 }}
                >
                  Open
                </button>
                <button onClick={() => handleDownload(selectedFile)}>
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
