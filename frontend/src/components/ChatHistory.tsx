import React from "react";
import "../App.css";

interface Conversation {
  id: string;
  title: string;
}

interface ChatHistoryProps {
  conversations: Conversation[];
  onSelectConversation: (conversationId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ conversations, onSelectConversation }) => {
  return (
    <div className="chat-history">
      <div className="branding">
        <img src="../images/ema.webp" alt="Brand" className="branding-icon" />
      </div>
      <div className="conversations-container">
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation.id} onClick={() => onSelectConversation(conversation.id)}>
              {conversation.title}
            </li>
          ))}
        </ul>
      </div>
      <footer className="chat-history-footer">
        <p>E.M.A. Alpha V1</p>
      </footer>
    </div>
  );
};

export default ChatHistory;
