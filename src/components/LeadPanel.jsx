const FIELDS = [
  { key: "name",        label: "Full Name",    icon: "👤" },
  { key: "phone",       label: "Phone",        icon: "📞" },
  { key: "budget",      label: "Budget",       icon: "💰" },
  { key: "bhk",         label: "BHK Preference", icon: "🏠" },
  { key: "location",    label: "Current City", icon: "📍" },
  { key: "requirement", label: "Requirement",  icon: "📝" },
];

const PROJECT_INFO = [
  { key: "2 BHK",   val: "₹3.20 Cr+ · 874 sq ft" },
  { key: "3 BHK",   val: "₹4.75 Cr+ · 1266 sq ft" },
  { key: "Amenities", val: "52+ across 3 levels" },
  { key: "Location", val: "Sector 9, Vashi" },
];

export default function LeadPanel({ leadData, leadCaptured, isOpen }) {
  const filledCount = Object.values(leadData).filter(Boolean).length;

  return (
    <div className={`lead-panel ${isOpen ? "open" : ""}`}>
      <div className="panel-header">
        <div className="panel-title">Lead Profile</div>
        <div className="panel-subtitle">
          {filledCount} / {FIELDS.length} fields captured
        </div>
        {/* progress bar */}
        <div style={{
          marginTop: 10,
          height: 3,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 4,
          overflow: "hidden"
        }}>
          <div style={{
            height: "100%",
            width: `${(filledCount / FIELDS.length) * 100}%`,
            background: "linear-gradient(90deg, #00d4aa, #c9a96e)",
            borderRadius: 4,
            transition: "width 0.5s ease"
          }} />
        </div>
      </div>

      {leadCaptured && (
        <div style={{ padding: "12px 16px 0" }}>
          <div className="lead-captured-badge">
            ✅ Lead Captured — Team will follow up
          </div>
        </div>
      )}

      <div className="lead-fields">
        {FIELDS.map(({ key, label, icon }) => {
          const value = leadData[key];
          return (
            <div key={key} className={`lead-field ${value ? "filled" : ""}`}>
              <div className="field-label">
                <span className="icon">{icon}</span>
                {label}
                <span className="field-dot" />
              </div>
              {value
                ? <div className="field-value">{value}</div>
                : <div className="field-empty">Not captured yet</div>
              }
            </div>
          );
        })}
      </div>

      {/* Project quick-ref card */}
      <div style={{ padding: "0 16px 20px" }}>
        <div className="panel-project-card">
          <div className="ppc-title">SEABREEZE · Quick Reference</div>
          {PROJECT_INFO.map(({ key, val }) => (
            <div key={key} className="ppc-row">
              <span className="ppc-key">{key}</span>
              <span className="ppc-val">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
