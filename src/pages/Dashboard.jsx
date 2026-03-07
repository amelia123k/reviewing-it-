import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import TopBar from "../components/Dashboard/TopBar/TopBar";
import SearchPopup from "../components/Dashboard/SearchPopup/SearchPopup";
import BottomNav from "../components/Dashboard/BottomNav/BottomNav";
import styles from "./Dashboard.module.css";
import { Search, MapPin } from "lucide-react";
import VendorPreview from "../components/VendorPreview";

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

const vendors = [
  // Buea
  {
    id: 1,
    name: "Mokolo Kitchen",
    category: "Food & Drinks",
    number: "+237 650 234 891",
    rating: 4.8,
    color: "#1A6B3C",
    city: "Buea",
    reviews: [
      {
        stars: 5,
        text: "Best pepper soup in Buea! Always fresh.",
        date: "16 Feb 2026",
        author: "Yvonne T.",
      },
      {
        stars: 4,
        text: "Fast delivery, food still hot when it arrived.",
        date: "14 Feb 2026",
        author: "Boris N.",
      },
    ],
  },
  {
    id: 2,
    name: "Fako Styles",
    category: "Fashion",
    number: "+237 677 102 334",
    rating: 4.6,
    color: "#2D6A35",
    city: "Buea",
    reviews: [
      {
        stars: 5,
        text: "Made my dress exactly how I described it.",
        date: "15 Feb 2026",
        author: "Sandra A.",
      },
    ],
  },
  {
    id: 3,
    name: "Mountain Gadgets",
    category: "Electronics",
    number: "+237 681 556 778",
    rating: 3.5,
    color: "#4A5568",
    city: "Buea",
    reviews: [
      {
        stars: 3,
        text: "Product came but charger was missing.",
        date: "11 Feb 2026",
        author: "Kome R.",
      },
    ],
  },
  {
    id: 4,
    name: "Glow & Go Beauty",
    category: "Skin Care",
    number: "+237 699 223 445",
    rating: 4.9,
    color: "#1A6B3C",
    city: "Buea",
    reviews: [
      {
        stars: 5,
        text: "Skin cleared up in 2 weeks, 100% original.",
        date: "20 Feb 2026",
        author: "Miriam C.",
      },
      {
        stars: 5,
        text: "She explains every product before selling.",
        date: "17 Feb 2026",
        author: "Cynthia E.",
      },
    ],
  },
  {
    id: 5,
    name: "Buea Sole Shop",
    category: "Shoes",
    number: "+237 670 334 556",
    rating: 4.3,
    color: "#2D6A35",
    city: "Buea",
    reviews: [
      {
        stars: 4,
        text: "Nice quality, true to size.",
        date: "18 Feb 2026",
        author: "Frank O.",
      },
    ],
  },
  // Douala
  {
    id: 6,
    name: "Akwa Bites",
    category: "Food & Drinks",
    number: "+237 655 667 112",
    rating: 4.5,
    color: "#1A6B3C",
    city: "Douala",
    reviews: [
      {
        stars: 5,
        text: "Ndole was fresh and absolutely delicious.",
        date: "22 Feb 2026",
        author: "Claudine M.",
      },
      {
        stars: 4,
        text: "A bit slow on delivery but worth the wait.",
        date: "19 Feb 2026",
        author: "Roger T.",
      },
    ],
  },
  {
    id: 7,
    name: "Bonaberi Threads",
    category: "Fashion",
    number: "+237 699 778 990",
    rating: 4.7,
    color: "#2D6A35",
    city: "Douala",
    reviews: [
      {
        stars: 5,
        text: "Best lace fabrics in Douala, no debate.",
        date: "21 Feb 2026",
        author: "Ingrid N.",
      },
    ],
  },
  {
    id: 8,
    name: "DLA Tech Zone",
    category: "Electronics",
    number: "+237 676 889 001",
    rating: 4.1,
    color: "#1A6B3C",
    city: "Douala",
    reviews: [
      {
        stars: 4,
        text: "Original phones at fair prices.",
        date: "14 Feb 2026",
        author: "Joel A.",
      },
      {
        stars: 3,
        text: "Warranty process takes too long.",
        date: "10 Feb 2026",
        author: "Eric B.",
      },
    ],
  },
  {
    id: 9,
    name: "Deido Fix-It",
    category: "Services",
    number: "+237 651 990 112",
    rating: 4.6,
    color: "#2D6A35",
    city: "Douala",
    reviews: [
      {
        stars: 5,
        text: "Fixed my AC same day. Very professional.",
        date: "12 Feb 2026",
        author: "Patricia F.",
      },
    ],
  },
  {
    id: 10,
    name: "Littoral Wellness",
    category: "Health & Wellness",
    number: "+237 677 001 223",
    rating: 4.7,
    color: "#1A6B3C",
    city: "Douala",
    reviews: [
      {
        stars: 5,
        text: "Certified products only. I trust them completely.",
        date: "21 Feb 2026",
        author: "Estelle K.",
      },
    ],
  },
  // Yaounde
  {
    id: 11,
    name: "Mvog-Ada Eats",
    category: "Food & Drinks",
    number: "+237 670 112 445",
    rating: 4.4,
    color: "#2D6A35",
    city: "Yaounde",
    reviews: [
      {
        stars: 5,
        text: "Okok and plantains better than my mama makes.",
        date: "23 Feb 2026",
        author: "Hermine L.",
      },
    ],
  },
  {
    id: 12,
    name: "Bastos Boutique",
    category: "Fashion",
    number: "+237 655 223 556",
    rating: 4.8,
    color: "#1A6B3C",
    city: "Yaounde",
    reviews: [
      {
        stars: 5,
        text: "Top quality fabrics at very fair prices.",
        date: "20 Feb 2026",
        author: "Solange D.",
      },
      {
        stars: 5,
        text: "My go-to shop for every occasion.",
        date: "16 Feb 2026",
        author: "Pauline V.",
      },
    ],
  },
  {
    id: 13,
    name: "Yaounde Phone Hub",
    category: "Electronics",
    number: "+237 699 334 667",
    rating: 2.2,
    color: "#7B2D2D",
    city: "Yaounde",
    reviews: [
      {
        stars: 2,
        text: "Sold me a refurbished phone as brand new.",
        date: "9 Feb 2026",
        author: "Gilbert M.",
      },
    ],
  },
  {
    id: 14,
    name: "Capital Repairs",
    category: "Services",
    number: "+237 677 445 778",
    rating: 4.5,
    color: "#2D6A35",
    city: "Yaounde",
    reviews: [
      {
        stars: 5,
        text: "Very honest technician. Told me exactly what was wrong.",
        date: "22 Feb 2026",
        author: "Bertrand N.",
      },
    ],
  },
  {
    id: 15,
    name: "Nlongkak Skincare",
    category: "Skin Care",
    number: "+237 651 556 889",
    rating: 4.6,
    color: "#1A6B3C",
    city: "Yaounde",
    reviews: [
      {
        stars: 5,
        text: "Only genuine products. Fast and reliable.",
        date: "19 Feb 2026",
        author: "Adrienne P.",
      },
    ],
  },
];

