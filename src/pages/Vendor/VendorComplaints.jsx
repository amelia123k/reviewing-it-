import { useState } from "react";
import "./VendorComplaints.css";

const INIT = [
  {
    id: 1,
    status: "open",
    name: "Boris N.",
    init: "B",
    color: "#6366F1",
    time: "3 days ago",
    text: "My order arrived 2 hours late and the food was cold.",
  },
  {
    id: 2,
    status: "resolved",
    name: "Miriam C.",
    init: "M",
    color: "#D4882A",
    time: "2 weeks ago",
    text: "Portion size was smaller than advertised.",
  },
];

export default function VendorComplaints() {
  const [list, setList] = useState(INIT);
  const resolve = (id) =>
    setList((p) =>
      p.map((c) => (c.id === id ? { ...c, status: "resolved" } : c)),
    );
  const dismiss = (id) => setList((p) => p.filter((c) => c.id !== id));

  return (
    <div>
      <div className="cp-head">
        <div>
          <p className="cp-ctitle">Complaints</p>
          <p className="cp-csub">Address these to protect your trust score</p>
        </div>
        <span className="cp-tagred">1 open</span>
      </div>

      {list.map((c) => (
        <div
          key={c.id}
          className={`cp-item${c.status === "open" ? " open" : " resolved"}`}
        >
          <div className="cp-top">
            <span
              className={`cp-badge${c.status === "open" ? " open" : " done"}`}
            >
              {c.status === "open" ? "⚠️ Open" : "✅ Resolved"}
            </span>
            <div className="cp-av" style={{ background: c.color }}>
              {c.init}
            </div>
            <p className="cp-name">
              {c.name} · {c.time}
            </p>
          </div>
          <p className="cp-txt">{c.text}</p>
          {c.status === "open" ? (
            <div style={{ display: "flex", gap: 8 }}>
              <button className="cp-resolvebn" onClick={() => resolve(c.id)}>
                ✅ Mark Resolved
              </button>
              <button className="cp-dismissbn" onClick={() => dismiss(c.id)}>
                Dismiss
              </button>
            </div>
          ) : (
            <p className="cp-done">✅ You resolved this complaint.</p>
          )}
        </div>
      ))}
    </div>
  );
}
