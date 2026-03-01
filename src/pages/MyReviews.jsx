import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import styles from "./MyReviews.module.css";

const myReviews = [
  {
    id: 1,
    vendor: "Mama's Kitchen",
    number: "+237 650 123 789",
    rating: 5,
    date: "Apr 17, 2024",
    content:
      "Ordered jollof and chicken, arrived on time, food was so delicious! 🥰",
    status: "Published",
  },
  {
    id: 2,
    vendor: "Tech Hub",
    number: "+237 651 456 234",
    rating: 1,
    date: "Apr 17, 2024",
    content: "Scammer! This vendor blocked me after I sent the money. Avoid!",
    status: "Published",
  },
];

const MyReviews = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>My Reviews</h1>
      </div>

      <div className={styles.reviewsGrid}>
        {myReviews.map((review) => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <div>
                <h3>{review.vendor}</h3>
                <p className={styles.vendorNumber}>{review.number}</p>
              </div>
              <span className={styles.reviewStatus}>{review.status}</span>
            </div>

            <div className={styles.reviewRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill={star <= review.rating ? "#10b981" : "none"}
                  color={star <= review.rating ? "#10b981" : "#d1d5db"}
                />
              ))}
              <span className={styles.reviewDate}>{review.date}</span>
            </div>

            <p className={styles.reviewText}>{review.content}</p>

            <div className={styles.reviewActions}>
              <button className={styles.editBtn}>Edit</button>
              <button className={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
