import { kv } from "../utils/kv.ts";
import { io } from "../main.ts";

export const onCursor = async (at: number) => {
  await kv.set(["cursor"], at);
  io.emit("qn-cursor", at);
};
