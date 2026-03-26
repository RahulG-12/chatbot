import { useState } from "react";
import "../styles/chat.css";
import useChat from "../hooks/useChat";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import QuickReplies from "./QuickReplies";
import InputBar from "./InputBar";
import LeadPanel from "./LeadPanel";

export default function App() {
  const {
    messages, input, setInput, loading,
    leadData, leadCaptured, sendMessage, bottomRef, inputRef,
  } = useChat();

  const [panelOpen, setPanelOpen] = useState(false);
  const showQuickReplies = messages.length <= 2 && !loading;

  return (
    <div className="app-shell">
      {/* ── CHAT COLUMN ── */}
      <div className="chat-column">
        <ChatHeader />

        <MessageList
          messages={messages}
          loading={loading}
          bottomRef={bottomRef}
        />

        {showQuickReplies && <QuickReplies onSelect={sendMessage} />}

        <InputBar
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          loading={loading}
          inputRef={inputRef}
        />
      </div>

      {/* ── LEAD PANEL (desktop sidebar / mobile drawer) ── */}
      <LeadPanel
        leadData={leadData}
        leadCaptured={leadCaptured}
        isOpen={panelOpen}
      />

      {/* Mobile toggle button */}
      <button
        className="panel-toggle"
        onClick={() => setPanelOpen((o) => !o)}
        title="Lead Profile"
      >
        {panelOpen ? "✕" : "👤"}
      </button>
    </div>
  );
}
