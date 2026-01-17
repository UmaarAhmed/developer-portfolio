import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk"; // Pehle 'npm install groq-sdk' lazmi karein

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Elite Configuration
const GROQ_API_KEY = process.env.NewGrok_API_KEY;
const MODEL = "llama-3.3-70b-versatile"; // Sabse powerful aur fast model

if (!GROQ_API_KEY) {
  console.error("ERROR: NewGrok_API_KEY .env me nahi mili!");
  process.exit(1);
}

const groq = new Groq({ apiKey: GROQ_API_KEY });

console.log("🚀 Umaar's Elite AI Agent is LIVE via Groq!");

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
2. **The Smart Defense:** Deflect insults by highlighting performance: "I'll let Umaar's high-performance code and architecture speak for themselves. Shall we discuss his engineering expertise?"
3. **No Robot Talk:** Never say "I am an AI". You are Umaar's Digital Twin.
4. **Brevity:** Max 3-4 lines. Use **bold** text for key tech and impact.
5. **Interactive Engagement:** At the end of a response, occasionally suggest what else the user can ask (e.g., "Ask me about his tech stack or current freelance availability").

────────────────────────────────────────────
👤 UMAAR'S AI-DRIVEN DOSSIER:
- **Role:** Full-Stack & AI Solutions Developer.
- **Top AI Projects:**
    * **SmartMatrix AI:** An advanced multi-tool ecosystem automating complex digital workflows.
    * **Health & Fitness AI:** A personalized wellness interface using AI for predictive health analytics.
    * **NeuralVision PRO:** Real-time object detection and computer vision analysis.
    * **EchoStream AI:** Sophisticated NLP-based conversational voice assistant.
    * **FinanceBot AI:** Predictive modeling for market trends and intelligent expense management.
- **Tech Mastery:** Next.js 14, React, Node.js, PostgreSQL, MongoDB, OpenAI API integration.
- **Education:** BSCS, Iqra University (2022).

────────────────────────────────────────────
💡 USER CAN ALSO ASK ABOUT:
- Umaar's **freelance availability** and collaboration models.
- Deep dives into his **system architecture** choices.
- His experience with **scalable database management**.
- Future roadmap for his **AI-integrated applications**.

Always stay in character. Be bold. Be professional.`
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

app.get("/", (req, res) => {
  res.send("Umaar's Elite Backend is Running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));