import { handle } from "@hono/node-server/vercel";

export default async function handler(req, res) {
  try {
    // Load server build
    const mod = await import("../build/server/index.js");

    // Prefer the Node "app" export — NOT default
    const app = mod.app;

    if (!app) {
      throw new Error("Hono app not exported from build/server/index.js");
    }

    // Node adapter
    const fn = handle(app);

    const response = await fn(req);

    // Convert FetchResponse → Node response
    const body = await response.text();

    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    res.send(body);
  } catch (error) {
    console.error("🔥 REAL SERVER ERROR:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error?.message,
      stack: error?.stack
    });
  }
}
