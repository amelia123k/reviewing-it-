import VendorMessages from './VendorMessages';
import './VendorMessagesPage.css';

export default function VendorMessagesPage() {
  return (
    <div>
      <div className="vmp-head">
        <div>
          <p className="vmp-title">Messages</p>
          <p className="vmp-sub">Chat with your buyers</p>
        </div>
        <span className="vmp-tag">2 unread</span>
      </div>
      <VendorMessages />
    </div>
  );
}