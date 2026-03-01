import React from "react";
import { Home, PlusCircle, AlertTriangle } from "lucide-react";
import styles from "./BottomNav.module.css";

const BottomNav = ({ activeTab, handleBottomNav }) => (
  <div className={styles.bottomNav}>
    <button
      className={`${styles.item} ${activeTab === "home" ? styles.active : ""}`}
      onClick={() => handleBottomNav("home")}
    >
      <Home size={24} />
      <span>Home</span>
    </button>
    <button
      className={`${styles.item} ${activeTab === "add" ? styles.active : ""}`}
      onClick={() => handleBottomNav("add")}
    >
      <PlusCircle size={24} />
      <span>Add Review</span>
    </button>
    <button
      className={`${styles.item} ${activeTab === "report" ? styles.active : ""}`}
      onClick={() => handleBottomNav("report")}
    >
      <AlertTriangle size={24} />
      <span>Report</span>
    </button>
  </div>
);

export default BottomNav;
