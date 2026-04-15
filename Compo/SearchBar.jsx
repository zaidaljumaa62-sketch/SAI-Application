// SearchBar.jsx  (or .tsx if you're using TypeScript)
import React, { useState } from "react";
import "../Pages_css/SearchBar.css";
import { FaSearch } from "react-icons/fa";
import FilterPanel from "./Filter";

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  onFilter, // legacy: called when toggling filter (kept for backward compatibility)
  onFilterApply, // (filters) => {} - page-level handler for applied filters
  showLabel = true,
}) {
  const [query, setQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleFilterToggle = () => {
    if (onFilter) onFilter();
    setIsFilterOpen((s) => !s);
  };

  const handleFilterApply = (filters) => {
    // prefer explicit onFilterApply, fall back to onFilter (legacy)
    if (onFilterApply) onFilterApply(filters);
    else if (onFilter) onFilter(filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="search-bar" style={{ position: "relative" }}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="search-input"
        />

        <div type="button" className="search-icon-btn">
          <FaSearch />
        </div>
      </div>

      <div
        className="filter-wrapper"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <button
          type="button"
          className="filter-button"
          onClick={handleFilterToggle}
          aria-expanded={isFilterOpen}
          aria-label="Toggle filters"
        >
          Filters
        </button>

        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          inline
          title="Filters"
          // leave default fields in FilterPanel; override if needed by parent
          onApply={handleFilterApply}
        />
      </div>
    </div>
  );
}
