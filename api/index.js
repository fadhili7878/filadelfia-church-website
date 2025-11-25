import { handle } from "hono/vercel";

export const config = {
  runtime: "vercel-nodejs@4.0.0"
};

export default async function handler(req, res) {
  try {
    const mod = await import("../build/server/index.js");

    const app = mod.app || mod.default;

    const fn = handle(app);
    const response = await fn(req);

    const text = await response.text();

    res.status(response.status);
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    res.send(text);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
