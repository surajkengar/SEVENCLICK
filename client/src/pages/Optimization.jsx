import { useState, useEffect, useRef } from "react";
import { getChatHistory, sendChatMessage, clearChatHistory } from "../api/DashboardApi";
import "./style/supply.css";

function Optimization() {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState("");
  const [loading, setLoading]     = useState(false);
  const [fetching, setFetching]   = useState(true);
  const bottomRef                 = useRef(null);

  // ── load chat history on mount ─────────────────────
  useEffect(() => {
    fetchHistory();
  }, []);

  // ── auto scroll to bottom on new message ───────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function fetchHistory() {
    try {
      const res = await getChatHistory();
      if (res.data.success) {
        setMessages(res.data.message); // load previous messages
      }
    } catch (error) {
      console.log("fetch history error:", error);
    } finally {
      setFetching(false);
    }
  }

  // ── send message ───────────────────────────────────
  async function handleSend() {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setLoading(true);

    // immediately show user message
    setMessages(prev => [...prev, { role: "user", content: userText }]);

    try {
      const res = await sendChatMessage({ content: userText });

      if (res.data.success) {
        // add AI reply
        setMessages(prev => [...prev, res.data.aiMessage]);
      }
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  // ── send on Enter key ──────────────────────────────
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  // ── clear chat ─────────────────────────────────────
  async function handleClear() {
    try {
      await clearChatHistory();
      setMessages([]);
    } catch (error) {
      console.log("clear chat error:", error);
    }
  }

  return (
    <div className="chat-wrapper">

      {/* Header */}
      <div className="chat-header">
        <h2>Supply Optimization Assistant</h2>
        {messages.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>
            Clear chat
          </button>
        )}
      </div>

      {/* Chat box */}
      <div className="chat-box">

        {/* loading history */}
        {fetching && (
          <p className="chat-loading">Loading chat history...</p>
        )}

        {/* empty state */}
        {!fetching && messages.length === 0 && (
          <div className="chat-empty">
            <p>👋 Hi! Ask me anything about supply optimization, crypto platforms, or trading.</p>
          </div>
        )}

        {/* messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            {msg.content}
          </div>
        ))}

        {/* AI typing indicator */}
        {loading && (
          <div className="chat-message bot typing">
            <span>.</span><span>.</span><span>.</span>
          </div>
        )}

        {/* auto scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask about supply optimization..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>

    </div>
  );
}

export default Optimization;
