import { handle } from "@hono/node-server/vercel";

export default async function handler(req, res) {
  try {
    // Load server build
    const mod = await import("../build/server/index.js");

    // Get the Hono app
    const app = mod.app;

    if (!app) {
      throw new Error("Hono app not exported from build/server/index.js");
    }

    // Let the Vercel adapter handle everything
    return handle(app)(req, res);
  } catch (error) {
    console.error("🔥 SERVER ERROR:", error);
    
    // Only send error response if headers haven't been sent
    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal Server Error",
        details: error?.message,
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      });
    }
  }
}