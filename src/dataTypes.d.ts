/**
 * Data import types
 */
export type UnitData = {
  x: number;
  y: number;
  health: number;
};

export type TowerData = {
  x: number;
  y: number;
  health: number;
};

export type LaneData = {
  width: number;
  height: number;
  units: UnitData[];
  towers: TowerData[];
};

export type GameData = {
  lanes: LaneData[];
};
