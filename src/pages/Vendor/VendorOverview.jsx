import "./VendorOverview.css";

const CHART = [
  { m: "Aug", v: 38 },
  { m: "Sep", v: 52 },
  { m: "Oct", v: 47 },
  { m: "Nov", v: 81 },
  { m: "Dec", v: 104 },
  { m: "Jan", v: 76 },
];

const Star = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function VendorOverview({ info }) {
  return (
    <div className="ov-two">
      <div className="ov-card">
        <div className="ov-cardhead">
          <div>
            <p className="ov-ctitle">Profile Views</p>
            <p className="ov-csub">Last 6 months</p>
          </div>
          <span className="ov-tag">6 months</span>
        </div>
        <div className="ov-chart">
          {CHART.map((d, i) => (
            <div key={i} className="ov-barwrap">
              <p className="ov-barval">{d.v}</p>
              <div
                className={`ov-bar${i === 5 ? " active" : ""}`}
                style={{ height: `${(d.v / 104) * 100}%` }}
              />
              <p className="ov-barlbl">{d.m}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ov-pcard">
        <div className="ov-ptop">
          <div className="ov-pav">🍽️</div>
          <p className="ov-pname">{info.name}</p>
          <p className="ov-pcat">
            {info.category} · {info.location}
          </p>
          <div className="ov-prating">
            <span className="ov-rnum">4.8</span>
            <div>
              <div className="ov-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} />
                ))}
              </div>
              <p className="ov-rcnt">28 reviews</p>
            </div>
          </div>
        </div>
        {[
          { icon: "📞", lbl: "WhatsApp", val: info.phone },
          { icon: "📍", lbl: "Location", val: info.location },
          { icon: "🏷️", lbl: "Category", val: info.category },
        ].map((p, i) => (
          <div key={i} className="ov-pirow">
            <div className="ov-piicon">{p.icon}</div>
            <div>
              <p className="ov-pilbl">{p.lbl}</p>
              <p className="ov-pival">{p.val}</p>
            </div>
          </div>
        ))}
        <div className="ov-trust">
          <p className="ov-tlbl">Trust Score</p>
          <div className="ov-tbar">
            <div className="ov-tfill" style={{ width: "82%" }} />
          </div>
          <div className="ov-trow">
            <p className="ov-tnum">
              82<span style={{ fontSize: 11 }}>/100</span>
            </p>
            <p className="ov-tdesc">Very Good 🌟</p>
          </div>
        </div>
      </div>
    </div>
  );
}
