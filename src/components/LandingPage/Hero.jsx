import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const proofAvatars = [
  { color: "#3A7D44", letter: "A" },
  { color: "#C8861A", letter: "G" },
  { color: "#6366F1", letter: "B" },
  { color: "#E87A5A", letter: "N" },
];

const Hero = ({ onSearch }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Search Free → send to user login
    navigate("/login");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroTag}>🌍 Built for Cameroon</div>

        <h1 className={styles.heroH1}>
          Know who to trust
          <br />
          before you <em>pay.</em>
        </h1>

        <p className={styles.heroP}>
          WhatsApp vendors are everywhere. But are they reliable? Search any
          vendor number right now — no account needed.
        </p>

        {/* Search Free → /login (user) */}
        <form className={styles.heroSearch} onSubmit={handleSearch}>
          <div className={styles.searchInputWrap}>
            <span className={styles.searchIcon}>📱</span>
            <input
              type="text"
              placeholder="Enter vendor phone number..."
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button type="submit" className={styles.searchBtn}>
            Search Free →
          </button>
        </form>

        <div className={styles.heroBtns}>
          {/* Review a Vendor → user login */}
          <button className={styles.btnMain} onClick={() => navigate("/login")}>
            ⭐ Review a Vendor
          </button>
          {/* Add a Vendor → business login */}
          <button className={styles.btnSec} onClick={() => navigate("/signup")}>
            ➕ Add a Vendor
          </button>
        </div>

        <div className={styles.proof}>
          <div className={styles.proofAvs}>
            {proofAvatars.map((av, i) => (
              <div
                key={i}
                className={styles.proofAv}
                style={{ background: av.color, zIndex: 4 - i }}
              >
                {av.letter}
              </div>
            ))}
          </div>
          <span className={styles.proofTxt}>
            <strong>1,200+ vendors</strong> reviewed by real buyers
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
