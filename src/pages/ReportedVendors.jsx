import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Flag,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import styles from "./ReportedVendors.module.css";

const reportedVendors = [
  {
    id: 1,
    name: "Tech Hub",
    number: "+237 651 456 234",
    reason: "Scam - Took money and blocked",
    reportedBy: "Sarah Smith",
    date: "Apr 17, 2024",
    status: "pending",
    statusText: "Under Review",
  },
  {
    id: 2,
    name: "Fast Food Express",
    number: "+237 653 321 890",
    reason: "Fake products delivered",
    reportedBy: "John Doe",
    date: "Apr 15, 2024",
    status: "resolved",
    statusText: "Resolved",
  },
  {
    id: 3,
    name: "Phone Guy",
    number: "+237 655 876 456",
    reason: "Never delivered after payment",
    reportedBy: "Emma Wilson",
    date: "Apr 12, 2024",
    status: "pending",
    statusText: "Under Review",
  },
];

const getStatusIcon = (status) => {
  if (status === "resolved") return <CheckCircle size={16} color="#10b981" />;
  if (status === "pending") return <Clock size={16} color="#f59e0b" />;
  return <AlertTriangle size={16} color="#ef4444" />;
};

const ReportedVendors = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Reported Vendors</h1>
        <p className={styles.pageSubtitle}>
          Vendors you've reported to the community
        </p>
      </div>

      <div className={styles.reportsList}>
        {reportedVendors.map((report) => (
          <div key={report.id} className={styles.reportCard}>
            <div className={styles.reportHeader}>
              <div className={styles.reportTitle}>
                <Flag size={18} color="#ef4444" />
                <div>
                  <h3>{report.name}</h3>
                  <p className={styles.vendorNumber}>{report.number}</p>
                </div>
              </div>
              <span
                className={`${styles.reportStatus} ${styles[report.status]}`}
              >
                {getStatusIcon(report.status)}
                {report.statusText}
              </span>
            </div>

            <div className={styles.reportDetails}>
              <p className={styles.reportReason}>
                <strong>Reason:</strong> {report.reason}
              </p>
              <p className={styles.reportMeta}>
                Reported by {report.reportedBy} on {report.date}
              </p>
            </div>

            <div className={styles.reportActions}>
              <button className={styles.viewDetailsBtn}>View Details</button>
              <button className={styles.contactSupportBtn}>
                Contact Support
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedVendors;
