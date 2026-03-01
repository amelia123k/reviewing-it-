import React from "react";
import { Bell, Menu } from "lucide-react";
import styles from "./TopBar.module.css";

const TopBar = ({
  setSidebarOpen,
  notifications,
  markAsRead,
  profileImagePreview,
  triggerFileInput,
}) => (
  <header className={styles.topBar}>
    <button className={styles.menuToggle} onClick={() => setSidebarOpen(true)}>
      <Menu size={24} />
    </button>
    <div className={styles.pageTitle}>
      <h1>Dashboard</h1>
      <span className={styles.breadcrumb}>Dashboard / Amina</span>
    </div>
    <div className={styles.topBarActions}>
      <div className={styles.notificationWrapper}>
        <button className={styles.notificationBtn}>
          <Bell size={20} />
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className={styles.notificationBadge}>
              {notifications.filter((n) => !n.read).length}
            </span>
          )}
        </button>
        <div className={styles.notificationsDropdown}>
          <div className={styles.notificationsHeader}>
            <h4>Notifications</h4>
            <span className={styles.markRead}>Mark all as read</span>
          </div>
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`${styles.notificationItem} ${!n.read ? styles.unread : ""}`}
              onClick={() => markAsRead(n.id)}
            >
              <div className={styles.notificationDot} />
              <div className={styles.notificationContent}>
                <p>{n.text}</p>
                <span>{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.profileMini} onClick={triggerFileInput}>
        <span>Amina</span>
        <div className={styles.profileMiniAvatar}>
          {profileImagePreview ? (
            <img
              src={profileImagePreview}
              alt="Profile"
              className={styles.miniProfileImage}
            />
          ) : (
            "A"
          )}
        </div>
      </div>
    </div>
  </header>
);

export default TopBar;
