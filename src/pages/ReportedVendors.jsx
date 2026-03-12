import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import VendorPreview from "../components/VendorPreview";
import { Flag, Trash2, ArrowLeft, MapPin } from "lucide-react";
import { vendors } from "./Dashboard";
import "./ReportedVendors.css";

const REASONS = [
  "Scam / Fraud",
  "Fake products",
  "Never delivered",
  "Rude behaviour",
  "Wrong item sent",
  "Other",
];

const INITIAL_REPORTS = [
  {
    id: 1,
    vendorId: 13,
    reason: "Scam / Fraud",
    note: "Sold me a refurbished phone as brand new.",
    date: "9 Feb 2026",
  },
];

export default function ReportedVendors() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [selectedVendor, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formVendorId, setFormVendorId] = useState("");
  const [formReason, setFormReason] = useState(REASONS[0]);
  const [formNote, setFormNote] = useState("");
  const [notifications] = useState([]);

  const reportedVendors = reports
    .map((r) => ({
      ...r,
      vendor: vendors.find((v) => v.id === r.vendorId),
    }))
    .filter((r) => r.vendor);

  const submitReport = () => {
    if (!formVendorId) return;
    const newReport = {
      id: Date.now(),
      vendorId: parseInt(formVendorId),
      reason: formReason,
      note: formNote,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
    setReports((p) => [newReport, ...p]);
    setFormVendorId("");
    setFormReason(REASONS[0]);
    setFormNote("");
    setShowForm(false);
  };

  const removeReport = (id) => setReports((p) => p.filter((r) => r.id !== id));

  return (
    <div className="rv-page">
      <Navbar
        notifications={notifications}
        onSearchClick={() => {}}
        markAsRead={() => {}}
      />

      <main className="rv-main">
        <div className="rv-header">
         
          
          <div style={{ flex: 1 }}>
            <h1 className="rv-title">
              <Flag size={22} /> Reported Vendors
            </h1>
            <p className="rv-sub">
              {reports.length} report{reports.length !== 1 ? "s" : ""} submitted
            </p>
          </div>
          <button className="rv-btn-new" onClick={() => setShowForm(true)}>
             New Report
          </button>
        </div>

        {reportedVendors.length === 0 ? (
          <div className="rv-empty">
            <div className="rv-empty-icon"></div>
            <h3>No reports submitted</h3>
            <p>
              If a vendor scammed or deceived you, report them to protect
              others.
            </p>
            <button onClick={() => setShowForm(true)}>Report a Vendor →</button>
          </div>
        ) : (
          <div className="rv-list">
            {reportedVendors.map(({ id, vendor, reason, note, date }) => (
              <div key={id} className="rv-card">
                <div
                  className="rv-card-strip"
                  style={{ background: "#DC2626" }}
                />
                <div
                  className="rv-card-av"
                  style={{ background: vendor.color }}
                >
                  {vendor.name[0]}
                </div>
                <div className="rv-card-body">
                  <p className="rv-vendor-name">{vendor.name}</p>
                  <p className="rv-meta">
                    <MapPin size={10} /> {vendor.city} · {vendor.category}
                  </p>
                  <span className="rv-reason-tag">{reason}</span>
                  {note && <p className="rv-note">"{note}"</p>}
                  <p className="rv-date">Reported on {date}</p>
                </div>
                <div className="rv-card-actions">
                  <button
                    className="rv-btn-view"
                    onClick={() => setSelected(vendor)}
                  >
                    View Profile
                  </button>
                  <button
                    className="rv-btn-remove"
                    onClick={() => removeReport(id)}
                    title="Remove report"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* NEW REPORT FORM */}
      {showForm && (
        <div className="rv-overlay" onClick={() => setShowForm(false)}>
          <div className="rv-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="rv-modal-title"> Report a Vendor</h3>
            <p className="rv-modal-sub">
              Select the vendor and reason. Your report helps protect the
              community.
            </p>

            <label className="rv-label">Vendor</label>
            <select
              className="rv-select"
              value={formVendorId}
              onChange={(e) => setFormVendorId(e.target.value)}
            >
              <option value="">— Select vendor —</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} · {v.city}
                </option>
              ))}
            </select>

            <label className="rv-label">Reason</label>
            <div className="rv-reasons">
              {REASONS.map((r) => (
                <button
                  key={r}
                  className={`rv-reason-btn${formReason === r ? " active" : ""}`}
                  onClick={() => setFormReason(r)}
                >
                  {r}
                </button>
              ))}
            </div>

            <label className="rv-label">Additional details (optional)</label>
            <textarea
              className="rv-textarea"
              placeholder="Describe what happened..."
              rows={3}
              value={formNote}
              onChange={(e) => setFormNote(e.target.value)}
            />

            <div className="rv-modal-btns">
              <button className="rv-cancel" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button
                className="rv-submit"
                onClick={submitReport}
                disabled={!formVendorId}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedVendor && (
        <VendorPreview
          vendor={selectedVendor}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
