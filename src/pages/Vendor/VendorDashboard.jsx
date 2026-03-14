import './VendorOverview.css';

export default function VendorOverview({ info }) {
  return (
    <div className="vov-page">

      <div className="vov-stats">
        <div className="vov-stat">
          <p className="vov-num">4.8</p>
          <p className="vov-lbl">Avg Rating</p>
        </div>
        <div className="vov-stat">
          <p className="vov-num">28</p>
          <p className="vov-lbl">Reviews</p>
        </div>
        <div className="vov-stat">
          <p className="vov-num">14</p>
          <p className="vov-lbl">Saved By</p>
        </div>
        <div className="vov-stat vov-stat-alert">
          <p className="vov-num">1</p>
          <p className="vov-lbl">Complaint</p>
        </div>
      </div>

      <div className="vov-card">
        <div className="vov-row">
          <span className="vov-key">Business</span>
          <span className="vov-val">{info.name}</span>
        </div>
        <div className="vov-row">
          <span className="vov-key">WhatsApp</span>
          <span className="vov-val">{info.phone}</span>
        </div>
        <div className="vov-row">
          <span className="vov-key">Location</span>
          <span className="vov-val">{info.location}</span>
        </div>
        <div className="vov-row">
          <span className="vov-key">Category</span>
          <span className="vov-val">{info.category}</span>
        </div>
        {info.bio && (
          <div className="vov-row">
            <span className="vov-key">Bio</span>
            <span className="vov-val">{info.bio}</span>
          </div>
        )}
        <div className="vov-row">
          <span className="vov-key">Trust Score</span>
          <span className="vov-val vov-trust">82 / 100 — Very Good 🌟</span>
        </div>
      </div>

    </div>
  );
}
