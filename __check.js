/**
 * Lightweight syntax validator for every source file we touched.
 * Uses the TypeScript compiler (already present via Next.js) to parse
 * JS/JSX without emitting anything.
 */
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

const targets = [
  "app/layout.js",
  "app/page.js",
  "app/blog/page.js",
  "app/components/Brand.jsx",
  "app/components/ThemeProvider.jsx",
  "app/components/ThemeToggle.jsx",
  "app/components/navbar.jsx",
  "app/components/footer.jsx",
  "app/components/VisitorCounter.jsx",
  "app/components/FloatingButtons.jsx",
  "app/components/Chatbot.jsx",
  "app/components/helper/CustomCursor.js",
  "app/components/helper/glow-card.jsx",
  "app/components/helper/animation-lottie.jsx",
  "app/components/homepage/hero-section/index.jsx",
  "app/components/homepage/about/index.jsx",
  "app/components/homepage/skills/index.jsx",
  "app/components/homepage/experience/index.jsx",
  "app/components/homepage/education/index.jsx",
  "app/components/homepage/projects/index.jsx",
  "app/components/homepage/projects/project-card.jsx",
  "app/components/homepage/Certificates/Certificates.jsx",
  "app/components/homepage/blog/index.jsx",
  "app/components/homepage/blog/blog-card.jsx",
  "app/components/homepage/contact/index.jsx",
  "app/components/homepage/contact/contact-form.jsx",
  "next.config.js",
];

let bad = 0;
for (const rel of targets) {
  const abs = path.resolve(rel);
  if (!fs.existsSync(abs)) {
    console.log("MISSING  " + rel);
    bad++;
    continue;
  }
  const src = fs.readFileSync(abs, "utf8");
  const sf = ts.createSourceFile(
    abs,
    src,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.JSX
  );
  const diags = sf.parseDiagnostics || [];
  if (diags.length) {
    bad++;
    console.log("ERROR    " + rel);
    for (const d of diags.slice(0, 6)) {
      const { line, character } = sf.getLineAndCharacterOfPosition(d.start);
      console.log(
        "         line " + (line + 1) + ":" + (character + 1) + "  " +
          ts.flattenDiagnosticMessageText(d.messageText, " ")
      );
    }
  } else {
    console.log("OK       " + rel);
  }
}
console.log(bad === 0 ? "\nALL FILES PARSE CLEANLY" : "\n" + bad + " FILE(S) WITH ERRORS");