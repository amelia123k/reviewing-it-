import { useNavigate } from "react-router-dom";
import styles from "./CTA.module.css";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.cta}>
      <div className={styles.ctaIn}>
        <h2>
          Ready to buy <em>smarter?</em>
        </h2>
        <p>
          Search your first vendor right now — it's free, it's fast, and it
          could save you from a bad experience.
        </p>
        <div className={styles.ctaBtns}>
          {/* User → /login  |  Vendor → /signup */}
          <button className={styles.btnMain} onClick={() => navigate("/login")}>
            Search a Vendor 
          </button>
          <button className={styles.btnSec} onClick={() => navigate("/signup")}>
            Add Your Business
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
