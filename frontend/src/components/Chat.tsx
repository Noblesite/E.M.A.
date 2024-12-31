import React, { useState } from "react";
import axios from "axios";
import "../App.css";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const backendUrl = "http://127.0.0.1:8000/chat/"; // Update to match your backend URL

  const handleSendMessage = async () => {
    if (!input.trim()) return; // Do nothing if the input is empty
  
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };
  
    setMessages((prev) => [...prev, userMessage]); // Add user message to the list
    setInput(""); // Clear input
  
    try {
      // Send message to the backend
      const response = await axios.post(
        backendUrl,
        {
          sender: "user",
          text: userMessage.text,
        },
        {
          headers: {
            "Content-Type": "application/json", // Define as JSON
          },
        }
      );
  
      const botMessage: Message = {
        id: Date.now(),
        sender: "bot",
        text: response.data.text, // Bot response from backend
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message to backend:", error);
      const errorMessage: Message = {
        id: Date.now(),
        sender: "bot",
        text: "Oops! Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage(); // Send message on Enter key
    }
  };

  return (
    <div className="chat-section">
      <div className="chat-container">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Attach keydown handler
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
