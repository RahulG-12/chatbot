import QUICK_REPLIES from "../constants/quickReplies";

export default function QuickReplies({ onSelect }) {
  return (
    <div className="quick-section">
      <div className="quick-label">Quick Questions</div>
      <div className="quick-row">
        {QUICK_REPLIES.map((q) => (
          <button key={q.text} className="quick-chip" onClick={() => onSelect(q.text)}>
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}
