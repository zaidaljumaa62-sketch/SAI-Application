import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Pages_css/FilesPage.css";
import BackButton from "../../../Compo/BackButton";

export default function FilesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initial = [
    {
      id: 1,
      fileName: "OfferLetter.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      visibleToIntern: true,
    },
    {
      id: 2,
      fileName: "OnboardingChecklist.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      visibleToIntern: false,
    },
    {
      id: 3,
      fileName: "Contract.pdf",
      fileUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      visibleToIntern: true,
    },
  ];

  const [files, setFiles] = useState(initial);
  const [sortOrder, setSortOrder] = useState("name-asc");

  const toggleVisible = (fid) => {
    setFiles((f) =>
      f.map((x) =>
        x.id === fid ? { ...x, visibleToIntern: !x.visibleToIntern } : x
      )
    );
  };

  const sortedFiles = [...files].sort((a, b) => {
    if (sortOrder === "name-asc") return a.fileName.localeCompare(b.fileName);
    if (sortOrder === "name-desc") return b.fileName.localeCompare(a.fileName);
    return 0;
  });

  return (
    <div className="page-wrap">
      <header className="header">
        <div className="back-wrapper">
          <BackButton />
        </div>
        <h2 className="page-title">Files</h2>
      </header>
      <main className="content">
        <div className="filter-bar">
          <label>Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="name-asc">Name Ascending</option>
            <option value="name-desc">Name Descending</option>
          </select>
        </div>
        <div className="files-list">
          {sortedFiles.map((file) => (
            <div key={file.id} className="file-row">
              <a
                className="file-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(file.fileUrl, "_blank");
                }}
              >
                {file.fileName}
              </a>
              <label className="visibility">
                <input
                  type="checkbox"
                  checked={file.visibleToIntern}
                  onChange={() => toggleVisible(file.id)}
                />{" "}
                Visible
              </label>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
