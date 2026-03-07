import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const initialChats = [
  {
    id: "mokolo",
    vendorName: "Mokolo Kitchen",
    vendorInit: "M",
    vendorColor: "#2D6A35",
    category: "Food & Drinks",
    city: "Buea",
    online: true,
    messages: [
      {
        sender: "vendor",
        text: "Hello! Your order is ready and on the way 🛵",
        time: "10:32 AM",
      },
      {
        sender: "user",
        text: "Great! How long will it take?",
        time: "10:33 AM",
      },
      {
        sender: "vendor",
        text: "About 20 minutes. We are on Stadium road now.",
        time: "10:35 AM",
      },
      {
        sender: "vendor",
        text: "Your food has arrived! Please check your gate 🙏",
        time: "10:52 AM",
      },
    ],
  },
  {
    id: "fako",
    vendorName: "Fako Styles",
    vendorInit: "F",
    vendorColor: "#7C3AED",
    category: "Fashion",
    city: "Buea",
    online: false,
    messages: [
      {
        sender: "user",
        text: "Hi, do you have this dress in size M?",
        time: "Yesterday",
      },
      {
        sender: "vendor",
        text: "Yes we do! We have it in green and black 😊",
        time: "Yesterday",
      },
      {
        sender: "user",
        text: "Perfect, I will come by tomorrow",
        time: "Yesterday",
      },
      {
        sender: "vendor",
        text: "We will be waiting for you!",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "glow",
    vendorName: "Glow & Go Beauty",
    vendorInit: "G",
    vendorColor: "#D4882A",
    category: "Skin Care",
    city: "Buea",
    online: true,
    messages: [
      {
        sender: "vendor",
        text: "Hi! Your skincare package is ready for pickup 💚",
        time: "9:00 AM",
      },
      {
        sender: "user",
        text: "Thank you! I will come this afternoon",
        time: "9:05 AM",
      },
      {
        sender: "vendor",
        text: "Perfect, we are open until 7pm 🌿",
        time: "9:06 AM",
      },
    ],
  },
  {
    id: "dla",
    vendorName: "DLA Tech Zone",
    vendorInit: "D",
    vendorColor: "#0891B2",
    category: "Electronics",
    city: "Douala",
    online: false,
    messages: [
      {
        sender: "user",
        text: "Do you have the Samsung A54 in stock?",
        time: "2 days ago",
      },
      {
        sender: "vendor",
        text: "Yes! We have it new and sealed. 185,000 XAF",
        time: "2 days ago",
      },
      { sender: "user", text: "Is the price negotiable?", time: "2 days ago" },
      {
        sender: "vendor",
        text: "We can do 180,000 XAF for you 🤝",
        time: "2 days ago",
      },
    ],
  },
];

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(initialChats);

  const sendMessage = (chatId, sender, text) => {
    const time = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? { ...c, messages: [...c.messages, { sender, text, time }] }
          : c,
      ),
    );
  };

  return (
    <ChatContext.Provider value={{ chats, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
