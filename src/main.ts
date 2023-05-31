import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { kv } from "./utils/kv.ts";
import { onUpdate } from "./events/update.ts";
import { onClear } from "./events/clear.ts";
import { onCursor } from "./events/cursor.ts";

export const io = new Server(
  { cors: { origin: "*" } },
);

io.on("connection", async (socket) => {
  const qns = await kv.get(["qn"]);
  socket.emit("initial-qns", qns.value);

  const cursor = await kv.get(["cursor"]);
  socket.emit("initial-cursor", cursor.value ?? 0);

  socket.on("update-req", onUpdate);
  socket.on("clear-req", onClear);
  socket.on("cursor-req", onCursor);
});

await serve(io.handler(), {
  port: 3000,
});
