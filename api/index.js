import { handle } from "hono/vercel";
export const config = { runtime: "nodejs18.x" };

export default async function handler(req, res) {
  try {
    const mod = await import("../build/server/index.js");
    const app = mod.app || mod.default;

    // Convert Node.js server interface to Hono response:
    const fn = handle(app);

    const response = await fn(req);
    const body = await response.text();

    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    res.send(body);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server initialization failed" });
  }
}
