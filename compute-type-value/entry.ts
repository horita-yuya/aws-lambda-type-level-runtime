export function createEntry(args: string[]): {
  entryFile: string;
  entryType: string;
  events: Record<string, string | number>;
  absolutePath: string;
  extension: "ts" | "d.ts";
} {
  const handler = args[2];
  const events = JSON.parse(args[3]);
  const absolutePath = args[4];

  console.info("AAAAAAAAAAAA");
  console.info(handler);
  const splitted = handler.split(".");

  if (splitted.length === 2) {
    return {
      entryFile: splitted[0],
      entryType: splitted[1],
      events,
      absolutePath,
      extension: "ts",
    };
  } else if (splitted.length === 3) {
    // index.ts.Handler
    if (splitted[1] !== "ts") {
      throw new Error("Invalid handler");
    }

    return {
      entryFile: splitted[0],
      entryType: splitted[2],
      events,
      absolutePath,
      extension: "ts",
    };
  } else if (splitted.length === 4) {
    // index.d.ts.Handler
    if (splitted[1] !== "d" || splitted[2] !== "ts") {
      throw new Error("Invalid handler");
    }
    return {
      entryFile: splitted[0],
      entryType: splitted[3],
      events,
      absolutePath,
      extension: "d.ts",
    };
  }

  throw new Error("Invalid handler");
}
