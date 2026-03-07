import { useState, useRef, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import "./VendorMessages.css";

const BUYERS = ["Yvonne T.", "Boris N.", "Miriam C.", "Kome R."];
const COLORS = ["#2D6A35", "#6366F1", "#D4882A", "#0891B2"];
const INITS = ["Y", "B", "M", "K"];

const SendIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2.5"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#7A9A7D"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function VendorMessages() {
  const { chats, sendMessage } = useChat();
  const [activeId, setActiveId] = useState(chats[0]?.id || "");
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const bodyRef = useRef(null);

  const active = chats.find((c) => c.id === activeId);
  const idx = chats.findIndex((c) => c.id === activeId);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [activeId, chats]);

  const send = () => {
    if (!text.trim()) return;
    sendMessage(activeId, "vendor", text.trim());
    setText("");
  };

  const filtered = chats.filter((c) =>
    c.vendorName.toLowerCase().includes(search.toLowerCase()),
  );
  const last = (c) => c.messages[c.messages.length - 1];

  if (!active) return null;

  return (
    <div className="vm-wrap">
      {/* LEFT — contact list */}
      <div className="vm-left">
        <div className="vm-lhead">
          <p className="vm-ltitle">Conversations</p>
          <div className="vm-search">
            <SearchIcon />
            <input
              className="vm-sinput"
              placeholder="Search buyers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="vm-contacts">
          {filtered.map((c, i) => (
            <div
              key={c.id}
              className={`vm-contact${c.id === activeId ? " active" : ""}`}
              onClick={() => setActiveId(c.id)}
            >
              <div className="vm-cav" style={{ background: COLORS[i % 4] }}>
                {INITS[i % 4]}
                {c.online && <div className="vm-online" />}
              </div>
              <div className="vm-cinfo">
                <div className="vm-ctop">
                  <span className="vm-cname">{BUYERS[i % 4]}</span>
                  <span className="vm-ctime">{last(c).time}</span>
                </div>
                <p className="vm-cprev">
                  {last(c).sender === "vendor" ? "You: " : ""}
                  {last(c).text}
                </p>
              </div>
              {last(c).sender === "user" && <div className="vm-udot" />}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — chat window */}
      <div className="vm-right">
        <div className="vm-cheader">
          <div className="vm-cav" style={{ background: COLORS[idx % 4] }}>
            {INITS[idx % 4]}
          </div>
          <div>
            <p className="vm-hname">{BUYERS[idx % 4]}</p>
            <p
              className="vm-hstatus"
              style={{ color: active.online ? "#22C55E" : "#9EB5A4" }}
            >
              {active.online ? "● Online" : "○ Offline"} · Buyer
            </p>
          </div>
        </div>

        <div className="vm-body" ref={bodyRef}>
          <p className="vm-date">Today</p>
          {active.messages.map((m, i) => (
            <div
              key={i}
              className={m.sender === "vendor" ? "vm-wrap-me" : "vm-wrap-them"}
            >
              {m.sender !== "vendor" && (
                <div className="vm-bav" style={{ background: COLORS[idx % 4] }}>
                  {INITS[idx % 4]}
                </div>
              )}
              <div>
                <div
                  className={
                    m.sender === "vendor" ? "vm-bubble-me" : "vm-bubble-them"
                  }
                >
                  {m.text}
                </div>
                <p className={m.sender === "vendor" ? "vm-tme" : "vm-tthem"}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="vm-footer">
          <input
            className="vm-input"
            placeholder="Reply to buyer..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button className="vm-send" onClick={send}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
