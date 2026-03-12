import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar/Navbar";
import { useAuth } from "../context/AuthContext";
import { Star, Pencil, Trash2, X, Check, ArrowLeft } from "lucide-react";
import styles from "./MyReviews.module.css";

export default function MyReviews() {
  const navigate = useNavigate();
  const { myReviews, editReview, deleteReview } = useAuth();

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [notifications] = useState([]);

  const saveEdit = () => {
    editReview(editing.id, editing.stars, editing.text);
    setEditing(null);
  };

  const confirmDelete = (id) => {
    deleteReview(id);
    setDeleting(null);
  };

  return (
    <div className={styles["mr-page"]}>
      <Navbar
        notifications={notifications}
        onSearchClick={() => {}}
        markAsRead={() => {}}
      />

      <main className={styles["mr-main"]}>
        <div className={styles["mr-header"]}>
          <button
            className={styles["mr-back"]}
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
          <div>
            <h1 className={styles["mr-title"]}>
              <Star size={22} /> My Reviews
            </h1>
            <p className={styles["mr-sub"]}>
              {myReviews.length} review{myReviews.length !== 1 ? "s" : ""}{" "}
              posted
            </p>
          </div>
        </div>

        {myReviews.length === 0 ? (
          <div className={styles["mr-empty"]}>
            <div className={styles["mr-empty-icon"]}>⭐</div>
            <h3>No reviews yet</h3>
            <p>When you rate a vendor, your reviews will appear here.</p>
            <button onClick={() => navigate("/dashboard")}>
              Find Vendors →
            </button>
          </div>
        ) : (
          <div className={styles["mr-list"]}>
            {myReviews.map((r) => (
              <div key={r.id} className={styles["mr-card"]}>
                <div className={styles["mr-card-top"]}>
                  <div
                    className={styles["mr-av"]}
                    style={{ background: r.vendorColor }}
                  >
                    {r.vendorName[0]}
                  </div>
                  <div className={styles["mr-card-info"]}>
                    <p className={styles["mr-vendor-name"]}>{r.vendorName}</p>
                    <p className={styles["mr-date"]}>{r.date}</p>
                  </div>
                  <div className={styles["mr-stars-display"]}>
                    {"★".repeat(r.stars)}
                    {"☆".repeat(5 - r.stars)}
                  </div>
                  <div className={styles["mr-actions"]}>
                    <button
                      className={styles["mr-btn-edit"]}
                      onClick={() =>
                        setEditing({ id: r.id, stars: r.stars, text: r.text })
                      }
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className={styles["mr-btn-delete"]}
                      onClick={() => setDeleting(r.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className={styles["mr-text"]}>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* EDIT MODAL */}
      {editing && (
        <div className={styles["mr-overlay"]} onClick={() => setEditing(null)}>
          <div
            className={styles["mr-modal"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["mr-modal-head"]}>
              <h3>Edit Review</h3>
              <button onClick={() => setEditing(null)}>
                <X size={18} />
              </button>
            </div>
            <p className={styles["mr-modal-label"]}>Rating</p>
            <div className={styles["mr-star-picker"]}>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  className={`${styles["mr-star-btn"]}${editing.stars >= s ? " " + styles["active"] : ""}`}
                  onClick={() => setEditing((e) => ({ ...e, stars: s }))}
                >
                  
                </button>
              ))}
            </div>
            <p className={styles["mr-modal-label"]}>Your review</p>
            <textarea
              className={styles["mr-modal-input"]}
              rows={4}
              value={editing.text}
              onChange={(e) =>
                setEditing((ed) => ({ ...ed, text: e.target.value }))
              }
            />
            <div className={styles["mr-modal-btns"]}>
              <button
                className={styles["mr-modal-cancel"]}
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button className={styles["mr-modal-save"]} onClick={saveEdit}>
                <Check size={14} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleting && (
        <div className={styles["mr-overlay"]} onClick={() => setDeleting(null)}>
          <div
            className={styles["mr-confirm"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["mr-confirm-icon"]}>🗑️</div>
            <h3>Delete this review?</h3>
            <p>This action cannot be undone.</p>
            <div className={styles["mr-modal-btns"]}>
              <button
                className={styles["mr-modal-cancel"]}
                onClick={() => setDeleting(null)}
              >
                Keep it
              </button>
              <button
                className={styles["mr-modal-delete"]}
                onClick={() => confirmDelete(deleting)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
