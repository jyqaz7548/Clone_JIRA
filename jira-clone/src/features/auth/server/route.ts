import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { loginSchema, registerSchema } from "../schemas";

import { createAdminClient } from "@/lib/appwrite";

import { ID } from "node-appwrite";

const app = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    console.log({ email, password });

    return c.json({ email, password });
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    const { account } = await createAdminClient();

    await account.create(ID.unique(), email, password, name);

    return c.json({ name, email, password });
  });

export default app;
