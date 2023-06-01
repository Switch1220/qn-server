import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const pwd = Deno.env.get("PASSWORD");

export const client = new Client({
  user: "postgres",
  database: "postgres",
  hostname: "db.qxriygfililzsjlmkebb.supabase.co",
  port: 5432,
  password: pwd,
});
