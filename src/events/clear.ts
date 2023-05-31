import { kv } from "../utils/kv.ts";
import { io } from "../main.ts";

export const onClear = async () => {
  await kv.delete(["qn"]);

  io.emit("qn-clear");
};
