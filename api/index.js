import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const mod = await import("../build/server/index.js");
  
  // Hono app is exported as `app`
  const app = mod.app || mod.default;

  return handle(app)(req);
}
