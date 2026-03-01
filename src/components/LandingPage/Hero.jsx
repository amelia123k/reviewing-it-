import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const proofAvatars = [
  { color: "#3A7D44", letter: "A" },
  { color: "#C8861A", letter: "G" },
  { color: "#6366F1", letter: "B" },
  { color: "#E87A5A", letter: "N" },
];

const Hero = () => {
  const navigate = useNavigate();

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
          WhatsApp vendors are everywhere. But are they reliable? Check real
          reviews from real buyers — using just a phone number.
        </p>

        <div className={styles.heroBtns}>
          <button className={styles.btnMain} onClick={() => navigate("/user")}>
            Add a Vendor
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <button
            className={styles.btnSec}
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            How it works
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
