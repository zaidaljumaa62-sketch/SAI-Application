import React from "react";
import "../../Pages_css/HR_Home.css";
import { HiUsers } from "react-icons/hi";
import { LuFileStack } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function HRHome() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="HR-Home-box">
        <h1 className="title">Welcome HR</h1>

        <div className="icon-row">
          <div
            className="icon-container"
            onClick={() => navigate("/hr/interns")}
            role="button"
            tabIndex={0}
          >
            <HiUsers className="icon" />
            <span className="icon-label">Interns</span>
          </div>

          <div
            className="icon-container"
            onClick={() => navigate("/hr/legal")}
            role="button"
            tabIndex={0}
          >
            <LuFileStack className="icon" />
            <span className="icon-label">Files</span>
          </div>
        </div>
      </div>
    </div>
  );
}
