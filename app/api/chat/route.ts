import { NextResponse } from 'next/server';
import Groq from "groq-sdk";
import { experiences } from "@/utils/data/experience";

/* ------------------------------------------------------------------
   Local fallback — mirrors the client-side knowledge base so the API
   ALWAYS returns something useful, even when the key is missing or the
   Groq call fails/times out. The chatbot must never dead-end.
   ------------------------------------------------------------------ */
function localAnswer(message = "") {
  const q = message.toLowerCase().trim();
  if (!q) return null;

  const has = (...words) => words.some((w) => q.includes(w));

  if (has("gtsol", "gtsolution", "agency", "company", "ceo", "order", "service"))
    return `Umaar is the **Founder & CEO of Global Technology Solutions (GTSolution360)** → https://www.gtsol360.com/\n\nClients can order:\n- Web & Mobile App Development\n- Custom Software & API Development\n- Digital Marketing & SEO\n- AI Chatbots & Automation\n- UI/UX Design\n\nEvery order is tracked from the client dashboard.`;

  if (has("skill", "stack", "tech"))
    return "**Core stack:** Next.js, React, TypeScript, Node.js, Express, Tailwind, MongoDB, PostgreSQL, Firebase, Git.\n\n**AI/Infra:** Groq & OpenAI APIs, RAG, vector DBs, agentic workflows.";

  if (has("experience", "work", "job", "career"))
    return experiences.map((e) => `- **${e.title}** — ${e.company} ${e.duration}`).join("\n");

  if (has("project", "portfolio"))
    return "**Notable projects:** SmartMatrix AI, NeuralVision PRO, an API-driven E-Commerce platform, an AI Financial App — plus the gtsol360.com ordering platform.";

  if (has("education", "degree", "university"))
    return "**BSCS** — Iqra University (2022 – Present). College: SIPS (2019 – 2021).";

  if (has("contact", "email", "phone", "hire", "freelance", "available"))
    return "**Email:** umaarahmed03@gmail.com  \n**Phone:** +92 3434688216  \n**LinkedIn:** https://www.linkedin.com/in/umaar-ahmed-a3b252266/\n\nHe is open to freelance and remote work.";

  if (has("who is umaar", "who are you", "about"))
    return "**Umaar Ahmed** is a Full-Stack Developer and the **Founder & CEO of GTSolution360** (https://www.gtsol360.com/). He builds high-performance web apps, mobile apps and scalable APIs.";

  return null;
}

export async function POST(req: Request) {
  const { message } = await req.json().catch(() => ({ message: "" }));
  const apiKey = process.env.NewGrok_API_KEY;

  // No key → still answer locally instead of returning a hard error
  if (!apiKey) {
    return NextResponse.json(
      { reply: localAnswer(message) || offlineReply() },
      { status: 200 }
    );
  }

  const groq = new Groq({ apiKey, timeout: 12000, maxRetries: 1 });

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
- **Role:** Founder & CEO of Global Technology Solutions (GTSolution360) → https://www.gtsol360.com/
- **Agency:** Clients order development or digital marketing services online at gtsol360.com, then track each order in the client dashboard.
- **Agency Services:** Web & Mobile App Development, Custom Software & APIs, Digital Marketing & SEO, AI Chatbots & Automation, UI/UX Design.
- **Education:** BSCS from Iqra University (2022 - Present) | College: SIPS (2019 - 2021).
- **Experience:** Founder & CEO at GTSolution360 (2023 - Present) | Full-Stack Developer & Team Lead at Saad Enterprises (2021 - 2023) | Freelance Full-Stack Developer on Fiverr (2021 - Present).
- **Stack:** HTML, CSS, JS, TypeScript, React, Next.js, Tailwind, Node, Express, MongoDB, Firebase, MySQL, Git.
- **AI Focus:** Agentic Workflows, Groq/OpenAI, Vector DBs, RAG.
- **Projects:** SmartMatrix AI, E-Commerce (API-driven), NeuralVision PRO, AI Financial App, gtsol360.com.
- **Contact:** umaarahmed03@gmail.com | +92 3434688216 | https://www.linkedin.com/in/umaar-ahmed-a3b252266/
- **Background:** Founder/CEO, Developer, Team Lead, and Technical Support Executive.

🚀 QUICK EXAMPLES:
- User: "Who is Umaar?" -> "Umaar is a Full-Stack Engineer and the Founder & CEO of the agency GTSolution360."
- User: "How do I order a service?" -> "Order any development or digital marketing service at https://www.gtsol360.com/ and track it in the client dashboard."
- User: "Skills?" -> "His core stack includes Next.js, TypeScript, Node.js, and AI Agentic Workflows."
- User: "GitHub?" -> "Check his work here: https://github.com/UmaarAhmed"

If you are ever unsure or the question is about Umaar, answer from the data above.
Be bold. Be brief. Zero fluff.`
        },
        { role: "user", content: message }
      ],
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    });

    const reply =
      chatCompletion.choices[0]?.message?.content ||
      localAnswer(message) ||
      offlineReply();
    return NextResponse.json({ reply });

  } catch (error) {
    // Never surface an error to the UI — fall back to the local KB so the
    // chatbot keeps answering even when Groq is down or the key is invalid.
    console.error("Groq Error:", error);
    return NextResponse.json(
      { reply: localAnswer(message) || offlineReply() },
      { status: 200 }
    );
  }
}

/** Generic-but-useful reply when nothing else matched. */
function offlineReply() {
  return `I'm running in offline mode right now, but here's what I can help with:

- **Who is Umaar?** — Full-Stack Developer & CEO of GTSolution360
- **Skills & experience**
- **Agency services & how to order** → https://www.gtsol360.com/
- **Contact** — umaarahmed03@gmail.com · +92 3434688216

Or reach him directly on [LinkedIn](https://www.linkedin.com/in/umaar-ahmed-a3b252266/).`;
}