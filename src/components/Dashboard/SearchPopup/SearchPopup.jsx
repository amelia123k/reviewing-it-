import React from "react";
import { X, Phone, Filter, Search, Star as StarIcon } from "lucide-react";
import styles from "./SearchPopup.module.css";

const SearchPopup = ({
  searchNumber,
  setSearchNumber,
  selectedCategory,
  setSelectedCategory,
  searchResults,
  handleSearch,
  onClose,
  categories,
}) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
      <div className={styles.header}>
        <h3>Search Vendor</h3>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.field}>
          <label>Phone Number</label>
          <div className={styles.inputWithIcon}>
            <Phone size={18} />
            <input
              type="text"
              placeholder="Enter vendor number..."
              value={searchNumber}
              onChange={(e) => setSearchNumber(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label>Category</label>
          <div className={styles.selectWithIcon}>
            <Filter size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat === "All Categories" ? "" : cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className={styles.searchBtn} onClick={handleSearch}>
          <Search size={18} /> Search Now
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className={styles.results}>
          <h4>Search Results</h4>
          {searchResults.map((result, idx) => {
            const Icon = result.icon;
            return (
              <div key={idx} className={styles.resultItem}>
                <div className={styles.resultIcon}>
                  <Icon size={20} />
                </div>
                <div className={styles.resultDetails}>
                  <span className={styles.resultNumber}>{result.number}</span>
                  <span className={styles.resultCategory}>
                    {result.category}
                  </span>
                </div>
                <div className={styles.resultRating}>
                  <StarIcon size={14} fill="#10b981" color="#10b981" />
                  <span>{result.rating}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
);

export default SearchPopup;
