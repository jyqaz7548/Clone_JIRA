import "server-only";

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as Accounttype,
  type Client as Clienttype,
  type Databases as Databasestype,
  type Models as Modelstype,
  type Storage as Storagetype,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/constants";

export const sessionMiddleware = createMiddleware(async (c, next) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = getCookie(c, AUTH_COOKIE);

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  client.setSession(session);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const user = await account.get;
});
