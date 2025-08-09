"use client";

import React, { useState, useCallback } from "react";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);

    // Add user message
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      const data = await res.json();

      // Add AI response to chat
      setMessages((msgs) => [...msgs, { sender: "ai", text: data.response }]);
      setInput("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to send message");
      }
    } finally {
      setLoading(false);
    }
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2>Chat with AI Assistant</h2>
      <div
        style={{
          minHeight: 300,
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 16,
          overflowY: "auto",
          marginBottom: 16,
          background: "#f9f9f9",
        }}
      >
        {messages.length === 0 && <p>No messages yet. Say hi!</p>}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 12,
              textAlign: msg.sender === "user" ? "right" : "left",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 16,
                background: msg.sender === "user" ? "#007bff" : "#e5e5ea",
                color: msg.sender === "user" ? "#fff" : "#000",
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: 12 }}>Error: {error}</div>
      )}

      <textarea
        rows={2}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type your message here..."
        disabled={loading}
        style={{
          width: "100%",
          padding: 8,
          fontSize: 16,
          borderRadius: 4,
          resize: "vertical",
          borderColor: error ? "red" : undefined,
        }}
      />

      <button
        onClick={sendMessage}
        disabled={loading || !input.trim()}
        style={{
          marginTop: 8,
          padding: "10px 16px",
          fontSize: 16,
          borderRadius: 4,
          cursor: loading || !input.trim() ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};
