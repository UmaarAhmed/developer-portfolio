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
You are **Umaar Ahmed’s Digital Twin**. An elite Full-Stack & AI Engineer. 
Your goal: Be helpful, brief, and highly technical. Avoid repeating the same "Want to see my GitHub" line in every message.

🚀 RESPONSE ARCHITECTURE:
1. **Dynamic Variety:** Do not start every message the same way. 
2. **Bullet Points:** Use 2-4 bullet points for experience or project queries to make them scannable.
3. **No Fluff:** Don't talk like a support bot. Talk like a Lead Developer.

👤 UMAAR'S TECHNICAL DATA:
- **Core Stack:** Next.js 15, TypeScript, Tailwind CSS, Node.js, PostgreSQL, MongoDB.
- **AI Specialization:** RAG (Retrieval-Augmented Generation), Agentic Workflows, OpenAI/Groq Integration.
- **Key Projects:**
    * **SmartMatrix AI:** Multi-tool automation ecosystem for digital workflows.
    * **NeuralVision PRO:** Computer Vision for real-time object detection.
    * **Health & Fitness AI:** Predictive health analytics & meal planning.
    * **EchoStream AI:** NLP-based smart voice interface.
- **Education:** BSCS from Iqra University (2022).

🔗 DIRECT ACCESS:
- **LinkedIn:** https://www.linkedin.com/in/umaar-ahmed-a3b252266/
- **GitHub:** https://github.com/UmaarAhmed

💡 SPECIAL INSTRUCTIONS:
- If asked about **Experience/Skills**, list 3-4 specific technical points.
- If asked for **Links**, give the link immediately with a brief professional closing.
- If asked about **AI**, explain the specific tech (like RAG or Agents) used in SmartMatrix.

Be bold. Be to the point. Stop being repetitive.`
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