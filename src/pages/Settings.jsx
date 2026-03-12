import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  Shield,
  Moon,
  Globe,
  ChevronRight,
  LogOut,
  Camera,
} from "lucide-react";
import styles from "./Settings.module.css";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <h1>Settings</h1>
      </div>

      <div className={styles.settingsContainer}>
        {/* Profile */}
        <div className={styles.settingsSection}>
          <h2>Profile Settings</h2>
          <div className={styles.profileSettingsCard}>
            <div className={styles.profilePictureSection}>
              <div className={styles.profilePictureWrapper}>
                <div className={styles.profilePicture}>A</div>
                <div className={styles.changePhotoBtn}>
                  <Camera size={16} />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <h3>Amina</h3>
                <p>+237 650 123 456</p>
                <p className={styles.profileEmail}>amina@example.com</p>
              </div>
            </div>
            <button className={styles.editProfileBtn}>
              Edit Profile <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className={styles.settingsSection}>
          <h2>Preferences</h2>
          <div className={styles.settingsCard}>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <Bell size={20} />
                <div>
                  <h4>Notifications</h4>
                  <p>Receive alerts about vendors and reviews</p>
                </div>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <Moon size={20} />
                <div>
                  <h4>Dark Mode</h4>
                  <p>Switch to dark theme</p>
                </div>
              </div>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <span className={styles.slider}></span>
              </label>
            </div>
            <div className={styles.settingItem}>
              <div className={styles.settingInfo}>
                <Globe size={20} />
                <div>
                  <h4>Language</h4>
                  <p>Choose your preferred language</p>
                </div>
              </div>
              <select
                className={styles.languageSelect}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className={styles.settingsSection}>
          <h2>Security</h2>
          <div className={styles.settingsCard}>
            <button className={styles.securityBtn}>
              <Shield size={20} />
              Change Password
              <ChevronRight size={16} className={styles.chevron} />
            </button>
            <button className={styles.securityBtn}>
              <Shield size={20} />
              Two-Factor Authentication
              <ChevronRight size={16} className={styles.chevron} />
            </button>
            <button className={styles.securityBtn}>
              <Shield size={20} />
              Privacy Settings
              <ChevronRight size={16} className={styles.chevron} />
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={styles.settingsSection}>
          <h2>Danger Zone</h2>
          <div className={`${styles.settingsCard} ${styles.danger}`}>
            <button className={styles.deleteAccountBtn}>Delete Account</button>
          </div>
        </div>

        <button className={styles.logoutSettingsBtn}>
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Settings;
