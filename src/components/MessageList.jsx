function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function TypingIndicator() {
  return (
    <div className="typing-wrapper">
      <div className="msg-avatar-sm">🌊</div>
      <div className="typing-bubble">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className="msg-wrapper">
      <div className={`msg-row ${isUser ? "user" : "assistant"}`}>
        {!isUser && <div className="msg-avatar-sm">🌊</div>}
        <div className={`bubble ${isUser ? "user" : "assistant"}`}>
          {msg.content}
        </div>
      </div>
      <div
        className="msg-time"
        style={{ textAlign: isUser ? "right" : "left", paddingLeft: isUser ? 0 : "40px" }}
      >
        {timeNow()}
      </div>
    </div>
  );
}

export default function MessageList({ messages, loading, bottomRef }) {
  return (
    <div className="messages-area">
      {messages.map((msg, i) => (
        <Message key={i} msg={msg} />
      ))}
      {loading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
