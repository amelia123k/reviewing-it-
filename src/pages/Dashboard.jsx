import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar        from '../components/Dashboard/Navbar/Navbar';
import Searchpanel   from '../components/Searchpanel';
import VendorPreview from '../components/VendorPreview';
import { MapPin }    from 'lucide-react';
import './Dashboard.css';

const categories = [
  'All Categories','Food & Drinks','Fashion','Electronics',
  'Services','Skin Care','Shoes','Health & Wellness'
];

export const vendors = [
  { id:1,  name:'Mokolo Kitchen',    category:'Food & Drinks',     number:'+237 650 234 891', rating:4.8, color:'#1A6B3C', city:'Buea',    reviews:[{stars:5,text:'Best pepper soup in Buea! Always fresh.',date:'16 Feb 2026',author:'Yvonne T.'},{stars:4,text:'Fast delivery, food still hot.',date:'14 Feb 2026',author:'Boris N.'}] },
  { id:2,  name:'Fako Styles',       category:'Fashion',           number:'+237 677 102 334', rating:4.6, color:'#2D6A35', city:'Buea',    reviews:[{stars:5,text:'Made my dress exactly how I described it.',date:'15 Feb 2026',author:'Sandra A.'}] },
  { id:3,  name:'Mountain Gadgets',  category:'Electronics',       number:'+237 681 556 778', rating:3.5, color:'#4A5568', city:'Buea',    reviews:[{stars:3,text:'Product came but charger was missing.',date:'11 Feb 2026',author:'Kome R.'}] },
  { id:4,  name:'Glow & Go Beauty',  category:'Skin Care',         number:'+237 699 223 445', rating:4.9, color:'#1A6B3C', city:'Buea',    reviews:[{stars:5,text:'Skin cleared up in 2 weeks.',date:'20 Feb 2026',author:'Miriam C.'},{stars:5,text:'She explains every product before selling.',date:'17 Feb 2026',author:'Cynthia E.'}] },
  { id:5,  name:'Buea Sole Shop',    category:'Shoes',             number:'+237 670 334 556', rating:4.3, color:'#2D6A35', city:'Buea',    reviews:[{stars:4,text:'Nice quality, true to size.',date:'18 Feb 2026',author:'Frank O.'}] },
  { id:6,  name:'Akwa Bites',        category:'Food & Drinks',     number:'+237 655 667 112', rating:4.5, color:'#1A6B3C', city:'Douala',  reviews:[{stars:5,text:'Ndole was fresh and absolutely delicious.',date:'22 Feb 2026',author:'Claudine M.'},{stars:4,text:'A bit slow but worth the wait.',date:'19 Feb 2026',author:'Roger T.'}] },
  { id:7,  name:'Bonaberi Threads',  category:'Fashion',           number:'+237 699 778 990', rating:4.7, color:'#2D6A35', city:'Douala',  reviews:[{stars:5,text:'Best lace fabrics in Douala.',date:'21 Feb 2026',author:'Ingrid N.'}] },
  { id:8,  name:'DLA Tech Zone',     category:'Electronics',       number:'+237 676 889 001', rating:4.1, color:'#1A6B3C', city:'Douala',  reviews:[{stars:4,text:'Original phones at fair prices.',date:'14 Feb 2026',author:'Joel A.'},{stars:3,text:'Warranty process too long.',date:'10 Feb 2026',author:'Eric B.'}] },
  { id:9,  name:'Deido Fix-It',      category:'Services',          number:'+237 651 990 112', rating:4.6, color:'#2D6A35', city:'Douala',  reviews:[{stars:5,text:'Fixed my AC same day.',date:'12 Feb 2026',author:'Patricia F.'}] },
  { id:10, name:'Littoral Wellness', category:'Health & Wellness', number:'+237 677 001 223', rating:4.7, color:'#1A6B3C', city:'Douala',  reviews:[{stars:5,text:'Certified products only.',date:'21 Feb 2026',author:'Estelle K.'}] },
  { id:11, name:'Mvog-Ada Eats',     category:'Food & Drinks',     number:'+237 670 112 445', rating:4.4, color:'#2D6A35', city:'Yaounde', reviews:[{stars:5,text:'Okok and plantains better than my mama makes.',date:'23 Feb 2026',author:'Hermine L.'}] },
  { id:12, name:'Bastos Boutique',   category:'Fashion',           number:'+237 655 223 556', rating:4.8, color:'#1A6B3C', city:'Yaounde', reviews:[{stars:5,text:'Top quality fabrics.',date:'20 Feb 2026',author:'Solange D.'},{stars:5,text:'My go-to shop.',date:'16 Feb 2026',author:'Pauline V.'}] },
  { id:13, name:'Yaounde Phone Hub', category:'Electronics',       number:'+237 699 334 667', rating:2.2, color:'#7B2D2D', city:'Yaounde', reviews:[{stars:2,text:'Sold me a refurbished phone as brand new.',date:'9 Feb 2026',author:'Gilbert M.'}] },
  { id:14, name:'Capital Repairs',   category:'Services',          number:'+237 677 445 778', rating:4.5, color:'#2D6A35', city:'Yaounde', reviews:[{stars:5,text:'Very honest technician.',date:'22 Feb 2026',author:'Bertrand N.'}] },
  { id:15, name:'Nlongkak Skincare', category:'Skin Care',         number:'+237 651 556 889', rating:4.6, color:'#1A6B3C', city:'Yaounde', reviews:[{stars:5,text:'Only genuine products.',date:'19 Feb 2026',author:'Adrienne P.'}] },
];

