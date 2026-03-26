import { useState, useRef, useEffect } from "react";
import SYSTEM_PROMPT from "../constants/systemPrompt";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Welcome to Seabreeze by Godrej Bayview! 🌊 I'm Aria, your personal consultant for this exclusive waterfront project in Vashi. I'm here to help with pricing, floor plans, amenities, or a site visit. How can I assist you today?",
};

// Extract lead info from full conversation text
const LEAD_EXTRACTION_PROMPT = (conversation) => `
From this conversation, extract any lead information that was shared.
Return ONLY a valid JSON object with these fields (use null if not found):
{
  "name": "...",
  "phone": "...",
  "budget": "...",
  "bhk": "...",
  "location": "...",
  "requirement": "..."
}
Conversation:
${conversation}
`;

export default function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState({
    name: null,
    phone: null,
    budget: null,
    bhk: null,
    location: null,
    requirement: null,
  });
  const [leadCaptured, setLeadCaptured] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Extract lead data (still using AI via backend later if needed)
  const extractLeadData = async (allMessages) => {
    try {
      const conversation = allMessages
        .map((m) => `${m.role === "assistant" ? "Aria" : "User"}: ${m.content}`)
        .join("\n");

      const res = await fetch("https://chatbot-mrr1.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "Extract structured lead data as JSON only.",
            },
            {
              role: "user",
              content: LEAD_EXTRACTION_PROMPT(conversation),
            },
          ],
        }),
      });

      const data = await res.json();

      let parsed = {};
      try {
        parsed = JSON.parse(data.reply);
      } catch {
        return;
      }

      setLeadData((prev) => ({
        name: parsed.name || prev.name,
        phone: parsed.phone || prev.phone,
        budget: parsed.budget || prev.budget,
        bhk: parsed.bhk || prev.bhk,
        location: parsed.location || prev.location,
        requirement: parsed.requirement || prev.requirement,
      }));
    } catch {
      // ignore silently
    }
  };

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    const newUserMsg = { role: "user", content: userText };
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("https://chatbot-mrr1.onrender.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...updatedMessages.map((m) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content,
            })),
          ],
        }),
      });

      const data = await res.json();

      const finalMessages = [
        ...updatedMessages,
        { role: "assistant", content: data.reply },
      ];

      setMessages(finalMessages);

      if (data?.reply && data.reply.toLowerCase().includes("reach out")) {
      setLeadCaptured(true);
      }
      extractLeadData(finalMessages);
    } catch (err) {
      console.error("OpenAI error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Server error. Please check backend connection.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    leadData,
    leadCaptured,
    sendMessage,
    bottomRef,
    inputRef,
  };
}