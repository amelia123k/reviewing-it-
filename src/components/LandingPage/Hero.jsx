import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import styles from './Hero.module.css';

const proofAvatars = [
  { color: '#3A7D44', letter: 'A' },
  { color: '#C8861A', letter: 'G' },
  { color: '#6366F1', letter: 'B' },
  { color: '#E87A5A', letter: 'N' },
];

// Cameroon phone number validation
const isValidCameroonNumber = (number) => {
  // remove spaces, brackets, dashes
  const cleaned = number.replace(/[\s\-()]/g, '');

  const patterns = [
    /^6\d{8}$/,        // 683893731
    /^2\d{8}$/,        // landline example
    /^\+2376\d{8}$/,   // +237683893731
    /^\+2372\d{8}$/,   // +2372XXXXXXXX
    /^2376\d{8}$/,     // 237683893731
    /^2372\d{8}$/      // 2372XXXXXXXX
  ];

  return patterns.some(pattern => pattern.test(cleaned));
};

const Hero = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const q = number.trim();

    setError('');

    if (!q) {
      setError('Please enter a phone number');
      return;
    }

    if (!isValidCameroonNumber(q)) {
      setError('Enter a valid Cameroon number e.g. 683893731 or +237683893731');
      return;
    }

    navigate(`/dashboard?q=${encodeURIComponent(q)}`);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroTag}> Built for Cameroon</div>

        <h1 className={styles.heroH1}>
          Know who to trust<br />before you <em>pay.</em>
        </h1>

        <p className={styles.heroP}>
          WhatsApp vendors are everywhere. But are they reliable?
          Search any vendor number right now 
        </p>

        <form className={styles.heroSearch} onSubmit={handleSearch}>
          <div className={styles.searchInputWrap}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Enter vendor phone number..."
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                setError('');
              }}
              className={styles.searchInput}
            />
          </div>

          <button type="submit" className={styles.searchBtn}>
            Search 
          </button>
        </form>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div className={styles.heroBtns}>
          <button
            className={styles.btnMain}
            onClick={() => navigate('/dashboard')}
          >
             Browse Vendors
          </button>

          <button
            className={styles.btnSec}
            onClick={() => navigate('/signup')}
          >
            List Your Business
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
            <strong>20+ vendors</strong> reviewed by real buyers
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;