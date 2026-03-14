import { useState, useEffect } from 'react';
import './VendorDashboard.css';
import { supabase } from "../../components/Supabase";
import { useAuth }         from '../../context/AuthContext';
import VendorNavbar        from './VendorNavbar';
import VendorOverview      from './VendorOverview';
import VendorReviews       from './VendorReviews';
import VendorMessagesPage  from './VendorMessagesPage';
import VendorComplaints    from './VendorComplaints';

const NOTIFS = [
  { id:1, text:'Yvonne T. sent you a message',       time:'5 min ago',  read:false, color:'#2D6A35' },
  { id:2, text:'New complaint submitted by Boris N.', time:'1 hour ago', read:false, color:'#E05252' },
  { id:3, text:'Miriam C. left a 3-star review',     time:'1 day ago',  read:true,  color:'#7A9A7D' },
];

export default function VendorDashboard() {
  const { user } = useAuth();
  const [page,   setPage]   = useState('overview');
  const [notifs, setNotifs] = useState(NOTIFS);
  const [info,   setInfo]   = useState({ name:'', phone:'', category:'', location:'', bio:'' });
  const [form,   setForm]   = useState(info);
  const [modal,  setModal]  = useState(false);
  const [toast,  setToast]  = useState(false);

  // Load real vendor data from Supabase
  useEffect(() => {
    if (!user) return;
    const loadVendor = async () => {
      let vendor = null;
      
      try {
        // First try: Find vendor by user_id (for new vendors created through signup)
        const { data: vendorByUserId, error: userIdError } = await supabase
          .from('vendors')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (vendorByUserId) {
          vendor = vendorByUserId;
          console.log('✅ Found vendor by user_id:', vendorByUserId.name);
        } else if (!userIdError) {
          // Second try: Find vendor by name (for existing vendors imported from code)
          console.log('🔍 Searching for vendor by name:', user.name);
          const { data: vendorByName, error: nameError } = await supabase
            .from('vendors')
            .select('*')
            .eq('name', user.name)
            .single();

          if (vendorByName) {
            vendor = vendorByName;
            console.log('✅ Found vendor by name:', vendorByName.name);
            
            // Update this vendor to have the user_id for future logins
            const { error: updateError } = await supabase
              .from('vendors')
              .update({ user_id: user.id })
              .eq('id', vendorByName.id);
            
            if (updateError) {
              console.error('❌ Error linking vendor to user:', updateError);
            } else {
              console.log('✅ Successfully linked vendor to user');
            }
          } else if (nameError) {
            console.error('❌ Error finding vendor by name:', nameError);
          }
        } else {
          console.error('❌ Error finding vendor by user_id:', userIdError);
        }

        if (vendor) {
          const loaded = {
            name:     vendor.name     || user.name || '',
            phone:    vendor.number   || '',
            category: vendor.category || '',
            location: vendor.city     || '',
            bio:      vendor.bio      || '',
          };
          setInfo(loaded);
          setForm(loaded);
          console.log('✅ Vendor data loaded:', loaded);
        } else {
          console.log('⚠️ No vendor found, using user data fallback');
          const fallback = {
            name:     user.name || user.email?.split('@')[0] || '',
            phone:    '', category:'', location:'', bio:'',
          };
          setInfo(fallback);
          setForm(fallback);
        }
      } catch (error) {
        console.error('❌ Unexpected error in loadVendor:', error);
        // Set fallback data
        const fallback = {
          name:     user.name || user.email?.split('@')[0] || '',
          phone:    '', category:'', location:'', bio:'',
        };
        setInfo(fallback);
        setForm(fallback);
      }
    };
    loadVendor();
  }, [user]);

  const markRead = (id) => setNotifs(p => p.map(n => n.id===id ? {...n,read:true} : n));
  const clearAll = ()   => setNotifs(p => p.map(n => ({...n,read:true})));
  const openEdit = ()   => { setForm({...info}); setModal(true); };

  const save = async () => {
    setInfo({...form});
    setModal(false);
    if (!user) return;
    const { data: existing } = await supabase
      .from('vendors').select('id').eq('user_id', user.id).single();
    if (existing) {
      await supabase.from('vendors').update({
        name: form.name, number: form.phone,
        category: form.category, city: form.location, bio: form.bio,
      }).eq('user_id', user.id);
    } else {
      await supabase.from('vendors').insert({
        name: form.name, number: form.phone,
        category: form.category, city: form.location, bio: form.bio,
        user_id: user.id,
      });
    }
  };

  const share = () => {
    navigator.clipboard?.writeText(`safebuy.cm/vendor/${info.name.toLowerCase().replace(/\s+/g,'-')}`);
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
        activePage={page} setActivePage={setPage}
        vendorName={info.name} notifications={notifs}
        onMarkRead={markRead} onClearAll={clearAll}
      />
      <main className="vd-main">
        <div className="vd-top">
          <div>
            <h1 className="vd-h1">Good morning 👋</h1>
            <p className="vd-sub">Here's how <strong>{info.name || 'your business'}</strong> is performing</p>
          </div>
          <div className="vd-topbtns">
            <button className="vd-btn-green" onClick={share}>📲 Share Profile</button>
            <button className="vd-btn-white" onClick={openEdit}>✏️ Edit Info</button>
          </div>
        </div>
        {pages[page]}
      </main>

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
