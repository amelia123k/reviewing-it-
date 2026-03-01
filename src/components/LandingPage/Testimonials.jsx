import Star from "./Star";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    text: "I lost 15,000 FCFA to a fake vendor before this existed. Now I always check first. No more scams.",
    name: "Amina T.",
    role: "Buyer · Buea",
    color: "#3A7D44",
    init: "A",
  },
  {
    text: "My food business grew because customers could trust me. My 4.9 rating speaks for itself.",
    name: "Grace N.",
    role: "Vendor · Douala",
    color: "#C8861A",
    init: "G",
  },
  {
    text: "Just search the number. It's so simple. I recommended it to my whole group chat.",
    name: "Bertrand F.",
    role: "Buyer · Yaoundé",
    color: "#6366F1",
    init: "B",
  },
];

const Testimonials = () => (
  <section className={styles.testi}>
    <div className={styles.testiIn}>
      <div className={styles.sectionLabel}>Real People</div>
      <h2 className={styles.sectionH2}>What buyers are saying</h2>
      <div className={styles.testiGrid}>
        {testimonials.map((t, i) => (
          <div key={i} className={styles.tc}>
            <div className={styles.tcStars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} />
              ))}
            </div>
            <div className={styles.tcText}>"{t.text}"</div>
            <div className={styles.tcAuthor}>
              <div className={styles.tcAvatar} style={{ background: t.color }}>
                {t.init}
              </div>
              <div>
                <div className={styles.tcName}>{t.name}</div>
                <div className={styles.tcRole}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
