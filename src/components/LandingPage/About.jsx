import styles from "./About.module.css";

const stats = [
  { num: "1,200+", label: "Vendors Listed" },
  { num: "4,800+", label: "Reviews Written" },
  { num: "12,000+", label: "Buyers Protected" },
  { num: "97%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: "🛡️",
    title: "Trust First",
    desc: "Every feature we build is designed to protect buyers and reward honest vendors.",
  },
  {
    icon: "🌍",
    title: "Built for Us",
    desc: "SafeBuy is made specifically for Cameroon — our language, our markets, our problems.",
  },
  {
    icon: "⭐",
    title: "Real Reviews",
    desc: "No fake ratings. Reviews come from verified buyers who actually transacted.",
  },
  {
    icon: "🤝",
    title: "Fair to Vendors",
    desc: "Good vendors get visibility. We help trustworthy businesses grow their reputation.",
  },
];

const About = () => (
  <section className={styles.about} id="about">
    <div className={styles.inner}>
      {/* HEADER */}
      <div className={styles.header}>
        <span className={styles.label}>About SafeBuy</span>
        <h2 className={styles.h2}>
          We believe every buyer in
          <br />
          <em>Cameroon deserves protection.</em>
        </h2>
        <p className={styles.sub}>
          SafeBuy was born from a real problem — too many people were getting
          scammed by WhatsApp vendors with no way to check if they were
          trustworthy. We built the solution: a free, community-driven platform
          where you can search any vendor, read honest reviews, and buy with
          confidence.
        </p>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        {stats.map((s, i) => (
          <div key={i} className={styles.stat}>
            <p className={styles.statNum}>{s.num}</p>
            <p className={styles.statLbl}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* MISSION */}
      <div className={styles.mission}>
        <div className={styles.missionText}>
          <span className={styles.label}>Our Mission</span>
          <h3 className={styles.missionH}>
            Making commerce safe,
            <br />
            one review at a time.
          </h3>
          <p className={styles.missionP}>
            In Cameroon's informal economy, trust is everything. Vendors build
            their businesses on WhatsApp, Facebook and word of mouth — but there
            was never a central place to verify their reputation. SafeBuy
            changes that.
          </p>
          <p className={styles.missionP}>
            Whether you're buying food, fashion, electronics or beauty products
            — you deserve to know who you're dealing with before you send that
            mobile money.
          </p>
        </div>
        <div className={styles.missionCard}>
          <div className={styles.mcIcon}>🌿</div>
          <p className={styles.mcQuote}>
            "Commerce should work for everyone — not just people with
            connections."
          </p>
          <p className={styles.mcAuthor}>— Amina N., Founder</p>
        </div>
      </div>

      {/* VALUES */}
      <div className={styles.valuesWrap}>
        <span className={styles.label}>What We Stand For</span>
        <div className={styles.values}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueCard}>
              <div className={styles.valueIcon}>{v.icon}</div>
              <h4 className={styles.valueTitle}>{v.title}</h4>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
