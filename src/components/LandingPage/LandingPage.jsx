import { useState } from 'react';
import Navbar       from './Navbar.jsx';
import Hero         from './Hero.jsx';
import VendorPreview from '../VendorPreview.jsx';
import HowItWorks   from './HowItWorks.jsx';
import About        from './About.jsx';
import Testimonials from './Testimonials.jsx';
import CTA          from './CTA.jsx';
import Footer       from './Footer.jsx';
import styles       from './LandingPage.module.css';

const LandingPage = () => {
  const [searchNumber, setSearchNumber] = useState('');

  return (
    <div className={styles.page}>
      <Navbar />
      <Hero onSearch={setSearchNumber} />
      <VendorPreview searchNumber={searchNumber} />
      <HowItWorks />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;