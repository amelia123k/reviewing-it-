import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <a className={styles.logo} href="#">
        <div className={styles.logoIcon}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <span className={styles.logoText}>
          Safe<span>Buy</span>
        </span>
      </a>

      <div className={styles.navLinks}>
        <a href="#how-it-works">How It Works</a>
        <a href="#vendors">Vendors</a>
        <a href="#about">About</a>
      </div>

      <div className={styles.navRight}>
        <button className={styles.navGhost} onClick={() => navigate("/user")}>
          Log in
        </button>
        <button className={styles.navBtn} onClick={() => navigate("/user")}>
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
