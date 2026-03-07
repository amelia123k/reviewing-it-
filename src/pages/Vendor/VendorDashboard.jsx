import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./VendorDashboard.css";
import VendorSidebar from "./VendorSidebar";
import VendorOverview from "./VendorOverview";
import VendorReviews from "./VendorReviews";
import VendorMessagesPage from "./VendorMessagesPage";
import VendorCustomers from "./VendorCustomers";
import VendorComplaints from "./VendorComplaints";
import VendorProfile from "./VendorProfile";

const NOTIFS = [
  {
    id: 1,
    text: "Yvonne T. sent you a message",
    time: "5 min ago",
    read: false,
    color: "#2D6A35",
  },
  {
    id: 2,
    text: "New complaint submitted by Boris N.",
    time: "1 hour ago",
    read: false,
    color: "#E05252",
  },
  {
    id: 3,
    text: "Miriam C. left a 3-star review",
    time: "1 day ago",
    read: true,
    color: "#7A9A7D",
  },
  {
    id: 4,
    text: "43 people viewed your profile",
    time: "2 days ago",
    read: true,
    color: "#7A9A7D",
  },
];

export default function VendorDashboard() {
  const { user } = useAuth();
  const [page, setPage] = useState("overview");
  const [notifs, setNotifs] = useState(NOTIFS);
  const [info, setInfo] = useState({
    name: user?.name || "Mokolo Kitchen",
    phone: "+237 650 234 891",
    category: "Food & Drinks",
    location: "Buea",
    bio: "Best home-cooked meals in Buea.",
  });
  const [form, setForm] = useState(info);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  const markRead = (id) =>
    setNotifs((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const clearAll = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const openEdit = () => {
    setForm({ ...info });
    setModal(true);
  };
  const save = () => {
    setInfo({ ...form });
    setModal(false);
  };
  const share = () => {
    navigator.clipboard?.writeText("safebuy.cm/vendor/mokolo-kitchen");
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const pages = {
    overview: <VendorOverview info={info} />,
    reviews: <VendorReviews />,
    messages: <VendorMessagesPage />,
    customers: <VendorCustomers goMessages={() => setPage("messages")} />,
    complaints: <VendorComplaints />,
    profile: <VendorProfile info={info} onEdit={openEdit} />,
  };

  return (
    <div className="vd-wrap">
      {/* MOBILE OVERLAY */}
      {sideOpen && (
        <div className="vd-mob-overlay" onClick={() => setSideOpen(false)} />
      )}

      <VendorSidebar
        activePage={page}
        setActivePage={(p) => {
          setPage(p);
          setSideOpen(false);
        }}
        vendorName={info.name}
        notifications={notifs}
        onMarkRead={markRead}
        onClearAll={clearAll}
        mobileOpen={sideOpen}
      />

      <main className="vd-main">
        {/* TOPBAR */}
        <div className="vd-top">
          <div className="vd-top-left">
            <button
              className="vd-hamburger"
              onClick={() => setSideOpen((o) => !o)}
            >
              ☰
            </button>
            <div>
              <h1 className="vd-h1">Good morning 👋</h1>
              <p className="vd-sub">
                Here's how <strong>{info.name}</strong> is performing.
              </p>
            </div>
          </div>
          <div className="vd-topbtns">
            <button className="vd-btn-green" onClick={share}>
              📲 Share
            </button>
            <button className="vd-btn-white" onClick={openEdit}>
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* QUICK ACTIONS — Share card removed */}
        <div className="vd-qa">
          {[
            {
              icon: "✉️",
              bg: "#F0FDF4",
              label: "Messages",
              sub: "2 unread",
              pg: "messages",
            },
            {
              icon: "🚩",
              bg: "#FFF0F0",
              label: "Complaint",
              sub: "Needs attention",
              pg: "complaints",
            },
            {
              icon: "👥",
              bg: "#EEF2FF",
              label: "Customers",
              sub: "12 this month",
              pg: "customers",
            },
          ].map((q, i) => (
            <div key={i} className="vd-qacard" onClick={() => setPage(q.pg)}>
              <div className="vd-qaicon" style={{ background: q.bg }}>
                {q.icon}
              </div>
              <div>
                <p className="vd-qalabel">{q.label}</p>
                <p className="vd-qasub">{q.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* STATS */}
        <div className="vd-stats">
          {[
            { icon: "⭐", num: "4.8", label: "Avg Rating", chg: "↑ +0.1" },
            { icon: "💬", num: "28", label: "Reviews", chg: "↑ +5" },
            { icon: "👁️", num: "198", label: "Views", chg: "↑ +43" },
          ].map((st, i) => (
            <div key={i} className="vd-stat">
              <span>{st.icon}</span>
              <p className="vd-stnum">{st.num}</p>
              <p className="vd-stlbl">{st.label}</p>
              <p className="vd-stchg">{st.chg}</p>
            </div>
          ))}
        </div>

        {/* ACTIVE PAGE */}
        {pages[page]}
      </main>

      {/* EDIT MODAL */}
      {modal && (
        <div className="vd-overlay" onClick={() => setModal(false)}>
          <div className="vd-modal" onClick={(e) => e.stopPropagation()}>
            <p className="vd-mtitle">Edit Business Info</p>
            <p className="vd-msub">
              Keep your profile accurate so buyers can trust you.
            </p>
            {[
              { lbl: "Business Name", k: "name" },
              { lbl: "WhatsApp", k: "phone" },
              { lbl: "Location", k: "location" },
            ].map((f) => (
              <div key={f.k} className="vd-fgroup">
                <label className="vd-flbl">{f.lbl}</label>
                <input
                  className="vd-finput"
                  value={form[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                />
              </div>
            ))}
            <div className="vd-fgroup">
              <label className="vd-flbl">Category</label>
              <select
                className="vd-finput"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {[
                  "Food & Drinks",
                  "Fashion",
                  "Electronics",
                  "Skin Care",
                  "Services",
                  "Health & Wellness",
                  "Other",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="vd-fgroup">
              <label className="vd-flbl">Bio</label>
              <textarea
                className="vd-finput"
                rows={3}
                style={{ resize: "none" }}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div className="vd-mbtns">
              <button className="vd-mcancel" onClick={() => setModal(false)}>
                Cancel
              </button>
              <button className="vd-msave" onClick={save}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="vd-toast">✅ Profile link copied!</div>}
    </div>
  );
}
