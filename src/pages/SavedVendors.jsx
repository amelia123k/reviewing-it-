import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Bookmark, Phone, MapPin } from "lucide-react";
import styles from "./SavedVendors.module.css";

const savedVendors = [
  {
    id: 1,
    name: "Mama's Kitchen",
    number: "+237 650 123 789",
    category: "Food",
    rating: 4.2,
    location: "Buea",
    savedDate: "Apr 15, 2024",
  },
  {
    id: 2,
    name: "Quick Repairs",
    number: "+237 652 789 567",
    category: "Services",
    rating: 4.8,
    location: "Douala",
    savedDate: "Apr 10, 2024",
  },
  {
    id: 3,
    name: "Style Africa",
    number: "+237 654 567 123",
    category: "Fashion",
    rating: 3.9,
    location: "Yaoundé",
    savedDate: "Apr 5, 2024",
  },
];

const SavedVendors = () => {
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
        <h1>Saved Vendors</h1>
        <p className={styles.pageSubtitle}>
          Vendors you've bookmarked for later
        </p>
      </div>

      <div className={styles.vendorsGrid}>
        {savedVendors.map((vendor) => (
          <div key={vendor.id} className={styles.vendorCard}>
            <div className={styles.vendorCardHeader}>
              <div>
                <h3>{vendor.name}</h3>
                <span className={styles.vendorCategory}>{vendor.category}</span>
              </div>
              <Bookmark
                className={styles.savedIcon}
                size={20}
                fill="#10b981"
                color="#10b981"
              />
            </div>

            <div className={styles.vendorDetails}>
              <p className={styles.vendorPhone}>
                <Phone size={14} />
                {vendor.number}
              </p>
              <p className={styles.vendorLocation}>
                <MapPin size={14} />
                {vendor.location}
              </p>
            </div>

            <div className={styles.vendorFooter}>
              <div className={styles.vendorRating}>
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>{vendor.rating}</span>
              </div>
              <span className={styles.savedDate}>Saved {vendor.savedDate}</span>
            </div>

            <button className={styles.viewVendorBtn}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedVendors;
