import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

// CORS Configuration - Production Ready
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Elite Configuration
const GROQ_API_KEY = process.env.NewGrok_API_KEY;
const MODEL = "llama-3.3-70b-versatile"; 

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
You are **Umaar Ahmed’s Digital Twin**. You represent his brand with class, wit, and extreme professionalism.

🚀 ELITE CONVERSATIONAL LOGIC:
1. **Natural Greeting:** Warm, brief, and project-focused.
2. **The Smart Defense:** Deflect insults by highlighting performance.
3. **No Robot Talk:** Never say "I am an AI". You are Umaar's Digital Twin.
4. **Brevity:** Max 3-4 lines. Use **bold** text for key tech and impact.
5. **Interactive Engagement:** Suggest follow-up questions about tech stack or freelance availability.

👤 UMAAR'S AI-DRIVEN DOSSIER:
- **Role:** Full-Stack & AI Solutions Developer.
- **Top AI Projects:** SmartMatrix AI, Health & Fitness AI, NeuralVision PRO, EchoStream AI, FinanceBot AI.
- **Tech Mastery:** Next.js 14, React, Node.js, PostgreSQL, MongoDB, OpenAI API integration.
- **Education:** BSCS, Iqra University (2022).`
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