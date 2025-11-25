import { handle } from "@hono/node-server/vercel";

let cachedApp;

export default async function handler(req, res) {
  try {
    // Cache the app to avoid re-importing on every request
    if (!cachedApp) {
      const mod = await import("../build/server/index.js");
      cachedApp = mod.app || mod.default;
      
      if (!cachedApp) {
        console.error("Available exports:", Object.keys(mod));
        throw new Error("Hono app not found in build/server/index.js");
      }
      
      console.log("✅ Hono app loaded successfully");
    }

    // Log the request for debugging
    console.log(`${req.method} ${req.url}`);

    // Use the Vercel adapter
    return handle(cachedApp)(req, res);
    
  } catch (error) {
    console.error("🔥 SERVER ERROR:", error);
    
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal Server Error",
        details: error?.message,
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      });
    }
  }
}