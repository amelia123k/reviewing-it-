import React, { useState } from "react";
import { Coffee, Smartphone, Wrench } from "lucide-react";

import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import TopBar from "../components/Dashboard/TopBar/TopBar";
import StatsGrid from "../components/Dashboard/Stats/StatsGrid";
import RecentSearches from "../components/Dashboard/RecentSearches/RecentSearches";
import RecentPeople from "../components/Dashboard/RecentPeople/RecentPeople";
import YourReviews from "../components/Dashboard/YourReviews/YourReviews";
import SearchPopup from "../components/Dashboard/SearchPopup/SearchPopup";
import BottomNav from "../components/Dashboard/BottomNav/BottomNav";

import styles from "./Dashboard.module.css";

const categories = [
  "All Categories",
  "Food",
  "Phones & Gadgets",
  "Services",
  "Fashion",
  "Electronics",
  "Automotive",
];

const recentSearches = [
  {
    number: "+237 650 123 789",
    category: "Food",
    rating: 4.2,
    icon: Coffee,
    name: "Mama's Kitchen",
  },
  {
    number: "+237 651 456 234",
    category: "Phones & Gadgets",
    rating: 2.0,
    icon: Smartphone,
    name: "Tech Hub",
  },
  {
    number: "+237 652 789 567",
    category: "Services",
    rating: 4.8,
    icon: Wrench,
    name: "Quick Repairs",
  },
];

const recentPeople = [
  {
    name: "John Doe",
    action: "reviewed",
    target: "Mama's Kitchen",
    time: "5 min ago",
    avatar: "JD",
  },
  {
    name: "Sarah Smith",
    action: "reported",
    target: "Tech Hub",
    time: "15 min ago",
    avatar: "SS",
  },
  {
    name: "Mike Johnson",
    action: "saved",
    target: "Quick Repairs",
    time: "32 min ago",
    avatar: "MJ",
  },
  {
    name: "Emma Wilson",
    action: "commented on",
    target: "Spice Delight",
    time: "1 hour ago",
    avatar: "EW",
  },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);
  const [searchNumber, setSearchNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
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
      recentSearches.filter(
        (item) =>
          (selectedCategory === "All Categories" ||
            !selectedCategory ||
            item.category === selectedCategory) &&
          (searchNumber === "" || item.number.includes(searchNumber)),
      ),
    );
  };

  const handleBottomNav = (tab) => {
    setActiveTab(tab);
    if (tab === "add") {
      document
        .querySelector('[class*="yourReviews"]')
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "report") {
      document
        .querySelector('[class*="recentPeople"]')
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file);
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profile-upload-input").click();
  };

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

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        profileImagePreview={profileImagePreview}
        triggerFileInput={triggerFileInput}
        setSearchPopupOpen={setSearchPopupOpen}
      />

      <main className={styles.mainContent}>
        <TopBar
          setSidebarOpen={setSidebarOpen}
          notifications={notifications}
          markAsRead={markAsRead}
          profileImagePreview={profileImagePreview}
          triggerFileInput={triggerFileInput}
        />

        <StatsGrid />

        <div className={styles.twoColumnLayout}>
          <div className={styles.leftColumn}>
            <RecentSearches recentSearches={recentSearches} />
            <RecentPeople recentPeople={recentPeople} />
          </div>
          <div className={styles.rightColumn}>
            <YourReviews profileImagePreview={profileImagePreview} />
          </div>
        </div>

        <BottomNav activeTab={activeTab} handleBottomNav={handleBottomNav} />
      </main>
    </div>
  );
};

export default Dashboard;
