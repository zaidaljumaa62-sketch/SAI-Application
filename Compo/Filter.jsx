import React, { useState, useEffect } from "react";
import "../Pages_css/Filter.css";

const DEFAULT_ITEMS = [
  "File name",
  "Upload date",
  "Create date",
  "Department",
  "Creator",
  "Opposite team",
  "Extension",
];

export default function FilterPanel({
  isOpen = false,
  onClose,
  title = "Filter",
  fields = null, // optional override list
  inline = false,
  onApply, // (values) => {}
  onChange, // (values) => {}
}) {
  const items =
    Array.isArray(fields) && fields.length > 0 ? fields : DEFAULT_ITEMS;

  const [openItem, setOpenItem] = useState(null);
  const [values, setValues] = useState({});

  useEffect(() => {
    if (!isOpen) {
      // reset expanded item when panel closes
      setOpenItem(null);
    }
  }, [isOpen]);

  const toggleItem = (item) => {
    setOpenItem(openItem === item ? null : item);
  };

  const handleInputChange = (item, v) => {
    const next = { ...values, [item]: v };
    setValues(next);
    if (onChange) onChange(next);
  };

  const handleApply = () => {
    if (onApply) onApply(values);
    if (onClose) onClose();
  };

  const handleClear = () => {
    setValues({});
    if (onChange) onChange({});
  };

  const panelBody = (
    <div className="filter-list">
      {items.map((item) => (
        <div key={item} className="filter-item">
          <div
            className="filter-item-header"
            onClick={() => toggleItem(item)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{item}</span>
            <span className={`arrow ${openItem === item ? "open" : ""}`}>
              ▼
            </span>
          </div>

          {openItem === item && (
            <div className="filter-dropdown" style={{ marginTop: 8 }}>
              <input
                className="filter-input"
                type="text"
                value={values[item] || ""}
                onChange={(e) => handleInputChange(item, e.target.value)}
                placeholder={`Search by ${item.toLowerCase()}...`}
              />
            </div>
          )}
        </div>
      ))}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="filter-apply-btn" onClick={handleApply}>
          Apply
        </button>
        <button className="filter-clear-btn" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );

  // Inline dropdown mode
  if (inline) {
    const panelStyle = {
      display: isOpen ? "block" : "none",
      position: "absolute",
      left: "calc(100% + 8px)",
      top: 0,
      minWidth: 260,
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: 6,
      padding: 12,
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      zIndex: 9999,
    };

    return (
      <div
        className={`inline-panel ${isOpen ? "open" : ""}`}
        style={panelStyle}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <strong style={{ fontSize: 14 }}>{title}</strong>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close filter"
            style={{
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {panelBody}
        </div>
      </div>
    );
  }

  // Slide-over mode
  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`slide-panel ${isOpen ? "open" : ""}`}>
        <div className="slide-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="slide-subtitle">Search on :</p>

        <div className="slide-body">{panelBody}</div>
      </div>
    </>
  );
}
