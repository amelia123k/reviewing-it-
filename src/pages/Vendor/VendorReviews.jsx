import { useState } from "react";
import "./VendorReviews.css";

const INIT = [
  {
    id: 1,
    name: "Yvonne T.",
    init: "Y",
    color: "#2D6A35",
    rating: 5,
    time: "2 days ago",
    text: "Best food delivery in Buea! Always on time.",
    replied: true,
    reply: "Thank you so much Yvonne! 🙏",
  },
  {
    id: 2,
    name: "Boris N.",
    init: "B",
    color: "#6366F1",
    rating: 4,
    time: "5 days ago",
    text: "Good food, reasonable price. Delivery was a bit slow.",
    replied: false,
    reply: "",
  },
  {
    id: 3,
    name: "Miriam C.",
    init: "M",
    color: "#D4882A",
    rating: 3,
    time: "1 week ago",
    text: "Portion was smaller than usual. Hope it was a one-time thing.",
    replied: false,
    reply: "",
  },
];

const rateColor = (r) =>
  r >= 4.5 ? "#2D6A35" : r >= 3.5 ? "#D4882A" : "#E05252";

const Star = ({ on = true }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill={on ? "#F59E0B" : "#E5E7EB"}
    stroke="none"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function VendorReviews() {
  const [reviews, setReviews] = useState(INIT);
  const [replyTo, setReplyTo] = useState(null);
  const [replyTxt, setReplyTxt] = useState("");

  const post = (id) => {
    setReviews((p) =>
      p.map((r) =>
        r.id === id
          ? {
              ...r,
              replied: true,
              reply: replyTxt || "Thank you for your feedback!",
            }
          : r,
      ),
    );
    setReplyTo(null);
    setReplyTxt("");
  };

  return (
    <div className="rv-card">
      <div className="rv-cardhead">
        <div>
          <p className="rv-ctitle">Reviews</p>
          <p className="rv-csub">Reply to stay engaged</p>
        </div>
        <span className="rv-tag">28 total</span>
      </div>

      {reviews.map((r) => (
        <div key={r.id} className="rv-item">
          <div className="rv-top">
            <div className="rv-user">
              <div className="rv-av" style={{ background: r.color }}>
                {r.init}
              </div>
              <div>
                <p className="rv-name">{r.name}</p>
                <p className="rv-time">{r.time}</p>
              </div>
            </div>
            <div className="rv-right">
              <div className="rv-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} on={i <= r.rating} />
                ))}
              </div>
              <span
                className="rv-score"
                style={{ background: rateColor(r.rating) }}
              >
                {r.rating}.0
              </span>
            </div>
          </div>

          <p className="rv-txt">{r.text}</p>

          {r.replied ? (
            <div className="rv-replybox">
              <p className="rv-replylbl">Your reply</p>
              <p className="rv-replytxt">{r.reply}</p>
            </div>
          ) : replyTo === r.id ? (
            <div className="rv-replybox">
              <textarea
                className="rv-replyinput"
                rows={2}
                placeholder="Write a reply..."
                value={replyTxt}
                onChange={(e) => setReplyTxt(e.target.value)}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="rv-replybtn" onClick={() => post(r.id)}>
                  Post
                </button>
                <button
                  className="rv-cancelbtn"
                  onClick={() => setReplyTo(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="rv-replylink"
              onClick={() => {
                setReplyTo(r.id);
                setReplyTxt("");
              }}
            >
               Reply
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
