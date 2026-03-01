// StatsGrid.jsx
import React from "react";
import { Users, Star, Shield, Bookmark } from "lucide-react";
import styles from "./StatsGrid.module.css";

const stats = [
  { icon: Users, value: "23", label: "Vendors Checked" },
  { icon: Star, value: "8", label: "Reviews Written" },
  { icon: Shield, value: "5", label: "Scam Reports" },
  { icon: Bookmark, value: "12", label: "Saved Vendors" },
];

const StatsGrid = () => (
  <div className={styles.statsGrid}>
    {stats.map((stat, idx) => {
      const Icon = stat.icon;
      return (
        <div key={idx} className={styles.statCard}>
<div className={styles.statIcon}>
  <Icon size={24} />
</div>
<div>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        </div>
      );
    })}
  </div>
);

export default StatsGrid;
