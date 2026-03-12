import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './VendorPreview.module.css';

const RatingBar = ({ count, total, stars }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className={styles['vpr-bar-row']}>
      <span className={styles['vpr-bar-lbl']}>{stars}★</span>
      <div className={styles['vpr-bar-track']}>
        <div className={styles['vpr-bar-fill']} style={{ width:`${pct}%` }} />
      </div>
      <span className={styles['vpr-bar-cnt']}>{count}</span>
    </div>
  );
};

export default function VendorPreview({ vendor, onClose, initialTab = 'reviews' }) {
  const navigate = useNavigate();
  const { user, saveReturnTo, addReview } = useAuth();

  if (!vendor) return null;

  const [tab,           setTab]          = useState(initialTab);
  const [selectedStars, setSelectedStars]= useState(0);
  const [reviewText,    setReviewText]   = useState('');
  const [localReviews,  setLocalReviews] = useState(vendor.reviews);
  const [submitted,     setSubmitted]    = useState(false);
  const [saved,         setSaved]        = useState(false);
  const [reported,      setReported]     = useState(false);
  const [showDetails,   setShowDetails]  = useState(false);

  const dist = [5,4,3,2,1].map(s => ({
    stars: s,
    count: localReviews.filter(r => r.stars === s).length,
  }));

  const trust =
    vendor.rating >= 4.5 ? { label:'Highly Trusted', icon:'🛡️', color:'#166534' } :
    vendor.rating >= 3.5 ? { label:'Generally Safe', icon:'✅', color:'#854D0E' } :
{ label:'Use Caution',    icon:'⚠️', color:'#991B1B' };

  const handleSubmit = () => {
    if (!selectedStars) return;

    const newReview = {
      id:          Date.now(),
      vendorId:    vendor.id,
      vendorName:  vendor.name,
      vendorColor: vendor.color,
      stars:       selectedStars,
      text:        reviewText.trim() || 'No comment.',
      date:        new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }),
      author:      user?.name || 'Anonymous',
    };

    // Update local display in this modal
    setLocalReviews(prev => [newReview, ...prev]);

    // ← Save to global AuthContext so MyReviews page sees it
    addReview(newReview);

    setSelectedStars(0);
    setReviewText('');
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTab('reviews'); }, 1200);
  };

  const handleWriteTabClick = () => {
    if (!user) {
      saveReturnTo({ path: `/dashboard?vendor=${vendor.id}&write=1` });
      navigate('/login');
    } else {
      setTab('write');
    }
  };

  const handleSave = () => {
    if (!user) { saveReturnTo({ path: `/dashboard?vendor=${vendor.id}` }); navigate('/login'); return; }
    setSaved(s => !s);
  };

  const handleReport = () => {
    if (!user) { saveReturnTo({ path: `/dashboard?vendor=${vendor.id}` }); navigate('/login'); return; }
    setReported(s => !s);
  };

  return (
    <div className={styles['vpr-overlay']} onClick={onClose}>
      <div className={styles['vpr-modal']} onClick={e => e.stopPropagation()}>

        {/* TOP BAR */}
        <div className={styles['vpr-topbar']}>
          <div className={styles['vpr-pill']} />
          <button className={styles['vpr-closebtn']} onClick={onClose}>✕</button>
        </div>

        {/* VENDOR IDENTITY */}
        <div className={styles['vpr-identity']}>
          <div className={styles['vpr-avatar']} style={{ background: vendor.color }}>{vendor.name[0]}</div>
          <div className={styles['vpr-iinfo']}>
            <h2 className={styles['vpr-iname']}>{vendor.name}</h2>
            <div className={styles['vpr-chips']}>
              <span className={styles['vpr-chip']}>📍 {vendor.city}</span>
              <span className={styles['vpr-chip']}>{vendor.category}</span>
            </div>
            <div className={styles['vpr-quick-actions']}>
              <button
                className={`${styles['vpr-qa-btn']}${saved ? ' '+styles['saved'] : ''}`}
                onClick={handleSave}
              >
                <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button
                className={`${styles['vpr-qa-btn']} ${styles['vpr-qa-report']}${reported ? ' '+styles['reported'] : ''}`}
                onClick={handleReport}
              >
                <Flag size={13} fill={reported ? 'currentColor' : 'none'} />
                {reported ? 'Reported' : 'Report'}
              </button>
            </div>
          </div>
        </div>

        {/* VIEW DETAILS TOGGLE */}
        <button className={styles['vpr-details-toggle']} onClick={() => setShowDetails(d => !d)}>
          {showDetails ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
          {showDetails ? 'Hide details' : 'View details'}
        </button>

        {showDetails && (
          <div className={styles['vpr-details']}>
            <div className={styles['vpr-detail-row']}>
              <span className={styles['vpr-detail-label']}>📞 Phone</span>
              <span className={styles['vpr-detail-value']}>{vendor.number}</span>
            </div>
            <div className={styles['vpr-detail-row']}>
              <span className={styles['vpr-detail-label']}>📍 City</span>
              <span className={styles['vpr-detail-value']}>{vendor.city}</span>
            </div>
            <div className={styles['vpr-detail-row']}>
              <span className={styles['vpr-detail-label']}>🏷️ Category</span>
              <span className={styles['vpr-detail-value']}>{vendor.category}</span>
            </div>
          </div>
        )}

        {/* SCORE ROW */}
        <div className={styles['vpr-scorerow']}>
          <div className={styles['vpr-scorebig']}>
            <span className={styles['vpr-scorenum']}>{vendor.rating}</span>
            <span className={styles['vpr-scoreof']}>/5</span>
          </div>
          <div className={styles['vpr-bars']}>
            {dist.map(d => (
              <RatingBar key={d.stars} stars={d.stars} count={d.count} total={localReviews.length} />
            ))}
          </div>
          <div className={styles['vpr-trust']} style={{ borderColor: trust.color }}>
            <span className={styles['vpr-ticon']}>{trust.icon}</span>
            <span className={styles['vpr-tlabel']} style={{ color: trust.color }}>{trust.label}</span>
          </div>
        </div>

        {/* TABS */}
        <div className={styles['vpr-tabs']}>
          <button
            className={`${styles['vpr-tab']}${tab==='reviews' ? ' '+styles['active'] : ''}`}
            onClick={() => setTab('reviews')}
          >
            What people say ({localReviews.length})
          </button>
          <button
            className={`${styles['vpr-tab']}${tab==='write' ? ' '+styles['active'] : ''}`}
            onClick={handleWriteTabClick}
          >
            write a review and  rate this vendor
          </button>
        </div>

        {/* REVIEWS TAB */}
        {tab === 'reviews' && (
          <div className={styles['vpr-feed']}>
            {localReviews.length === 0
              ? <p className={styles['vpr-empty']}>No reviews yet. Be the first!</p>
              : localReviews.map((r, i) => (
                <div key={i} className={styles['vpr-bubble']}>
                  <div className={styles['vpr-btop']}>
                    <div className={styles['vpr-bav']}>{r.author[0]}</div>
                    <div>
                      <p className={styles['vpr-bauthor']}>{r.author}</p>
                      <p className={styles['vpr-bdate']}>{r.date}</p>
                    </div>
                    <div className={styles['vpr-bstars']}>{'★'.repeat(r.stars)}{'☆'.repeat(5-r.stars)}</div>
                  </div>
                  <p className={styles['vpr-btxt']}>{r.text}</p>
                  <div className={styles['vpr-bactions']}>
                    <button className={styles['vpr-baction']}>👍 Helpful</button>
                    <button className={styles['vpr-baction']}>👎 Not helpful</button>
                  </div>
                </div>
              ))
            }
          </div>
        )}

        {/* WRITE TAB */}
        {tab === 'write' && user && (
          <div className={styles['vpr-write']}>
            <div className={styles['vpr-posting-as']}>
              <div className={styles['vpr-pa-av']}>{user.name[0]}</div>
              <div>
                <p className={styles['vpr-pa-name']}>Posting as <strong>{user.name}</strong></p>
                <p className={styles['vpr-pa-email']}>{user.email}</p>
              </div>
            </div>
            <p className={styles['vpr-wprompt']}>How was your experience with <strong>{vendor.name}</strong>?</p>
            <div className={styles['vpr-emoji']}>
              {[
                { stars:1, emoji:'😡', label:'Terrible' },
                { stars:2, emoji:'😕', label:'Bad'      },
                { stars:3, emoji:'😐', label:'Okay'     },
                { stars:4, emoji:'😊', label:'Good'     },
                { stars:5, emoji:'🤩', label:'Amazing'  },
              ].map(opt => (
                <button
                  key={opt.stars}
                  className={`${styles['vpr-emojibtn']}${selectedStars===opt.stars?' '+styles['active']:''}`}
                  onClick={() => setSelectedStars(opt.stars)}
                >
                  <span className={styles['vpr-eicon']}>{opt.emoji}</span>
                  <span className={styles['vpr-elabel']}>{opt.label}</span>
                </button>
              ))}
            </div>
            <textarea
              className={styles['vpr-winput']}
              placeholder="Tell others what you experienced — delivery, quality, communication..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              rows={4}
            />
            <button
              className={styles['vpr-wsubmit']}
              onClick={handleSubmit}
              disabled={!selectedStars}
              style={{ opacity: selectedStars ? 1 : 0.5 }}
            >
              🛡️ {submitted ? '✅ Posted!' : 'Post Review'}
            </button>
            <p className={styles['vpr-wdisclaimer']}>Your review helps protect others in the community.</p>
          </div>
        )}

      </div>
    </div>
  );
}