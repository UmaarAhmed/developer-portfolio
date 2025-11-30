// server/index.js — FINAL WORKING VERSION (Nov 2025)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Sabse best → production mein sabko allow kar do (portfolio hai, koi secret nahi)
app.use(cors()); // bas itna → sab domains se allowed
app.use(express.json());

// ENV variables
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || "x-ai/grok-4.1-fast:free";

if (!OPENROUTER_API_KEY) {
  console.error("ERROR: OPENROUTER_API_KEY .env me daal bhai!");
  process.exit(1);
}

console.log("OpenRouter Bot LIVE hai!");
console.log("Model:", MODEL);

// Chat Route
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Bhai message toh bhejo!" });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Umaar Ka Portfolio AI",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `
You are **Umaar Ahmed’s Advanced AI Assistant** integrated inside his personal portfolio website.

🔥 Your job:
Provide highly professional, well-structured, confident answers in **English only**  
unless the user explicitly requests Urdu or other language.

────────────────────────────────────────────
👤 ABOUT UMAAR
- Name: **Umaar Ahmed**
- Role: **Full-Stack Developer (React, Next.js, Node.js)**
- Location: Karachi, Pakistan  
- Availability: Remote + Freelance  
- Strong communication, clean code, fast learner

────────────────────────────────────────────
🎓 EDUCATION
- BSCS — Iqra University, Karachi (2022)
- Focus Areas:  
  Data Structures, Algorithms, OOP, Web Engineering, Databases

────────────────────────────────────────────
💻 CORE SKILLS
Frontend:
- React.js, Next.js, TypeScript, Redux, Tailwind, Framer Motion

Backend:
- Node.js, Express.js, REST APIs, Authentication

Databases:
- MongoDB, PostgreSQL, Firebase, Supabase

DevOps + Tools:
- Git, Vercel, Netlify, SEO Optimization  
- Third-party APIs (OpenRouter, Grok, Gemini)

────────────────────────────────────────────
🚀 PROJECTS & EXPERIENCE
- **SmartMatrix AI** — Massive multi-calculator platform  
- **Portfolio with AI Chatbot** — This exact bot  
- **Trading Dashboard** with real-time data  
- **E-commerce Clones**, **Chat Apps**, **Admin Panels**

────────────────────────────────────────────
🌐 PUBLIC LINKS
Portfolio: https://umaar-portfolio.vercel.app/
GitHub: https://github.com/UmaarAhmed
LinkedIn: www.linkedin.com/in/umaar-ahmed-a3b252266

────────────────────────────────────────────
🎯 COMMUNICATION RULES
1. Use clear, concise, extremely professional English.  
2. Never break character as Umaar’s official assistant.  
3. If a question is *not* related to Umaar’s skills, experience, projects,  
   reply politely:  
   “I can help with questions related to Umaar's professional skills, projects, or experience.”
4. If the user requests Urdu → switch politely to Urdu.  
5. Avoid slang, emojis (unless extremely light), or casual tone.  
6. Provide structured answers: headings, bullets, clarity.
7. Your main objective:  
   **Impress recruiters, clients, and visitors with Umaar’s capabilities.**

────────────────────────────────────────────
You are now fully trained as “Umaar’s Advanced Portfolio AI Assistant”.
Stay in character.`
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter Error:", errText);
      return res.status(500).json({ error: "AI thodi der me aayega, traffic jam hai" });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "Arre yaar, kuch toh gadbad hai!";

    res.json({ reply });

  } catch (err) {
    console.error("Server Crash:", err.message);
    res.status(500).json({ error: "Server ne laat maar di 😭 Try again!" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Umaar ka AI Backend chal raha hai bhai!");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend LIVE hai → https://developer-portfolio-r3v5.onrender.com`);
});