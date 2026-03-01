import React from "react";
import { ChevronRight } from "lucide-react";
import styles from "./RecentPeople.module.css";

const RecentPeople = ({ recentPeople }) => (
  <section className={styles.recentPeople}>
    <div className={styles.sectionHeader}>
      <h2>Recent People Search</h2>
      <button className={styles.viewAll}>
        View All <ChevronRight size={16} />
      </button>
    </div>
    <div className={styles.peopleList}>
      {recentPeople.map((person, idx) => (
        <div key={idx} className={styles.personItem}>
          <div className={styles.personAvatar}>{person.avatar}</div>
          <div className={styles.personInfo}>
            <p>
              <strong>{person.name}</strong> {person.action}{" "}
              <span className={styles.personTarget}>{person.target}</span>
            </p>
            <span className={styles.personTime}>{person.time}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default RecentPeople;