const stats = [
  { value: "19", label: "Vendors Checked" },
  { value: "6", label: "Reviews Written" },
  { value: "3", label: "Scam Reports" },
  { value: "9", label: "Saved Vendors" },
];

const RatingBadge = ({ rating }) => {
  const cls =
    rating >= 4.5
      ? styles.badgeHigh
      : rating >= 3
        ? styles.badgeMid
        : styles.badgeLow;
  return (
    <div className={`${styles.ratingBadge} ${cls}`}>
      <span>{rating}</span>
      <span>/ 5</span>
    </div>
  );
};

// ── Main Dashboard 
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const [searchNumber, setSearchNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Your review received 5 likes",
      time: "5m ago",
      read: false,
    },
    { id: 2, text: "New scam alert in your area", time: "1h ago", read: false },
    {
      id: 3,
      text: "Vendor responded to your review",
      time: "3h ago",
      read: true,
    },
  ]);

  const markAsRead = (id) =>
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const handleSearch = () => {
    setSearchResults(
      vendors.filter(
        (v) =>
          (!selectedCategory ||
            selectedCategory === "All Categories" ||
            v.category === selectedCategory) &&
          (searchNumber === "" ||
            v.number.includes(searchNumber) ||
            v.name.toLowerCase().includes(searchNumber.toLowerCase())),
      ),
    );
  };

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () =>
    document.getElementById("profile-upload-input").click();

  const handleBottomNav = (tab) => {
    setActiveTab(tab);
    if (tab === "search") setSearchPopupOpen(true);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const allCats = categories.filter((c) => c !== "All Categories");
  const displayedCats = allCats
    .map((cat) => ({
      name: cat,
      vendors: vendors.filter(
        (v) =>
          (activeCategory === "All Categories" ||
            v.category === activeCategory) &&
          v.category === cat,
      ),
    }))
    .filter((c) => activeCategory === "All Categories" || c.vendors.length > 0);

  return (
    <div className={styles.dashboard}>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      <input
        type="file"
        id="profile-upload-input"
        accept="image/*"
        onChange={handleProfileImageUpload}
        style={{ display: "none" }}
      />

      {searchPopupOpen && (
        <SearchPopup
          searchNumber={searchNumber}
          setSearchNumber={setSearchNumber}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchResults={searchResults}
          handleSearch={handleSearch}
          onClose={() => setSearchPopupOpen(false)}
          categories={categories}
        />
      )}

      {selectedVendor && (
        <VendorPreview
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        profileImagePreview={profileImagePreview}
        triggerFileInput={triggerFileInput}
        setSearchPopupOpen={setSearchPopupOpen}
        notifications={notifications}
        markAsRead={markAsRead}
        stats={stats}
      />

      <main className={styles.mainContent}>
        <TopBar setSidebarOpen={setSidebarOpen} />

        {/* Search pill */}
        <div
          className={styles.searchPill}
          onClick={() => setSearchPopupOpen(true)}
        >
          <div className={styles.searchPillIcon}>
            <Search size={15} />
          </div>
          <span className={styles.searchPillText}>
            Search a vendor number or name...
          </span>
          <span className={styles.searchPillBtn}>Search</span>
        </div>

        {/* Category tabs */}
        <div className={styles.catTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.catTab} ${activeCategory === cat ? styles.catTabActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vendor sections */}
        {displayedCats.map((cat) => (
          <div key={cat.name} className={styles.catSection}>
            <div className={styles.catSectionHead}>
              <h3 className={styles.catSectionTitle}>{cat.name}</h3>
              <span className={styles.catSectionCount}>
                {cat.vendors.length} vendor{cat.vendors.length !== 1 ? "s" : ""}
              </span>
            </div>

            {cat.vendors.length === 0 ? (
              <p className={styles.noVendors}>No businesses available.</p>
            ) : (
              <div className={styles.vendorGrid}>
                {cat.vendors.map((v) => (
                  <div
                    key={v.id}
                    className={styles.vendorCard2}
                    onClick={() => setSelectedVendor(v)}
                  >
                    {/* Left color strip */}
                    <div
                      className={styles.vendorCard2Strip}
                      style={{ background: v.color }}
                    />
                    {/* Middle content */}
                    <div className={styles.vendorCard2Top}>
                      <div className={styles.vendorCard2Name}>{v.name}</div>
                      <div className={styles.vendorCard2Cat}>
                        <MapPin size={10} /> {v.city} · {v.category}
                      </div>
                      <div className={styles.vendorCard2Bottom}>
                        <div className={styles.vendorCard2Stars}>
                          {"★".repeat(Math.round(v.rating))}
                          {"☆".repeat(5 - Math.round(v.rating))}
                        </div>
                        <span className={styles.vendorCard2RevCount}>
                          {v.reviews.length} review
                          {v.reviews.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    {/* Score circle */}
                    <RatingBadge rating={v.rating} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <BottomNav activeTab={activeTab} handleBottomNav={handleBottomNav} />
      </main>
    </div>
  );
};

export default Dashboard;
