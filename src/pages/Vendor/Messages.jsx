import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Search, ArrowLeft } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import styles from "./Messages.module.css";

const Messages = () => {
  const navigate = useNavigate();
  const { chats, sendMessage } = useChat();
  const [activeId,   setActiveId]   = useState(chats[0]?.id || '');
  const [inputText,  setInputText]  = useState('');
  const [searchText, setSearchText] = useState('');
  const [showChat,   setShowChat]   = useState(false);
  const bodyRef = useRef(null);

  const activeChat = chats.find(c => c.id === activeId);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [activeId, chats]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(activeId, 'user', inputText.trim());
    setInputText('');
  };

  const handleSelectChat = (id) => {
    setActiveId(id);
    setShowChat(true);
  };

  const filtered = chats.filter(c =>
    c.vendorName.toLowerCase().includes(searchText.toLowerCase())
  );

  const lastMsg = (chat) => chat.messages[chat.messages.length - 1];

  if (!activeChat) return null;

  return (
    <div className={styles.page}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
          </button>
          <span className={styles.topbarLogo}>Safe<b>Buy</b></span>
        </div>
        <p className={styles.topbarTitle}>Messages</p>
        <div style={{ width: 80 }} />
      </div>

      <div className={styles.wrap}>

        {/* LEFT — contact list */}
        <div className={`${styles.left} ${showChat ? styles.leftHidden : ''}`}>
          <div className={styles.leftHead}>
            <h3 className={styles.leftTitle}>Conversations</h3>
            <div className={styles.searchBox}>
              <Search size={13} color="#7A9A7D" />
              <input
                className={styles.searchInput}
                placeholder="Search vendors..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.contactList}>
            {filtered.map(c => (
              <div
                key={c.id}
                className={`${styles.contact} ${c.id === activeId ? styles.contactActive : ''}`}
                onClick={() => handleSelectChat(c.id)}
              >
                <div className={styles.contactAv} style={{ background: c.vendorColor }}>
                  {c.vendorInit}
                  {c.online && <div className={styles.onlineDot} />}
                </div>
                <div className={styles.contactInfo}>
                  <div className={styles.contactTop}>
                    <span className={styles.contactName}>{c.vendorName}</span>
                    <span className={styles.contactTime}>{lastMsg(c).time}</span>
                  </div>
                  <div className={styles.contactPreview}>
                    {lastMsg(c).sender === 'user' ? 'You: ' : ''}{lastMsg(c).text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — chat window */}
        <div className={`${styles.right} ${showChat ? styles.rightShow : ''}`}>

          <div className={styles.chatHeader}>
            <button className={styles.mobBack} onClick={() => setShowChat(false)}>
              <ArrowLeft size={18} />
            </button>
            <div className={styles.chatAv} style={{ background: activeChat.vendorColor }}>
              {activeChat.vendorInit}
              {activeChat.online && <div className={styles.onlineDot} />}
            </div>
            <div>
              <div className={styles.chatName}>{activeChat.vendorName}</div>
              <div className={styles.chatStatus} style={{ color: activeChat.online ? '#22C55E' : '#9EB5A4' }}>
                {activeChat.online ? '● Online' : '○ Offline'} · {activeChat.city} · {activeChat.category}
              </div>
            </div>
          </div>

          <div className={styles.chatBody} ref={bodyRef}>
            <div className={styles.dateDivider}>Today</div>
            {activeChat.messages.map((m, i) => {
              const isMe = m.sender === 'user';
              return (
                <div key={i} className={isMe ? styles.bubbleWrapMe : styles.bubbleWrapThem}>
                  {!isMe && (
                    <div className={styles.bubbleAv} style={{ background: activeChat.vendorColor }}>
                      {activeChat.vendorInit}
                    </div>
                  )}
                  <div>
                    <div className={isMe ? styles.bubbleMe : styles.bubbleThem}>{m.text}</div>
                    <div className={isMe ? styles.timeMe : styles.timeThem}>{m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.chatFooter}>
            <input
              className={styles.chatInput}
              placeholder={`Message ${activeChat.vendorName}...`}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button className={styles.sendBtn} onClick={handleSend}>
              <Send size={16} color="#fff" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Messages;