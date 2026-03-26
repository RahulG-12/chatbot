# 🌊 Seabreeze by Godrej — AI Real Estate Chatbot v2

Built with React + Vite + Google Gemini AI. Features voice input, lead tracking panel, and advanced UI.

---

## ⚙️ LOCAL SETUP IN VS CODE

### Step 1 — Prerequisites
- Install **Node.js** → https://nodejs.org (LTS version)
- Install **VS Code** → https://code.visualstudio.com
- Install **Git** → https://git-scm.com (needed for deployment)

### Step 2 — Open project
1. Extract this ZIP to any folder
2. Open VS Code → File → Open Folder → select `seabreeze-v3`

### Step 3 — Get your FREE Gemini API Key
1. Go to https://aistudio.google.com
2. Sign in with your Google account
3. Click **"Get API Key"** → **"Create API key"**
4. Copy the key (starts with `AIza...`)

### Step 4 — Add API Key
Open the `.env` file and paste your key:
```
VITE_GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 5 — Install & Run
Open terminal in VS Code (Ctrl + `) and run:
```bash
npm install
npm run dev
```
Open → http://localhost:5173

---

## 🚀 DEPLOY TO VERCEL (Free Live Link)

### Option A — Using Vercel CLI (fastest)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy (run from project folder)
vercel

# 3. Follow prompts:
#    - Login / signup with GitHub or email
#    - "Set up and deploy?" → Y
#    - "Which scope?" → your account
#    - "Link to existing project?" → N
#    - "Project name?" → seabreeze-chatbot (or any name)
#    - "In which directory is your code?" → ./  (press Enter)
#    - "Want to override settings?" → N

# 4. Add your API key to Vercel:
vercel env add VITE_GEMINI_API_KEY
# Paste your key when prompted, select all environments

# 5. Redeploy with the env var:
vercel --prod
```
✅ You'll get a live URL like: `https://seabreeze-chatbot.vercel.app`

---

### Option B — GitHub + Vercel Dashboard (easiest for beginners)

```bash
# 1. Create a GitHub account at github.com (if you don't have one)

# 2. Create a new repo on GitHub (click + → New repository)
#    Name: seabreeze-chatbot | Make it Private | Create repository

# 3. Push your code (run from project folder in VS Code terminal):
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/seabreeze-chatbot.git
git push -u origin main
```

```
# 4. Deploy on Vercel:
#    - Go to https://vercel.com → Sign up with GitHub
#    - Click "Add New Project" → Import your repo
#    - Framework: Vite (auto-detected)
#    - Click "Environment Variables" → Add:
#        Name:  VITE_GEMINI_API_KEY
#        Value: AIzaSyxxxxxxxxxxxxxxx
#    - Click "Deploy"
```
✅ Live URL in ~2 minutes. Every `git push` auto-redeploys!

---

## 📁 Project Structure
```
src/
├── main.jsx
├── components/
│   ├── App.jsx           ← Root layout (chat + lead panel)
│   ├── ChatHeader.jsx    ← Header bar
│   ├── MessageList.jsx   ← Chat bubbles + typing indicator
│   ├── QuickReplies.jsx  ← Quick question chips
│   ├── InputBar.jsx      ← Text input + 🎙 voice button
│   └── LeadPanel.jsx     ← Right panel / mobile drawer for lead data
├── hooks/
│   ├── useChat.js        ← Gemini API + lead extraction logic
│   └── useVoice.js       ← Web Speech API (voice input)
├── constants/
│   ├── systemPrompt.js   ← Aria's instructions + project details
│   └── quickReplies.js   ← Quick reply buttons
└── styles/
    └── chat.css          ← All styles (dark luxury theme)
```

---

## 🎙 Voice Input
- Click the **microphone button** in the input bar
- Speak your question — it auto-fills the input
- Click send (or it auto-sends after final transcription)
- Works in Chrome, Edge, Safari (not Firefox)

## 👤 Lead Panel
- **Desktop**: Always visible on the right side
- **Mobile**: Tap the 👤 button (bottom-right) to open/close
- Fields fill in with a green glow as Aria captures them
- Progress bar shows how complete the lead profile is

---

## ❓ Troubleshooting

| Problem | Fix |
|---|---|
| "trouble connecting" message | Check `.env` has correct Gemini key |
| Voice button not showing | Use Chrome or Edge browser |
| Vercel build fails | Make sure `.env` variable is added in Vercel dashboard |
| `npm: command not found` | Install Node.js from nodejs.org and restart VS Code |
