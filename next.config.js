const path = require("path");

module.exports = {
  // Pin the workspace root so Next.js stops scanning the parent folder
  // (fixes the "multiple lockfiles" warning + speeds up file watching).
  turbopack: {
    root: __dirname,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  images: {
    // Optimise every large raster asset (portfolio.gif, certificates, etc.)
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 200, 256, 320],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media.dev.to",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "media2.dev.to",
        pathname: "**",
      },
    ],
  },

  // Strip console noise from the production bundle only.
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  experimental: {
    // Tree-shake the very large icon / motion barrel files.
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "date-fns",
    ],
  },
};