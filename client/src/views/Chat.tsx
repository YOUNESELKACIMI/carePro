import React, { useState } from "react";
import chatServices from "../services/chat";
import useAuth from "../hooks/useContext";

interface IMessage {
  role: string;
  content: string;
}

const Chat = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading

  const handleChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = {
      role: "user",
      content: msg,
    };
    setMessages((prev) => [...prev, userMessage]);
    setMsg("");
    setLoading(true); // Set loading to true while fetching
    try {
      const res = await chatServices.sendMessage(userMessage.content, token);
      const assistantMessage = {
        role: "assistant",
        content: res.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="messages flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === "user" ? "justify-end" : "justify-start"
            } flex`}
          >
            <div
              className={`${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded-lg p-2 max-w-xs break-words mb-2`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {loading && ( // Show loading spinner if loading is true
          <div className="flex justify-center mt-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
      <form onSubmit={handleChat} className="p-4">
        <input
          type="text"
          placeholder="Enter your message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </form>
    </div>
  );
};

export default Chat;
