import { Hono } from "hono";
import { createApi } from "./api";

type Env = {
  DB: D1Database;
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Env }>();

app.route("/api", createApi());

export default app;
