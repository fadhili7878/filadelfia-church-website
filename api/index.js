import { handle } from "@hono/node-server/vercel";

export default async function handler(req, res) {
  try {
    const mod = await import("../build/server/index.js");

    const app = mod.app || mod.default;

    const fn = handle(app);
    const response = await fn(req);

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
