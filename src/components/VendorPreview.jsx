import React, { useState } from "react";
import {
  X,
  Phone,
  MapPin,
  Shield,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import styles from "./VendorPreview.module.css";

// ── Rating bar
const RatingBar = ({ count, total, stars }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className={styles.ratingBarRow}>
      <span className={styles.ratingBarLabel}>{stars}★</span>
      <div className={styles.ratingBarTrack}>
        <div className={styles.ratingBarFill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.ratingBarCount}>{count}</span>
    </div>
  );
};

// ── Vendor Modal
const VendorPreview = ({ vendor, onClose }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [tab, setTab] = useState("reviews");
  const [localReviews, setLocalReviews] = useState(vendor?.reviews || []);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!selectedStars) return;
    const newReview = {
      stars: selectedStars,
      text: reviewText || "No comment.",
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      author: "You",
    };
    setLocalReviews([newReview, ...localReviews]);
    setSelectedStars(0);
    setReviewText("");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTab("reviews");
    }, 1200);
  };

  if (!vendor) return null;

  const dist = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: localReviews.filter((r) => r.stars === s).length,
  }));

  const trustScore =
    vendor.rating >= 4.5
      ? { label: "Highly Trusted", icon: "🛡️", color: "#166534" }
      : vendor.rating >= 3.5
        ? { label: "Generally Safe", icon: "✅", color: "#854D0E" }
        : { label: "Use Caution", icon: "⚠️", color: "#991B1B" };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Top bar */}
        <div className={styles.modalTopBar}>
          <div className={styles.modalPill} />
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Vendor identity */}
        <div className={styles.vendorIdentity}>
          <div
            className={styles.vendorBigAvatar}
            style={{ background: vendor.color }}
          >
            {vendor.name[0]}
          </div>
          <div className={styles.vendorIdentityInfo}>
            <h2 className={styles.vendorIdentityName}>{vendor.name}</h2>
            <div className={styles.vendorIdentityMeta}>
              <span className={styles.vendorMetaChip}>
                <MapPin size={11} /> {vendor.city}
              </span>
              <span className={styles.vendorMetaChip}>{vendor.category}</span>
            </div>
            <div className={styles.vendorPhoneRow}>
              <Phone size={13} color="#3A7D44" />
              <span>{vendor.number}</span>
            </div>
          </div>
        </div>

        {/* Score row */}
        <div className={styles.scoreRow}>
          <div className={styles.scoreBig}>
            <span className={styles.scoreNum}>{vendor.rating}</span>
            <span className={styles.scoreOutOf}>/5</span>
          </div>
          <div className={styles.scoreBars}>
            {dist.map((d) => (
              <RatingBar
                key={d.stars}
                stars={d.stars}
                count={d.count}
                total={localReviews.length}
              />
            ))}
          </div>
          <div
            className={styles.trustBadge}
            style={{ borderColor: trustScore.color }}
          >
            <span className={styles.trustIcon}>{trustScore.icon}</span>
            <span
              className={styles.trustLabel}
              style={{ color: trustScore.color }}
            >
              {trustScore.label}
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className={styles.tabRow}>
          <button
            className={`${styles.tabBtn} ${tab === "reviews" ? styles.tabBtnActive : ""}`}
            onClick={() => setTab("reviews")}
          >
            <MessageSquare size={14} /> What people say ({localReviews.length})
          </button>
          <button
            className={`${styles.tabBtn} ${tab === "write" ? styles.tabBtnActive : ""}`}
            onClick={() => setTab("write")}
          >
            ✍️ Rate this vendor
          </button>
        </div>

        {/* Reviews tab */}
        {tab === "reviews" && (
          <div className={styles.reviewsFeed}>
            {localReviews.length === 0 ? (
              <p className={styles.noReviews}>No reviews yet. Be the first!</p>
            ) : (
              localReviews.map((r, i) => (
                <div key={i} className={styles.reviewBubble}>
                  <div className={styles.bubbleTop}>
                    <div className={styles.bubbleAuthorAvatar}>
                      {r.author[0]}
                    </div>
                    <div>
                      <div className={styles.bubbleAuthor}>{r.author}</div>
                      <div className={styles.bubbleDate}>{r.date}</div>
                    </div>
                    <div className={styles.bubbleStars}>
                      {"★".repeat(r.stars)}
                      {"☆".repeat(5 - r.stars)}
                    </div>
                  </div>
                  <p className={styles.bubbleText}>{r.text}</p>
                  <div className={styles.bubbleActions}>
                    <button className={styles.bubbleAction}>
                      <ThumbsUp size={12} /> Helpful
                    </button>
                    <button className={styles.bubbleAction}>
                      <ThumbsDown size={12} /> Not helpful
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Write review tab */}
        {tab === "write" && (
          <div className={styles.writeTab}>
            <p className={styles.writePrompt}>
              How was your experience with <strong>{vendor.name}</strong>?
            </p>

            <div className={styles.emojiRating}>
              {[
                { stars: 1, emoji: "😡", label: "Terrible" },
                { stars: 2, emoji: "😕", label: "Bad" },
                { stars: 3, emoji: "😐", label: "Okay" },
                { stars: 4, emoji: "😊", label: "Good" },
                { stars: 5, emoji: "🤩", label: "Amazing" },
              ].map((opt) => (
                <button
                  key={opt.stars}
                  className={`${styles.emojiBtn} ${selectedStars === opt.stars ? styles.emojiBtnActive : ""}`}
                  onClick={() => setSelectedStars(opt.stars)}
                >
                  <span className={styles.emojiIcon}>{opt.emoji}</span>
                  <span className={styles.emojiLabel}>{opt.label}</span>
                </button>
              ))}
            </div>

            <textarea
              className={styles.writeInput}
              placeholder="Tell others what you experienced — delivery, quality, communication..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
            />

            <button
              className={styles.submitReviewBtn}
              onClick={handleSubmit}
              disabled={!selectedStars}
              style={{ opacity: selectedStars ? 1 : 0.5 }}
            >
              <Shield size={15} /> {submitted ? "✅ Posted!" : "Post Review"}
            </button>
            <p className={styles.writeDisclaimer}>
              Your review helps protect others in the community.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPreview;
