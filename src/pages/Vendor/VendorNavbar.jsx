import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, X, Menu } from "lucide-react";
import "./VendorNavbar.css";
import logo from "../../assets/logo.png";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "reviews", label: "Reviews", badge: 3 },
  { key: "messages", label: "Messages", badge: 2 },
  { key: "complaints", label: "Complaints", badge: 1 },
];

export default function VendorNavbar({
  activePage,
  setActivePage,
  vendorName,
  notifications,
  onMarkRead,
  onClearAll,
}) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unread = notifications?.filter((n) => !n.read).length || 0;
  const initial = vendorName?.[0]?.toUpperCase() || "V";

  return (
    <nav className="vsb-nav">
      <div className="vsb-inner">
        {/* LOGO */}
        <button className="vsb-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="SafeBuy" className="vsb-logoimg" />
          <span className="vsb-brand">
            Safe<b>Buy</b>
          </span>
        </button>

        {/* CENTER LINKS */}
        <div className="vsb-links">
          {NAV.map(({ key, label, badge }) => (
            <button
              key={key}
              className={`vsb-link${activePage === key ? " active" : ""}`}
              onClick={() => setActivePage(key)}
            >
              {label}
              {badge && <span className="vsb-badge">{badge}</span>}
            </button>
          ))}
        </div>

        {/* RIGHT */}
        <div className="vsb-right">
          {/* BELL */}
          <div className="vsb-icon-wrap">
            <button
              className="vsb-icon-btn"
              onClick={() => {
                setNotifOpen((o) => !o);
                setMobileOpen(false);
              }}
            >
              <Bell size={18} />
              {unread > 0 && <span className="vsb-notif-badge">{unread}</span>}
            </button>
            {notifOpen && (
              <div className="vsb-dropdown">
                <div className="vsb-dd-head">
                  <span>Notifications</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="vsb-mark-all" onClick={onClearAll}>
                      Mark all read
                    </button>
                    <button
                      className="vsb-dd-close"
                      onClick={() => setNotifOpen(false)}
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
                {(notifications || []).map((n) => (
                  <div
                    key={n.id}
                    className={`vsb-notif-item${!n.read ? " unread" : ""}`}
                    onClick={() => onMarkRead?.(n.id)}
                  >
                    <div
                      className="vsb-dot"
                      style={{
                        background: n.read ? "#CBD5E1" : n.color || "#2D6A35",
                      }}
                    />
                    <div>
                      <p className="vsb-ntxt">{n.text}</p>
                      <p className="vsb-ntime">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VENDOR AVATAR */}
          <div className="vsb-vendor">
            <div className="vsb-av">{initial}</div>
            <span className="vsb-vname">{vendorName}</span>
          </div>

         

          {/* MOBILE HAMBURGER */}
          <button
            className="vsb-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="vsb-mobile-menu">
          {NAV.map(({ key, label, badge }) => (
            <button
              key={key}
              className={`vsb-mobile-link${activePage === key ? " active" : ""}`}
              onClick={() => {
                setActivePage(key);
                setMobileOpen(false);
              }}
            >
              {label}
              {badge && <span className="vsb-badge">{badge}</span>}
            </button>
          ))}
          <div className="vsb-mobile-divider" />
         
        </div>
      )}
    </nav>
  );
}
