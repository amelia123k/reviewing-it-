import React from "react";
import { ChevronRight, Star as StarIcon, Clock } from "lucide-react";
import styles from "./RecentSearches.module.css";

const RecentSearches = ({ recentSearches }) => (
  <section className={styles.recentSearches}>
    <div className={styles.sectionHeader}>
      <h2>Recent Vendor Searches</h2>
      <button className={styles.viewAll}>
        View All <ChevronRight size={16} />
      </button>
    </div>
    <div className={styles.searchesGrid}>
      {recentSearches.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className={styles.searchCard}>
            <div className={styles.vendorIcon}>
              <Icon size={24} />
            </div>
            <p className={styles.vendorName}>{item.name}</p>
            <p className={styles.vendorNumber}>{item.number}</p>
            <span className={styles.vendorCategory}>{item.category}</span>
            <div className={styles.searchCardFooter}>
              <div className={styles.rating}>
                <StarIcon size={14} fill="#10b981" color="#10b981" />
                <span>{item.rating}</span>
              </div>
              <Clock size={14} />
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default RecentSearches;
