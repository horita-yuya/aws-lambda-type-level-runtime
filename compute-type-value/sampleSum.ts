type Num<N extends number, COUNT extends number[]> = COUNT["length"] extends N
  ? COUNT
  : Num<N, [1, ...COUNT]>;

type Sum<N1 extends number, N2 extends number> = [
  ...Num<N1, []>,
  ...Num<N2, []>,
]["length"];

export type Handler<EVENT extends { n1: number; n2: number }> = Sum<
  EVENT["n1"],
  EVENT["n2"]
>;
