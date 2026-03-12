import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import VendorPreview from "../components/VendorPreview";
import { Bookmark, Trash2, MapPin, Star, ArrowLeft } from "lucide-react";
import { vendors } from "./Dashboard";
import "./SavedVendors.css";

// Demo: pre-saved some vendors
const INITIAL_SAVED = [1, 4, 6, 12];

export default function SavedVendors() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState(INITIAL_SAVED);
  const [selectedVendor, setSelected] = useState(null);
  const [notifications] = useState([]);

  const savedVendors = vendors.filter((v) => savedIds.includes(v.id));

  const unsave = (id) => setSavedIds((p) => p.filter((x) => x !== id));

  const ratingColor = (r) =>
    r >= 4.5 ? "#166534" : r >= 3 ? "#92400E" : "#991B1B";
  const ratingBg = (r) =>
    r >= 4.5 ? "#F0FDF4" : r >= 3 ? "#FEFCE8" : "#FEF2F2";

  return (
    <div className="sv-page">
      <Navbar
        notifications={notifications}
        onSearchClick={() => {}}
        markAsRead={() => {}}
      />

      <main className="sv-main">
        <div className="sv-header">
         
          <div>
            <h1 className="sv-title">
              <Bookmark size={22} /> Saved Vendors
            </h1>
            <p className="sv-sub">
              {savedVendors.length} vendor{savedVendors.length !== 1 ? "s" : ""}{" "}
              saved
            </p>
          </div>
        </div>

        {savedVendors.length === 0 ? (
          <div className="sv-empty">
            <div className="sv-empty-icon"></div>
            <h3>No saved vendors yet</h3>
            <p>
              When you save a vendor from their profile, they'll appear here.
            </p>
            <button onClick={() => navigate("/dashboard")}>
              Browse Vendors 
            </button>
          </div>
        ) : (
          <div className="sv-grid">
            {savedVendors.map((v) => (
              <div key={v.id} className="sv-card">
                <div
                  className="sv-card-strip"
                  style={{ background: v.color }}
                />
                <div className="sv-card-av" style={{ background: v.color }}>
                  {v.name[0]}
                </div>
                <div className="sv-card-body">
                  <p className="sv-card-name">{v.name}</p>
                  <p className="sv-card-meta">
                    <MapPin size={11} /> {v.city} · {v.category}
                  </p>
                  <div className="sv-card-row">
                    <span className="sv-stars">
                      {"★".repeat(Math.round(v.rating))}
                      {"☆".repeat(5 - Math.round(v.rating))}
                    </span>
                    <span
                      className="sv-rating"
                      style={{
                        background: ratingBg(v.rating),
                        color: ratingColor(v.rating),
                      }}
                    >
                      <Star size={10} fill="currentColor" /> {v.rating}
                    </span>
                  </div>
                  <p className="sv-phone">📞 {v.number}</p>
                </div>
                <div className="sv-card-actions">
                  <button
                    className="sv-btn-view"
                    onClick={() => setSelected(v)}
                  >
                    View Profile
                  </button>
                  <button
                    className="sv-btn-remove"
                    onClick={() => unsave(v.id)}
                    title="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedVendor && (
        <VendorPreview
          vendor={selectedVendor}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
