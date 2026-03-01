import Navbar from './Navbar';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import CTA from './CTA';
import Footer from './Footer';
import styles from './LandingPage.module.css';

const LandingPage = () => (
  <div className={styles.page}>
    <Navbar />
    <Hero />
    <HowItWorks />
    <Testimonials />
    <CTA />
    <Footer />
  </div>
);

export default LandingPage;