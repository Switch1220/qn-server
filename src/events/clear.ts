import { io } from "../main.ts";
import { client } from "../utils/db.ts";

export const onClear = async () => {
  // await kv.delete(["qn"]);
  await client.queryObject`
    UPDATE "Number" SET VALUE = ''
  `;

  io.emit("qn-clear");
};
