import { Hono } from "hono";

const app = new Hono().post("/login", (c) => {
  return c.json({ succes: "ok" });
});

export default app;
