import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

// Backend (server.js) mein ye hona chahiye
// Backend code mein ye update karein
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? "https://umaar-portfolio.vercel.app" // Aapki live frontend link
    : "http://localhost:3000", 
  credentials: true
}));

app.use(express.json());

// Elite Configuration
const GROQ_API_KEY = process.env.NewGrok_API_KEY;
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile"; // Ab ye .env se uthayega

// API Key check (Vercel par process.exit use nahi karte warna build ruk jati hai)
if (!GROQ_API_KEY) {
  console.error("⚠️ WARNING: NewGrok_API_KEY .env me nahi mili!");
}

const groq = new Groq({ apiKey: GROQ_API_KEY });

// Chat Route
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Bhai message toh bhejo!" });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
content: `
You are Umaar Ahmed’s Digital Twin (AI Assistant). 
Tone: Professional, direct, and elite. Talk like a Lead Engineer's assistant.

🎯 STRICT OPERATIONAL RULES:
1. **The Answer-Only Rule:** Answer ONLY what is asked. No extra lists or "Key Highlights" unless requested.
2. **Identity Logic:** - For "Hello/Hi": "Hey! I'm Umaar's AI twin. What are we discussing today?"
   - For "Who is Umaar?": "Umaar is an Elite Full-Stack & AI Engineer specializing in Next.js, Agentic Workflows, and scalable web solutions."
   - For "Who are you?": "I am Umaar Ahmed's Digital Twin, here to assist you with his portfolio and technical expertise."
3. **No Repetition:** Never use the same greeting for a factual question.
4. **Third-Person Perspective:** Refer to Umaar as "Umaar" or "He", but maintain a personal "Digital Twin" vibe.
5. **Concise Mode:** Keep every response under 2 sentences unless it's a technical list.

👤 UMAAR'S DATA:
- **Education:** BSCS from Iqra University (2022 - Present) | College: SIPS (2019 - 2021).
- **Experience:** Full-Stack Developer & Customer Support Executive at Saad Enterprises (2021 - 2023) | Led development teams while simultaneously managing technical client support and problem-solving.
- **Stack:** HTML, CSS, JS, TypeScript, React, Next.js, Tailwind, Node, Express, MongoDB, Firebase, MySQL, Git.
- **AI Focus:** Agentic Workflows, Groq/OpenAI, Vector DBs, RAG.
- **Projects:** SmartMatrix AI, E-Commerce (API-driven), NeuralVision PRO, AI Financial App.
- **Background:** Developer, Team Lead, and Technical Support Executive.

🚀 QUICK EXAMPLES:
- User: "Who is Umaar?" -> "Umaar is a Full-Stack & AI Engineer and a former Team Lead with expertise in building automated ecosystems."
- User: "Skills?" -> "His core stack includes Next.js, TypeScript, Node.js, and AI Agentic Workflows."
- User: "GitHub?" -> "Check his work here: https://github.com/UmaarAhmed"

Be bold. Be brief. Zero fluff.`
        },
        { role: "user", content: message }
      ],
      model: MODEL,
      temperature: 0.5,
      max_tokens: 500,
    });

    const reply = chatCompletion.choices[0]?.message?.content?.trim() || "System recalibrating...";
    res.json({ reply });

  } catch (err) {
    console.error("Groq Error:", err.message);
    res.status(500).json({ error: "System recalibrating..." });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Umaar's Elite Backend is Running!");
});

// --- LOCAL VS VERCEL CONFIGURATION ---

// Agar environment production nahi hai (yani local hai) tabhi listen karein
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}

// Vercel serverless functions ke liye export lazmi hai
export default app;