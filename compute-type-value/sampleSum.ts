type Num<N extends number, COUNT extends number[]> = COUNT["length"] extends N
  ? COUNT
  : Num<N, [1, ...COUNT]>;

export type Sum<N1 extends number, N2 extends number> = [
  ...Num<N1, []>,
  ...Num<N2, []>,
]["length"];
