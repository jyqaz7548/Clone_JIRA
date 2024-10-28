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
import { fromJSON } from "postcss";
