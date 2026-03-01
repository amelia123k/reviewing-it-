import React from "react";
import { ChevronRight, Star as StarIcon } from "lucide-react";
import styles from "./YourReviews.module.css";

const reviews = [
  {
    rating: 5,
    date: "Apr 17, 2024",
    posted: "Apr 21, 2024",
    content:
      "Ordered jollof and chicken, arrived on time, food was so delicious! 🥰",
  },
  {
    rating: 1,
    date: "Apr 17, 2024",
    posted: "Apr 17, 2024",
    content: "Scammer! This vendor blocked me after I sent the money. Avoid!",
  },
];

const YourReviews = ({ profileImagePreview }) => (
  <section className={styles.yourReviews}>
    <div className={styles.sectionHeader}>
      <h2>Your Reviews</h2>
      <button className={styles.viewAll}>
        Write Review <ChevronRight size={16} />
      </button>
    </div>
    <div className={styles.reviewsList}>
      {reviews.map((review, idx) => (
        <div key={idx} className={styles.reviewCard}>
          <div className={styles.reviewCardHeader}>
            <div className={styles.reviewer}>
              <div className={styles.reviewerAvatar}>
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className={styles.reviewerProfileImage}
                  />
                ) : (
                  "A"
                )}
              </div>
              <div>
                <h4>Amina</h4>
                <div className={styles.reviewMeta}>
                  <span>{review.date}</span>
                  <span>•</span>
                  <span>Posted {review.posted}</span>
                </div>
              </div>
            </div>
            <div className={styles.reviewRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  size={16}
                  fill={star <= review.rating ? "#10b981" : "none"}
                  color={star <= review.rating ? "#10b981" : "#d1d5db"}
                />
              ))}
            </div>
          </div>
          <p className={styles.reviewContent}>{review.content}</p>
        </div>
      ))}
    </div>
  </section>
);

export default YourReviews;
