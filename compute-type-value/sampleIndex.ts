import type { Sum } from "./sampleSum.d.ts";

type Event = {
  n1: number;
  n2: number;
};

export type Handler<EVENT extends { n1: number; n2: number }> = Sum<
  EVENT["n1"],
  EVENT["n2"]
>;

// TEST
namespace Test1 {
  type Test = Handler<{ n1: 3; n2: 4 }>;
  // @ts-expect-error
  const c1: Test = 6;
  const c2: Test = 7;
  // @ts-expect-error
  const c3: Test = 8;
}
