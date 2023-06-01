import { io } from "../main.ts";
import { client } from "../utils/db.ts";

export const onUpdate = async (message: string) => {
  // const result = await kv.get<"Number"[]>(["qn"]);
  const { rows } = await client.queryObject<{ value: string }>`
  SELECT VALUE, CURSOR FROM "Number" WHERE ID = 1
`;

  const qnSet = new Set(rows[0].value.split(" ").map((qn) => Number(qn)));

  if (typeof message === "string") {
    const nums = message
      .split(" ")
      .map((s) => s.split(","))
      .flat()
      .map((s) => s.split("\n"))
      .flat()
      .map((s) => s.replace(/^\D+/g, ""))
      .map((s) => Number(s))
      .filter((s) => !isNaN(s))
      .filter((s) => s !== 0);

    for (const num of nums) {
      qnSet.add(num);
    }

    io.emit("qn-update", [...qnSet]);

    // await kv.set(["qn"], [...qnSet]);

    await client.queryArray`
    UPDATE "Number" SET VALUE = ${[...qnSet].join(" ")}
  `;
  }
};
