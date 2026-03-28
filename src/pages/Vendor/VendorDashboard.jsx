import { useState } from "react";
import "./VendorDashboard.css";
import VendorNavbar from "./VendorNavbar";
import VendorOverview from "./VendorOverview";
import VendorReviews from "./VendorReviews";
import VendorMessagesPage from './VendorMessagesPage';
import VendorComplaints   from './VendorComplaints';

const NOTIFS = [
  { id:1, text:'Yvonne T. sent you a message',       time:'5 min ago',  read:false, color:'#2D6A35' },
  { id:2, text:'New complaint submitted by Boris N.', time:'1 hour ago', read:false, color:'#E05252' },
  { id:3, text:'Miriam C. left a 3-star review',     time:'1 day ago',  read:true,  color:'#7A9A7D' },
];

export default function VendorDashboard() {
  const [page,   setPage]   = useState('overview');
  const [notifs, setNotifs] = useState(NOTIFS);
  const [info,   setInfo]   = useState({
    name:'Mokolo Kitchen', phone:'+237 650 234 891',
    category:'Food & Drinks', location:'Buea',
    bio:'Best home-cooked meals in Buea.'
  });
  const [form,  setForm]  = useState(info);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);

  const markRead = (id) => setNotifs(p => p.map(n => n.id===id ? {...n,read:true} : n));
  const clearAll = ()   => setNotifs(p => p.map(n => ({...n,read:true})));
  const openEdit = ()   => { setForm({...info}); setModal(true); };
  const save     = ()   => { setInfo({...form}); setModal(false); };
  const share    = ()   => {
    navigator.clipboard?.writeText('safebuy.cm/vendor/mokolo-kitchen');
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const pages = {
    overview:   <VendorOverview info={info} />,
    reviews:    <VendorReviews />,
    messages:   <VendorMessagesPage />,
    complaints: <VendorComplaints />,
  };

  return (
    <div className="vd-page">
      <VendorNavbar
        activePage={page}
        setActivePage={setPage}
        vendorName={info.name}
        notifications={notifs}
        onMarkRead={markRead}
        onClearAll={clearAll}
      />

      <main className="vd-main">

        {/* TOP ROW */}
        <div className="vd-top">
          <div>
            <h1 className="vd-h1">Good morning 👋</h1>
            <p className="vd-sub">Here's how <strong>{info.name}</strong> is performing</p>
          </div>
          <div className="vd-topbtns">
            <button className="vd-btn-green" onClick={share}>📲 Share Profile</button>
            <button className="vd-btn-white" onClick={openEdit}>✏️ Edit Info</button>
          </div>
        </div>


        {/* PAGE CONTENT */}
        {pages[page]}

      </main>

      {/* EDIT MODAL */}
      {modal && (
        <div className="vd-overlay" onClick={() => setModal(false)}>
          <div className="vd-modal" onClick={e => e.stopPropagation()}>
            <p className="vd-mtitle">Edit Business Info</p>
            {[
              { lbl:'Business Name', k:'name'     },
              { lbl:'WhatsApp',      k:'phone'    },
              { lbl:'Location',      k:'location' },
            ].map(f => (
              <div key={f.k} className="vd-fgroup">
                <label className="vd-flbl">{f.lbl}</label>
                <input className="vd-finput" value={form[f.k]} onChange={e => setForm({...form,[f.k]:e.target.value})} />
              </div>
            ))}
            <div className="vd-fgroup">
              <label className="vd-flbl">Category</label>
              <select className="vd-finput" value={form.category} onChange={e => setForm({...form,category:e.target.value})}>
                {['Food & Drinks','Fashion','Electronics','Skin Care','Services','Health & Wellness','Other'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="vd-fgroup">
              <label className="vd-flbl">Bio</label>
              <textarea className="vd-finput" rows={3} style={{resize:'none'}} value={form.bio} onChange={e => setForm({...form,bio:e.target.value})} />
            </div>
            <div className="vd-mbtns">
              <button className="vd-mcancel" onClick={() => setModal(false)}>Cancel</button>
              <button className="vd-msave"   onClick={save}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="vd-toast">✅ Profile link copied!</div>}
    </div>
  );
}