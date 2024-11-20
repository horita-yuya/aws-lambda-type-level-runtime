import { describe, expect, it } from "vitest";
import { createEntry } from "./entry";

describe("handler", () => {
  it("standard", () => {
    const entry = createEntry([
      "node",
      "index.js",
      "index.Handler",
      '{"n1": 3, "n2": 4}',
      "/tmp",
    ]);

    expect(entry.entryFile).toBe("index");
    expect(entry.entryType).toBe("Handler");
    expect(entry.extension).toBe("ts");
  });

  it("with .ts extension", () => {
    const entry = createEntry([
      "node",
      "index.js",
      "index.ts.Handler",
      '{"n1": 3, "n2": 4}',
      "/tmp",
    ]);

    expect(entry.entryFile).toBe("index");
    expect(entry.entryType).toBe("Handler");
    expect(entry.extension).toBe("ts");
  });

  it("with .d.ts extension", () => {
    const entry = createEntry([
      "node",
      "index.js",
      "index.d.ts.Handler",
      '{"n1": 3, "n2": 4}',
      "/tmp",
    ]);

    expect(entry.entryFile).toBe("index");
    expect(entry.entryType).toBe("Handler");
    expect(entry.extension).toBe("d.ts");
  });
});
