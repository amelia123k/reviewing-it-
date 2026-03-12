import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, MapPin, Phone, ArrowLeft } from "lucide-react";
import { vendors } from "./Dashboard";
import "./Searchpage.css";

const categories = [
  "All Categories",
  "Food & Drinks",
  "Fashion",
  "Electronics",
  "Services",
  "Skin Care",
  "Shoes",
  "Health & Wellness",
];

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        vendor.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getTrustBadge = (rating) => {
    if (rating >= 4.5) return { label: "Highly Trusted", color: "#166534" };
    if (rating >= 3.5) return { label: "Generally Safe", color: "#854D0E" };
    return { label: "Use Caution", color: "#991B1B" };
  };

  return (
    <div className="searchpage">
      <div className="searchpage-header">
       
        <h1>Search Vendors</h1>
        <p>Find trusted vendors in your area</p>
      </div>

      <div className="searchpage-filters">
        <div className="searchpage-searchbar">
          <Search size={20} className="searchpage-icon" />
          <input
            type="text"
            placeholder="Search by name, phone, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchpage-input"
          />
        </div>

        <div className="searchpage-category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="searchpage-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="searchpage-results">
        {filteredVendors.length === 0 ? (
          <div className="searchpage-empty">
            <Search size={48} className="searchpage-empty-icon" />
            <h3>No vendors found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="searchpage-grid">
            {filteredVendors.map((vendor) => {
              const trust = getTrustBadge(vendor.rating);
              return (
                <div key={vendor.id} className="searchpage-card">
                  <div className="searchpage-card-header">
                    <div
                      className="searchpage-avatar"
                      style={{ background: vendor.color }}
                    >
                      {vendor.name[0]}
                    </div>
                    <div className="searchpage-info">
                      <h3>{vendor.name}</h3>
                      <div className="searchpage-meta">
                        <span className="searchpage-category">
                          {vendor.category}
                        </span>
                        <span className="searchpage-rating">
                          <Star size={14} fill="#10b981" color="#10b981" />
                          {vendor.rating}
                        </span>
                      </div>
                    </div>
                    <div
                      className="searchpage-trust"
                      style={{ color: trust.color }}
                    >
                      {trust.label}
                    </div>
                  </div>

                  <div className="searchpage-details">
                    <div className="searchpage-detail">
                      <Phone size={16} />
                      <span>{vendor.number}</span>
                    </div>
                    <div className="searchpage-detail">
                      <MapPin size={16} />
                      <span>{vendor.city}</span>
                    </div>
                  </div>

                  <div className="searchpage-footer">
                    <span className="searchpage-reviews-count">
                      {vendor.reviews.length} reviews
                    </span>
                    <button
                      className="searchpage-view-btn"
                      onClick={() => navigate(`/dashboard?vendor=${vendor.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
