import { randomUUID } from "node:crypto";
import * as fs from "node:fs";
import { describe, expect, it } from "vitest";
import { evaluate } from "./evaluate";

describe("evaluate type", () => {
  it("standard", () => {
    const type = `
    export type Handler = 1;
    `.trim();
    const fileName = `/tmp/${randomUUID()}.ts`;
    fs.writeFileSync(fileName, type);

    const result = evaluate(fileName, "Handler", {});

    expect(result).toBe(1);
  });

  it("string evaluation", () => {
    const type = `
    export type Handler<EVENTS extends { n1: number }> = EVENTS["n1"] extends number ? "is-number" : "is-not-number";
    `.trim();

    const fileName = `/tmp/${randomUUID()}.ts`;
    fs.writeFileSync(fileName, type);

    const r1 = evaluate(fileName, "Handler", { n1: 1 });
    const r2 = evaluate(fileName, "Handler", { n1: "1" });

    expect(r1).toBe("is-number");
    expect(r2).toBe("is-not-number");
  });

  it("number evaluation", () => {
    const type = `
    export type Handler<EVENTS extends { n1: number }> = EVENTS["n1"] extends 1 ? 0 : 1;
    `.trim();

    const fileName = `/tmp/${randomUUID()}.ts`;
    fs.writeFileSync(fileName, type);

    const r1 = evaluate(fileName, "Handler", { n1: 1 });
    const r2 = evaluate(fileName, "Handler", { n1: 0 });

    expect(r1).toBe(0);
    expect(r2).toBe(1);
  });
});
