import React from 'react';
import { Home, PlusCircle, AlertTriangle, MessageCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

const BottomNav = ({ activeTab, handleBottomNav }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.bottomNav}>
      <button
        className={`${styles.item} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => { handleBottomNav && handleBottomNav('home'); }}
      >
        <Home size={22} /><span>Home</span>
      </button>

      <button
        className={`${styles.item} ${activeTab === 'add' ? styles.active : ''}`}
        onClick={() => handleBottomNav && handleBottomNav('add')}
      >
        <PlusCircle size={22} /><span>Add Review</span>
      </button>

      <button
        className={`${styles.item} ${location.pathname === '/messages' ? styles.active : ''}`}
        onClick={() => navigate('/messages')}
      >
        <MessageCircle size={22} /><span>Messages</span>
      </button>

      <button
        className={`${styles.item} ${activeTab === 'report' ? styles.active : ''}`}
        onClick={() => handleBottomNav && handleBottomNav('report')}
      >
        <AlertTriangle size={22} /><span>Report</span>
      </button>
    </div>
  );
};

export default BottomNav;