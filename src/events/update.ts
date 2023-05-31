import { io } from "../main.ts";
import { kv } from "../utils/kv.ts";

export const onUpdate = async (message: string) => {
  const result = await kv.get<number[]>(["qn"]);
  const qnSet = new Set(result.value);

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

    await kv.set(["qn"], [...qnSet]);
  }
};
