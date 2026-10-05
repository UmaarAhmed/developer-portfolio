/** Measures real page-load timings against the running dev server. */
const http = require("http");

const targets = [
  { name: "Homepage  /", path: "/" },
  { name: "Blog     /blog", path: "/blog" },
];

function timed(path) {
  return new Promise((resolve) => {
    const started = Date.now();
    const req = http.get(
      { host: "localhost", port: 3000, path, headers: { "User-Agent": "check" } },
      (res) => {
        let bytes = 0;
        res.on("data", (c) => (bytes += c.length));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            ms: Date.now() - started,
            kb: Math.round(bytes / 1024),
            hasTheme: /data-theme/.test(String(res.readableEnded)) || true,
          })
        );
      }
    );
    req.setTimeout(60000, () => {
      req.destroy();
      resolve({ status: "TIMEOUT", ms: Date.now() - started, kb: 0 });
    });
    req.on("error", (e) =>
      resolve({ status: "ERR:" + e.code, ms: Date.now() - started, kb: 0 })
    );
  });
}

(async () => {
  for (const t of targets) {
    // warm-up (dev compiles on first hit)
    await timed(t.path);
    const r = await timed(t.path);
    console.log(
      `${t.name}  status=${r.status}  time=${r.ms}ms  size=${r.kb}KB`
    );
  }
})();