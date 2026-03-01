import React from "react";
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
} from "lucide-react";
import styles from "./Sidebar.module.css";

// These paths match EXACTLY what's in App.jsx
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Search, label: "Search Vendor", path: null }, // opens search popup
  { icon: Star, label: "My Reviews", path: "/reviews" },
  { icon: Bookmark, label: "Saved Vendors", path: "/saved" },
  { icon: Flag, label: "Reported Vendors", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  profileImagePreview,
  triggerFileInput,
  setSearchPopupOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (item) => {
    if (item.path === null) {
      setSearchPopupOpen(true);
    } else {
      navigate(item.path);
      setSidebarOpen(false);
    }
  };

  return (
    <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <button
          className={styles.closeSidebar}
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} />
        </button>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.profileAvatarWrapper} onClick={triggerFileInput}>
          {profileImagePreview ? (
            <img
              src={profileImagePreview}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <User size={32} />
          )}
          <div className={styles.cameraIcon}>
            <Camera size={14} />
          </div>
        </div>
        <div className={styles.profileInfo}>
          <h3>Amina</h3>
          <p>+237 650 123 456</p>
        </div>
      </div>

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
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={`${styles.navItem} ${styles.logout}`}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
