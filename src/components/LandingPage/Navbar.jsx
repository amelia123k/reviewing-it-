import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";

const RolePicker = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.rpOverlay} onClick={onClose}>
      <div className={styles.rpModal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.rpClose} onClick={onClose}>
          ✕
        </button>

        <div className={styles.rpTop}>
          <div className={styles.rpLogo}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h2 className={styles.rpTitle}>Welcome to SafeBuy</h2>
          <p className={styles.rpSub}>Choose how you want to get started</p>
        </div>

        <div className={styles.rpCards}>
          <div className={styles.rpCard} onClick={() => navigate("/login")}>
            <div
              className={styles.rpCardIcon}
              style={{ background: "#F0FDF4" }}
            >
              
            </div>
            <div className={styles.rpCardText}>
              <p className={styles.rpCardTitle}>I'm a Buyer</p>
              <p className={styles.rpCardDesc}>
                Search vendors, read reviews and stay safe while buying online
              </p>
            </div>
            <span className={styles.rpArrow}>→</span>
          </div>

          <div className={styles.rpCard} onClick={() => navigate("/signup")}>
            <div
              className={styles.rpCardIcon}
              style={{ background: "#FFF7ED" }}
            >
              
            </div>
            <div className={styles.rpCardText}>
              <p className={styles.rpCardTitle}>I'm a Vendor</p>
              <p className={styles.rpCardDesc}>
                List your business, build trust and reach more customers
              </p>
            </div>
            <span className={styles.rpArrow}>→</span>
          </div>
        </div>

        <p className={styles.rpNote}>It's completely free to get started </p>
      </div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        {/* LOGO — shows your image with SafeBuy text beside it */}
        <button className={styles.logo} onClick={() => navigate('/')}>
          <img src={logo} alt="SafeBuy" className={styles.logoImg} />
          <span className={styles.logoText}>
            Safe<span>Buy</span>
          </span>
        </button>

        <div className={styles.navLinks}>
          <a href="#how-it-works">How It Works</a>
          
          <a href="#about">About</a>
        </div>

        <div className={styles.navRight}>
          <button
            className={styles.navGhost}
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button className={styles.navBtn} onClick={() => setShowPicker(true)}>
            Get Started
          </button>
        </div>
      </nav>

      {showPicker && <RolePicker onClose={() => setShowPicker(false)} />}
    </>
  );
};

export default Navbar;
