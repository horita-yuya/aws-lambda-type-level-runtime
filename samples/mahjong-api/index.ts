import {MahjongKun, Tile} from "mahjong-kun";

export type Handler<EVENTS extends {
  t1: Tile;
  t2: Tile;
  t3: Tile;
  t4: Tile;
  t5: Tile;
  t6: Tile;
  t7: Tile;
  t8: Tile;
  t9: Tile;
  t10: Tile;
  t11: Tile;
  t12: Tile;
  t13: Tile;
  t14: Tile;
  winning: Tile;
  style: "ron" | "tumo";
  position: "parent" | "child";
}> = MahjongKun<[
  EVENTS["t1"],
  EVENTS["t2"],
  EVENTS["t3"],
  EVENTS["t4"],
  EVENTS["t5"],
  EVENTS["t6"],
  EVENTS["t7"],
  EVENTS["t8"],
  EVENTS["t9"],
  EVENTS["t10"],
  EVENTS["t11"],
  EVENTS["t12"],
  EVENTS["t13"],
  EVENTS["t14"]
], EVENTS["winning"], [], EVENTS["style"], EVENTS["position"]>