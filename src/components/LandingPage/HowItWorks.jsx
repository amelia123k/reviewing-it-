import styles from "./HowItWorks.module.css";

const steps = [
  {
    n: "1",
    icon: "🔍",
    title: "Search a number",
    desc: "Enter the vendor's WhatsApp number and instantly see if they're listed.",
  },
  {
    n: "2",
    icon: "⭐",
    title: "Read the reviews",
    desc: "See honest ratings and comments from real people who've bought from them.",
  },
  {
    n: "3",
    icon: "✍️",
    title: "Leave your review",
    desc: "Bought from someone? Write a quick review and help the next buyer.",
  },
];

const HowItWorks = () => (
  <section className={styles.hiw} id="how-it-works">
    <div className={styles.hiwIn}>
      <div className={styles.sectionLabel}>How It Works</div>
      <h2 className={styles.sectionH2}>
        Three steps.
        <br />
        <em>That's it.</em>
      </h2>
      <p className={styles.sectionSub}>
        No app to download. No account needed. Just the truth about who you're
        buying from.
      </p>
      <div className={styles.steps}>
        {steps.map((s) => (
          <div key={s.n} className={styles.step}>
            <div className={styles.stepNum}>{s.n}</div>
            <div className={styles.stepIcon}>{s.icon}</div>
            <div className={styles.stepTitle}>{s.title}</div>
            <div className={styles.stepDesc}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
