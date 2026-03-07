import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VendorSidebar.css";
import logo from "../../assets/logo.png";

const NAV = [
  { key: "overview", icon: "📊", label: "Overview" },
  { key: "reviews", icon: "💬", label: "Reviews", badge: 3 },
  { key: "messages", icon: "✉️", label: "Messages", badge: 2 },
  { key: "customers", icon: "👥", label: "Customers" },
  { key: "complaints", icon: "🚩", label: "Complaints", badge: 1 },
  { key: "profile", icon: "👤", label: "Profile" },
];

export default function VendorSidebar({
  activePage,
  setActivePage,
  vendorName,
  notifications,
  onMarkRead,
  onClearAll,
  mobileOpen,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <aside className={`vsb${mobileOpen ? " vsb-open" : ""}`}>
      {/* LOGO */}
      <div className="vsb-logo">
        <img src={logo} alt="SafeBuy" className="vsb-logoimg" />
        <span className="vsb-name">
          Safe<span>Buy</span>
        </span>
      </div>

      {/* NAV */}
      <nav className="vsb-nav">
        {NAV.map(({ key, icon, label, badge }) => (
          <button
            key={key}
            className={`vsb-item${activePage === key ? " active" : ""}`}
            onClick={() => setActivePage(key)}
          >
            {icon} {label}
            {badge && <span className="vsb-badge">{badge}</span>}
          </button>
        ))}

        <div className="vsb-divider" />

        <button
          className={`vsb-item${open ? " active" : ""}`}
          onClick={() => setOpen((o) => !o)}
        >
          🔔 Notifications
          {unread > 0 && <span className="vsb-badge">{unread}</span>}
          <span className={`vsb-chevron${open ? " open" : ""}`}>›</span>
        </button>

        {open && (
          <div className="vsb-notif-panel">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`vsb-notif-item${!n.read ? " unread" : ""}`}
                onClick={() => onMarkRead(n.id)}
              >
                <div
                  className="vsb-dot"
                  style={{ background: n.read ? "#ccc" : n.color }}
                />
                <div>
                  <p className="vsb-ntxt">{n.text}</p>
                  <p className="vsb-ntime">{n.time}</p>
                </div>
              </div>
            ))}
            <button className="vsb-clear" onClick={onClearAll}>
              Clear all
            </button>
          </div>
        )}
      </nav>

      {/* FOOTER */}
      <div className="vsb-foot">
        <button className="vsb-back" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <div className="vsb-profile">
          <div className="vsb-av">{vendorName?.[0]}</div>
          <div>
            <p className="vsb-pname">{vendorName}</p>
            <p className="vsb-prole">Vendor Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
