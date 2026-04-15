import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  User,
  FileText,
  Save,
  Mail,
  Upload,
  Files,
  ClipboardList,
  Calendar,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../../Pages_css/InternInfo.css";

export default function InternInfo() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  const [internData, setInternData] = useState({
    name: "Alice Johnson",
    department: "Marketing",
    supervisor: "John Manager",
    startDate: "2025-06-20",
    endDate: "2025-12-20",
    cvUrl: "",
  });

  const [progress, setProgress] = useState(0);
  const [cvFileName, setCvFileName] = useState("");

  useEffect(() => {
    const start = new Date(internData.startDate);
    const end = new Date(internData.endDate);
    const today = new Date();

    const totalDays = end - start;
    const passedDays = today - start;

    if (totalDays <= 0) {
      setProgress(0);
      return;
    }

    const calculatedProgress = (passedDays / totalDays) * 100;
    setProgress(Math.round(Math.max(0, Math.min(100, calculatedProgress))));
  }, [internData.startDate, internData.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFileName(file.name);
    }
  };

  const handleSave = () => {
    console.log("Saving intern data:", internData);
    alert("Information saved successfully!");
  };

  const tabs = [
    { id: "info", label: "Info", icon: User },
    { id: "files", label: "Files", icon: Files },
    { id: "tasks", label: "Tasks", icon: ClipboardList },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "hours", label: "Hours", icon: Clock },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button
          style={styles.backButton}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e9ecef")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#f8f9fa")}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 style={styles.headerTitle}>Intern Information</h1>
        <div style={{ width: 40 }} />
      </header>

      <main style={styles.main}>
        <section style={styles.profileCard}>
          <div style={styles.avatar}>
            <User size={48} color="#9be59d" />
          </div>

          <div style={styles.infoGroup}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={internData.name}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#9be59d")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>

            <div style={styles.inputWrapper}>
              <label style={styles.label}>Department</label>
              <input
                type="text"
                name="department"
                value={internData.department}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#9be59d")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>

            <div style={styles.inputWrapper}>
              <label style={styles.label}>Supervisor</label>
              <input
                type="text"
                name="supervisor"
                value={internData.supervisor}
                onChange={handleChange}
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "#9be59d")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>
          </div>
        </section>

        <section style={styles.detailsCard}>
          <div style={styles.progressSection}>
            <div style={styles.dateField}>
              <label style={styles.label}>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={internData.startDate}
                onChange={handleChange}
                style={styles.dateInput}
              />
            </div>

            <div style={styles.progressWrapper}>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progress}%`,
                  }}
                >
                  <span style={styles.progressText}>{progress}%</span>
                </div>
              </div>
              <span style={styles.progressLabel}>Internship Progress</span>
            </div>

            <div style={styles.dateField}>
              <label style={styles.label}>End Date</label>
              <input
                type="date"
                name="endDate"
                value={internData.endDate}
                onChange={handleChange}
                style={styles.dateInput}
              />
            </div>
          </div>

          <div style={styles.actions}>
            <div style={styles.buttonRow}>
              <button
                style={styles.buttonNeutral}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#5a6268")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#6c757d")
                }
              >
                <FileText size={18} />
                <span>View CV</span>
              </button>

              <button
                style={styles.buttonOutline}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8f9fa";
                  e.currentTarget.style.borderColor = "#9be59d";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.borderColor = "#dee2e6";
                }}
              >
                <Upload size={18} />
                <span>Upload CV</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            {cvFileName && (
              <div style={styles.fileName}>
                <FileText size={16} />
                <span>{cvFileName}</span>
              </div>
            )}

            <button
              style={styles.buttonNeutral}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#5a6268")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#6c757d")
              }
            >
              <Mail size={18} />
              <span>View Comments</span>
            </button>

            <button
              style={styles.buttonPrimary}
              onClick={handleSave}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #0056b3 0%, #004085 100%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg, #007bff 0%, #0056b3 100%)")
              }
            >
              <Save size={18} />
              <span>Save Information</span>
            </button>
          </div>
        </section>
      </main>

      <footer style={styles.tabsFooter}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              style={{
                ...styles.tabButton,
                ...(isActive ? styles.tabButtonActive : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "#f1f8f2";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <Icon size={24} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </footer>
    </div>
  );
}
