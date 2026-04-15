import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";

import Login from "./Pages/Login";
import HRHome from "./Pages/HR/HR_Home";
import LegalHome from "./Pages/HR/Legal/LegalHome";
import InternsHome from "./Pages/HR/Interns/InternsHome";
import InternInfo from "./Pages/HR/Interns/InternInfo";
import TasksPage from "./Pages/HR/Interns/TasksPage";
import FilesPage from "./Pages/HR/Interns/FilesPage";
import ReportsPage from "./Pages/HR/Interns/ReportsPage";
import RemindersPage from "./Pages/HR/Interns/RemindersPage";
import AttendancePage from "./Pages/HR/Interns/AttendancePage";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* HR main home */}
        <Route path="/hrhome" element={<HRHome />} />
        {/* Legal archive */}
        <Route path="/hr/legal" element={<LegalHome />} />

        {/* Interns archive */}
        <Route path="/hr/interns/" element={<InternsHome />} />
        <Route path="/hr/interns/:id" element={<InternInfo />} />
        <Route path="/hr/interns/:id/tasks" element={<TasksPage />} />
        <Route path="/hr/interns/:id/files" element={<FilesPage />} />
        <Route path="/hr/interns/:id/reports" element={<ReportsPage />} />
        <Route path="/hr/interns/:id/reminders" element={<RemindersPage />} />
        <Route path="/hr/interns/:id/attendance" element={<AttendancePage />} />

        {/* Future departments */}
        {/* <Route path="/accounting" element={<AccountingHome />} /> */}
        {/* <Route path="/admin" element={<AdminHome />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