const RatingBadge = ({ rating }) => {
  const cls = rating >= 4.5 ? 'badge-high' : rating >= 3 ? 'badge-mid' : 'badge-low';
  return (
    <div className={`db-rating-badge ${cls}`}>
      <span>{rating}</span><span>/ 5</span>
    </div>
  );
};

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openWriteTab,   setOpenWriteTab]   = useState(false);
  const [searchedQuery,  setSearchedQuery]  = useState(null);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [notifications,  setNotifications]  = useState([
    { id:1, text:'Your review received 5 likes',    time:'5m ago', read:false },
    { id:2, text:'New scam alert in your area',     time:'1h ago', read:false },
    { id:3, text:'Vendor responded to your review', time:'3h ago', read:true  },
  ]);

  const markAsRead = (id) => setNotifications(n => n.map(x => x.id===id ? {...x, read:true} : x));

  // When coming from landing page search OR returning after login to write a review
  useEffect(() => {
    const q        = searchParams.get('q');
    const vendorId = searchParams.get('vendor');
    const write    = searchParams.get('write');

    if (vendorId) {
      const v = vendors.find(v => String(v.id) === vendorId);
      if (v) {
        setSelectedVendor(v);
        if (write === '1') setOpenWriteTab(true);
      }
    } else if (q) {
      // Auto-find best match and open their modal
      const q2 = q.toLowerCase();
      setSearchedQuery(q);
      const match = vendors.find(v =>
        v.number.replace(/\s/g,'').includes(q2.replace(/\s/g,'')) ||
        v.name.toLowerCase().includes(q2)
      );
      if (match) setSelectedVendor(match);
    }
  }, []);

  const allCats = categories.filter(c => c !== 'All Categories');
  const displayedCats = allCats.map(cat => ({
    name: cat,
    vendors: vendors.filter(v =>
      (activeCategory === 'All Categories' || v.category === activeCategory) && v.category === cat
    )
  })).filter(c => activeCategory === 'All Categories' || c.vendors.length > 0);

  const handleVendorClick = (v) => {
    setSelectedVendor(v);
    setOpenWriteTab(false);
  };

  const handleClosePreview = () => {
    setSelectedVendor(null);
    setOpenWriteTab(false);
  };

  return (
    <div className="db-page">
      <Navbar
        onSearchClick={() => setSearchOpen(true)}
        notifications={notifications}
        markAsRead={markAsRead}
      />

      {searchOpen && (
        <SearchPanel
          vendors={vendors}
          onSelectVendor={(v) => { setSelectedVendor(v); setOpenWriteTab(false); }}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {selectedVendor && (
        <VendorPreview
          vendor={selectedVendor}
          initialTab={openWriteTab ? 'write' : 'reviews'}
          onClose={handleClosePreview}
        />
      )}

      <main className="db-main">
        {/* HERO SEARCH */}
        <div className="db-hero">
          <h1 className="db-hero-title">Find & verify any vendor</h1>
          <p className="db-hero-sub">Search by phone number or Name</p>
          <div className="db-hero-search" onClick={() => setSearchOpen(true)}>
            <span className="db-hero-icon"></span>
            <span className="db-hero-placeholder">Enter vendor phone number or name...</span>
            <button className="db-hero-btn">Search </button>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="db-cat-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`db-cat-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >{cat}</button>
          ))}
        </div>

        {/* NOT FOUND ALERT */}
        {searchedQuery && !selectedVendor && (
          <div className="db-alert">
            <span className="db-alert-icon">⚠️</span>
            <div className="db-alert-body">
              <p className="db-alert-title">No vendor found for <strong>"{searchedQuery}"</strong></p>
              <p className="db-alert-sub">This number is not found .Browse vendors below.</p>
            </div>
            <button className="db-alert-close" onClick={() => setSearchedQuery(null)}>✕</button>
          </div>
        )}

        {/* VENDOR SECTIONS */}
        {displayedCats.map(cat => (
          <div key={cat.name} className="db-cat-section">
            <div className="db-cat-head">
              <h3 className="db-cat-title">{cat.name}</h3>
              <span className="db-cat-count">{cat.vendors.length} vendor{cat.vendors.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="db-vendor-grid">
              {cat.vendors.map(v => (
                <div key={v.id} className="db-vendor-card" onClick={() => handleVendorClick(v)}>
                  <div className="db-card-strip" style={{ background: v.color }} />
                  <div className="db-card-body">
                    <div className="db-card-name">{v.name}</div>
                    <div className="db-card-cat"><MapPin size={10}/> {v.city} · {v.category}</div>
                    <div className="db-card-bottom">
                      <div className="db-card-stars">{'★'.repeat(Math.round(v.rating))}{'☆'.repeat(5 - Math.round(v.rating))}</div>
                      <span className="db-card-rev">{v.reviews.length} review{v.reviews.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <RatingBadge rating={v.rating} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;