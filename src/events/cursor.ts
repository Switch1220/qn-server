import { io } from "../main.ts";
import { client } from "../utils/db.ts";

export const onCursor = async (at: number) => {
  // await kv.set(["cursor"], at);

  await client.queryArray`
    UPDATE "Number" SET CURSOR = ${at}
`;

  io.emit("qn-cursor", at);
};
