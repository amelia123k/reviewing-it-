import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.fLogo}>
      Safe<span>Buy</span>
    </div>
    <div className={styles.fText}>© 2026 SafeBuy · Cameroon</div>
  </footer>
);

export default Footer;
