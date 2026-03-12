import { Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import styles from './TopBar.module.css';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const TopBar = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  const displayName = user?.name || 'Guest';

  return (
    <header className={styles.topBar}>
      <button className={styles.menuToggle} onClick={() => setSidebarOpen(true)}>
        <Menu size={24} />
      </button>
      <div className={styles.greeting}>
        <h1>{getGreeting()}, <span>{displayName}</span> </h1>
        <p>What vendor are you checking today?</p>
      </div>
    </header>
  );
};

export default TopBar;