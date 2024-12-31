import React, { useState } from "react";
import Chat from "./components/Chat";
import ChatHistory from "./components/ChatHistory";
import Metrics from "./components/Metrics";

function App() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(true); // State to toggle chat history

  const conversations = [
    { id: "1", title: "Conversation 1" },
    { id: "2", title: "Conversation 2" },
  ];

  const handleSelectConversation = (id: string) => {
    console.log("Selected conversation:", id);
  };

  const toggleHistory = () => {
    setIsHistoryOpen((prev) => !prev);
  };

  return (
    <div className="dashboard-container">
      {/* Chat History Section */}
      {isHistoryOpen && (
        <div className={`chat-history ${isHistoryOpen ? "" : "hidden"}`}>
        <ChatHistory
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
        />
      </div>
      )}

      {/* Chat Section */}
      <Chat />

      {/* Metrics Section */}
      <Metrics
        cpuUsage={40}
        memoryUsage={60}
        storageUsage={30}
        contextWindowUsage={50}
      />

      {/* Toggle Button */}
      <button onClick={toggleHistory} className="toggle-history">
      {isHistoryOpen ? "☰" : "☰"}
      </button>
    </div>
  ); 
}

export default App;
