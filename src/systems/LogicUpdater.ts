/**
 *  systems/LogicUpdater.ts
 *
 *  handles performing actor logic updates
 *   - unit pathfinding
 *   - tower target selection
 *
 */

import {
  IGameState,
  ILaneState,
  ITowerState,
  IUnitState,
  IVector
} from '../dataTypes';
import { Lane } from '../Lane';
import { Unit } from '../Unit';
import {
  indexToPosition,
  positionToIndex,
  vectorNormalize,
  vectorSubtract
} from '../Vector';

type LogicSettings = {};

const DEFAULT_SETTINGS: LogicSettings = {};

type PathfindingNode = {
  distance: number;
  next: number;
};

/**
 * LogicUpdater
 *
 * Responsible for updating pathfinding and target selection for lane actors
 */
export class LogicUpdater {
  private navigationData: { [nodeIndex: number]: PathfindingNode };
  private lastState: IGameState;

  constructor(settings: LogicSettings = DEFAULT_SETTINGS) {
    this.navigationData = null;
    this.lastState = null;
  }

  public updateLogic = (gameState: IGameState): void => {
    // Decide if we need to regenerate the pathfinding data
    // (for example, if towers have been added or removed
    // TODO: for now, just regenerate every frame to gauge performance

    gameState.lanes.forEach((lane: ILaneState) => {
      this.regenerateNavigationData(lane);

      lane.units.forEach((unit: Unit) => {
        // debug: log out path to destination
        const pathNode: PathfindingNode = this.navigationData[positionToIndex(unit.getTilePosition(), lane.width)];
        const destination: IVector = indexToPosition(pathNode.next, lane.width);
        unit.heading = vectorNormalize(vectorSubtract(destination, unit.position));
        console.log(unit.heading);
      });
    });
  }

  public regenerateNavigationData = (lane: ILaneState): void => {
    const goal: IVector = { x: lane.destination.x, y: lane.destination.y };
    // Rebuild impassable terrain matrix
    const collisionMatrix: number[] = [];
    lane.towers.forEach((tower: ITowerState) => {
      collisionMatrix[positionToIndex(tower.position, lane.width)] = 1;
    });

    const navigationGrid: { [nodeIndex: number]: PathfindingNode } = {};
    navigationGrid[positionToIndex(goal, lane.width)] = {
      distance: 0,
      next: null
    };

    const frontier: IVector[] = [goal];

    while (frontier.length > 0) {
      const current: IVector = frontier.shift();
      const currentIndex: number = positionToIndex(current, lane.width);

      getNeighbors(current, lane.width, lane.height).forEach((neighbor: IVector) => {
        const neighborIndex: number = positionToIndex(neighbor, lane.width);

        if (navigationGrid[neighborIndex] === undefined && collisionMatrix[neighborIndex] !== 1) {
          frontier.push(neighbor);
          navigationGrid[neighborIndex] = {
            distance: navigationGrid[currentIndex].distance + 1,
            next: currentIndex
          };
        }
      });
    }

    this.navigationData = navigationGrid;
  }
}

function getNeighbors(v: IVector, gridWidth: number, gridHeight: number): IVector[] {
  const neighbors: IVector[] = [];
  if (v.y > 0) {
    neighbors.push({ x: v.x, y: v.y - 1 });
  }

  if (v.y < gridHeight) {
    neighbors.push({ x: v.x, y: v.y + 1 });
  }

  if (v.x > 0) {
    neighbors.push({ x: v.x - 1, y: v.y });
  }

  if (v.x < gridWidth) {
    neighbors.push({ x: v.x + 1, y: v.y });
  }

  return neighbors;
}
