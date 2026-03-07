import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Star,
  Bookmark,
  Flag,
  Settings,
  LogOut,
  X,
  User,
  Camera,
  Bell,
  BarChart2,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Sidebar.module.css";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Search, label: "Search Vendor", path: null },
  { icon: Star, label: "My Reviews", path: "/reviews" },
  { icon: Bookmark, label: "Saved Vendors", path: "/saved" },
  { icon: Flag, label: "Reported Vendors", path: "/reports" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  profileImagePreview,
  triggerFileInput,
  setSearchPopupOpen,
  notifications,
  markAsRead,
  stats,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activePanel, setActivePanel] = useState(null);

  const displayName = user?.name || "Guest";
  const displayEmail = user?.email || "";
  // First letter of name for avatar fallback
  const initital = displayName.charAt(0).toUpperCase();

  const handleNavClick = (item) => {
    if (item.path === null) {
      setSearchPopupOpen(true);
      setSidebarOpen(false);
    } else {
      navigate(item.path);
      setSidebarOpen(false);
    }
    setActivePanel(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      {/* HEADER */}
      <div className={styles.sidebarHeader}>
        <div className={styles.logoMark}>
          <span>
            Safe<b>Buy</b>
          </span>
        </div>
        <button
          className={styles.closeSidebar}
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      {/* PROFILE — shows real name and email */}
      <div className={styles.profileCard}>
        <div className={styles.profileAvatarWrapper} onClick={triggerFileInput}>
          {profileImagePreview ? (
            <img
              src={profileImagePreview}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
              {initital}
            </span>
          )}
          <div className={styles.cameraIcon}>
            <Camera size={12} />
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h3>{displayName}</h3>
          <p>{displayEmail}</p>
        </div>
      </div>

      {/* NAV */}
      <nav className={styles.navMenu}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;
          return (
            <div
              key={item.label}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              onClick={() => handleNavClick(item)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          );
        })}

        {/* NOTIFICATIONS */}
        <div
          className={`${styles.navItem} ${activePanel === "notifications" ? styles.active : ""}`}
          onClick={() => togglePanel("notifications")}
        >
          <Bell size={20} />
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )}
          <ChevronRight
            size={14}
            className={`${styles.chevron} ${activePanel === "notifications" ? styles.chevronOpen : ""}`}
          />
        </div>

        {activePanel === "notifications" && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span>Notifications</span>
              <span
                className={styles.markAll}
                onClick={() => notifications.forEach((n) => markAsRead(n.id))}
              >
                Mark all read
              </span>
            </div>
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`${styles.notifItem} ${!n.read ? styles.unread : ""}`}
                onClick={() => markAsRead(n.id)}
              >
                <div
                  className={styles.notifDot}
                  style={{ background: n.read ? "#cbd5e1" : "#3A7D44" }}
                />
                <div>
                  <p className={styles.notifText}>{n.text}</p>
                  <span className={styles.notifTime}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVITY */}
        <div
          className={`${styles.navItem} ${activePanel === "activity" ? styles.active : ""}`}
          onClick={() => togglePanel("activity")}
        >
          <BarChart2 size={20} />
          <span>My Activity</span>
          <ChevronRight
            size={14}
            className={`${styles.chevron} ${activePanel === "activity" ? styles.chevronOpen : ""}`}
          />
        </div>

        {activePanel === "activity" && (
          <div className={styles.panel}>
            <div className={styles.statsGrid}>
              {stats.map((s, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* FOOTER — logout */}
      <div className={styles.sidebarFooter}>
        <div
          className={`${styles.navItem} ${styles.logout}`}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
