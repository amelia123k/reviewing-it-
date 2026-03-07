import "./VendorProfile.css";

const Star = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function VendorProfile({ info, onEdit }) {
  return (
    <div className="vp-two">
      <div className="vp-card">
        <div className="vp-cardhead">
          <p className="vp-ctitle">Business Profile</p>
          <button className="vp-editbtn" onClick={onEdit}>
            ✏️ Edit
          </button>
        </div>
        {[
          { icon: "🍽️", lbl: "Name", val: info.name },
          { icon: "📞", lbl: "WhatsApp", val: info.phone },
          { icon: "📍", lbl: "Location", val: info.location },
          { icon: "🏷️", lbl: "Category", val: info.category },
          { icon: "📝", lbl: "Bio", val: info.bio },
        ].map((p, i) => (
          <div key={i} className="vp-row">
            <div className="vp-icon">{p.icon}</div>
            <div>
              <p className="vp-lbl">{p.lbl}</p>
              <p className="vp-val">{p.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="vp-pcard">
        <div className="vp-ptop">
          <div className="vp-pav">🍽️</div>
          <p className="vp-pname">{info.name}</p>
          <p className="vp-pcat">
            {info.category} · {info.location}
          </p>
          <div className="vp-prating">
            <span className="vp-rnum">4.8</span>
            <div>
              <div className="vp-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="vp-rcnt">28 reviews</p>
            </div>
          </div>
        </div>
        <div className="vp-trust">
          <p className="vp-tlbl">Trust Score</p>
          <div className="vp-tbar">
            <div className="vp-tfill" style={{ width: "82%" }} />
          </div>
          <div className="vp-trow">
            <p className="vp-tnum">82/100</p>
            <p className="vp-tdesc">Very Good 🌟</p>
          </div>
        </div>
      </div>
    </div>
  );
}
