import "./VendorCustomers.css";

const CUSTOMERS = [
  {
    init: "Y",
    color: "#2D6A35",
    name: "Yvonne T.",
    time: "Ordered · 2 days ago",
    badge: "⭐ 5.0",
  },
  {
    init: "B",
    color: "#6366F1",
    name: "Boris N.",
    time: "Ordered · 5 days ago",
    badge: "⭐ 4.0",
  },
  {
    init: "M",
    color: "#D4882A",
    name: "Miriam C.",
    time: "Viewed · 1 week ago",
    badge: "⭐ 3.0",
  },
  {
    init: "K",
    color: "#0891B2",
    name: "Kome R.",
    time: "Viewed · 1 week ago",
    badge: "No review",
  },
];

export default function VendorCustomers({ goMessages }) {
  return (
    <div className="vc-card">
      <div className="vc-cardhead">
        <div>
          <p className="vc-ctitle">Recent Customers</p>
          <p className="vc-csub">People who interacted with you</p>
        </div>
        <span className="vc-tag">12 this month</span>
      </div>
      {CUSTOMERS.map((c, i) => (
        <div key={i} className="vc-row">
          <div className="vc-av" style={{ background: c.color }}>
            {c.init}
          </div>
          <div>
            <p className="vc-name">{c.name}</p>
            <p className="vc-time">{c.time}</p>
          </div>
          <span className="vc-badge">{c.badge}</span>
          <button className="vc-msgbtn" onClick={goMessages}>
            Message
          </button>
        </div>
      ))}
    </div>
  );
}
