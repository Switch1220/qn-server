import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { onUpdate } from "./events/update.ts";
import { onClear } from "./events/clear.ts";
import { onCursor } from "./events/cursor.ts";
import { client } from "./utils/db.ts";

export const io = new Server(
  { cors: { origin: "*" } },
);

io.on("connection", async (socket) => {
  const { rows } = await client.queryObject<
    { value: string; cursor: number }
  >`
    SELECT VALUE, CURSOR FROM "Number" WHERE ID = 1
  `;
  // const qns = await kv.get(["qn"]);
  socket.emit("initial-qns", rows[0].value.split(" "));

  // const cursor = await kv.get(["cursor"]);

  socket.emit("initial-cursor", rows[0].cursor ?? 0);

  socket.on("update-req", onUpdate);
  socket.on("clear-req", onClear);
  socket.on("cursor-req", onCursor);
});

await serve(io.handler(), {
  port: 3000,
});

await client.end();
