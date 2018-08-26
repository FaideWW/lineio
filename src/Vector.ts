/**
 * Vector.ts
 *
 * Holds a vector and math responsible for manipulating
 * vectors
 */

import { IVector } from './dataTypes';

/**
 * Vector
 */
export class Vector implements IVector {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Converts a vector position into a 2d-encoded array index
 */
export function positionToIndex(v: IVector, rowWidth: number): number {
  return v.y * rowWidth + v.x;
}

/**
 * Inverse of `positionToIndex`
 */
export function indexToPosition(index: number, rowWidth: number): IVector {
  return new Vector(index % rowWidth, Math.floor(index / rowWidth));
}

export function vectorAdd(v1: IVector, v2: IVector): IVector {
  return new Vector(v1.x + v2.x, v1.y + v2.y);
}

export function vectorSubtract(v1: IVector, v2: IVector): IVector {
  return new Vector(v1.x - v2.x, v1.y - v2.y);
}

export function vectorMultiply(v1: IVector, s: number): IVector {
  return new Vector(v1.x * s, v1.y * s);
}

export function vectorDivide(v1: IVector, s: number): IVector {
  return new Vector(v1.x / s, v1.y / s);
}

export function vectorMagnitude(v: IVector): number {
  return Math.sqrt(v.x ** 2 + v.y ** 2);
}

export function vectorNormalize(v: IVector): IVector {
  return vectorDivide(v, vectorMagnitude(v));
}
