import useVoice from "../hooks/useVoice";

export default function InputBar({ input, setInput, onSend, loading, inputRef }) {
  const { isListening, isSupported, toggleListening } = useVoice((transcript) => {
    setInput(transcript);
  });

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-area">
      <div className="input-box">
        {/* Voice button */}
        {isSupported && (
          <button
            className={`btn-icon btn-voice ${isListening ? "listening" : ""}`}
            onClick={toggleListening}
            title={isListening ? "Stop listening" : "Voice input"}
          >
            {isListening ? (
              // Stop icon
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
            ) : (
              // Mic icon
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8"  y1="23" x2="16" y2="23"/>
              </svg>
            )}
          </button>
        )}

        <textarea
          ref={inputRef}
          className="text-input"
          placeholder={isListening ? "Listening…" : "Ask about pricing, amenities, location…"}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          readOnly={isListening}
        />

        {/* Send button */}
        <button
          className="btn-icon btn-send"
          onClick={() => onSend()}
          disabled={!input.trim() || loading}
          title="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      <div className="input-footer">
        {isListening ? (
          <span className="voice-hint">🎙 Listening — speak now</span>
        ) : (
          <span className="input-footer-text">
            Powered by Propello AI · Seabreeze by Godrej Properties
          </span>
        )}
      </div>
    </div>
  );
}
