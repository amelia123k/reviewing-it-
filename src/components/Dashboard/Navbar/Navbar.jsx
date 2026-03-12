import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, LogOut, User, X, Menu, Home, MessageCircle, Star, Bookmark, Flag } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import './Navbar.css';
import logo from '../../../assets/logo.png';

const NAV = [
  { label: 'Home',           path: '/dashboard',  icon: Home          },
  { label: 'Messages',       path: '/messages',   icon: MessageCircle },
  { label: 'My Reviews',     path: '/reviews',    icon: Star          },
  { label: 'Saved Vendors',  path: '/saved',      icon: Bookmark      },
  { label: 'Reports',        path: '/reports',    icon: Flag          },
];

const Navbar = ({ onSearchClick, notifications, markAsRead }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const displayName = user?.name || 'Guest';
  const initial     = displayName.charAt(0).toUpperCase();
  const unread      = notifications?.filter(n => !n.read).length || 0;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="sb-nav">
      <div className="sb-inner">

        {/* LOGO */}
        <button className="sb-logo" onClick={() => navigate('/')}>
          <img src={logo} alt="SafeBuy" className="sb-logo-img" />
          <span>Safe<b>Buy</b></span>
        </button>

        {/* CENTER NAV LINKS */}
        <div className="sb-nav-links">
          {NAV.map(n => {
            const Icon = n.icon;
            return (
              <button
                key={n.path}
                className={`sb-link${location.pathname === n.path ? ' active' : ''}`}
                onClick={() => navigate(n.path)}
              >
                <Icon size={14} />
                {n.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="sb-right">

          {/* SEARCH ICON */}
         
          {/* BELL */}
          <div className="sb-icon-wrap">
            <button className="sb-icon-btn" onClick={() => { setNotifOpen(o => !o); setMenuOpen(false); }}>
              <Bell size={17} />
              {unread > 0 && <span className="sb-badge">{unread}</span>}
            </button>
            {notifOpen && (
              <div className="sb-dropdown sb-notif-dd">
                <div className="sb-dd-head">
                  <span>Notifications</span>
                  <button className="sb-dd-close" onClick={() => setNotifOpen(false)}><X size={14}/></button>
                </div>
                {(notifications || []).map(n => (
                  <div key={n.id} className={`sb-notif-item${!n.read ? ' unread' : ''}`} onClick={() => markAsRead?.(n.id)}>
                    <div className="sb-notif-dot" style={{ background: n.read ? '#CBD5E1' : '#2D6A35' }} />
                    <div>
                      <p className="sb-notif-txt">{n.text}</p>
                      <p className="sb-notif-time">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AVATAR */}
          <div className="sb-icon-wrap">
            <button className="sb-avatar" onClick={() => { setMenuOpen(o => !o); setNotifOpen(false); }}>
              {initial}
            </button>
            {menuOpen && (
              <div className="sb-dropdown sb-profile-dd">
                <div className="sb-profile-top">
                  <div className="sb-profile-av">{initial}</div>
                  <div>
                    <p className="sb-profile-name">{displayName}</p>
                    <p className="sb-profile-email">{user?.email || ''}</p>
                  </div>
                </div>
                <div className="sb-divider" />
                <button className="sb-menu-item" onClick={() => { setMenuOpen(false); navigate('/settings'); }}>
                  <User size={14} /> Settings
                </button>
                <button className="sb-menu-item sb-logout" onClick={handleLogout}>
                  <LogOut size={14} /> Log out
                </button>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button className="sb-hamburger" onClick={() => setMenuOpen(o => !o)}>
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="sb-mobile-menu">
          {NAV.map(n => {
            const Icon = n.icon;
            return (
              <button key={n.path} className="sb-mobile-link" onClick={() => { navigate(n.path); setMenuOpen(false); }}>
                <Icon size={15}/> {n.label}
              </button>
            );
          })}
          <button className="sb-mobile-link" onClick={() => { onSearchClick?.(); setMenuOpen(false); }}>
            <Search size={15}/> Search Vendor
          </button>
          <div className="sb-mobile-divider" />
          <button className="sb-mobile-link sb-logout" onClick={handleLogout}>
            <LogOut size={14}/> Log out
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;