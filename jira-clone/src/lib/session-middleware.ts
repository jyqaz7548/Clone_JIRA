import "server-only";

import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  type Account as Accounttype,
  type Databases as Databasestype,
  type Users as Userstype,
  type Storage as Storagetype,
} from "node-appwrite";

import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

import { AUTH_COOKIE } from "@/features/auth/constants";

type AdditionalContext = {
  Variables: {
    account: Accounttype;
    databases: Databasestype;
    storage: Storagetype;
    users: Userstype;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_COOKIE); //AUTH_COOKIE 에 로그인정보가 담겨져있음

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401); //로그인 정보가 없으면 에러로 리턴
    }
    client.setSession(session);

    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    const user = await account.get();

    c.set("account", account);
    c.set("databases", databases);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);
