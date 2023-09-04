import {Position} from "./models/cells";
import {GridData, GridDataArray} from "./states/atoms";
import {GRID_SIZE} from "./constants";

export function getAdjacentEmptyNeighbours(position: Position, grid: GridDataArray): Position[] {
    const positions: Position[] = [];
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
        for (let xOffset = -1; xOffset <= 1; xOffset++) {
            if (xOffset === 0 && yOffset === 0) continue;

            const x = position.x + xOffset;
            const y = position.y + yOffset;

            if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) continue;

            if (!grid[y][x]) {
                positions.push({x, y})
            }
        }
    }
    return positions
}

export function isInPositions(position: Position, positions: Position[]): boolean {
    return !!positions.find(pos => position.x === pos.x && position.y === pos.y)
}

export function getRow(y: number, grid: GridDataArray): GridData[] {
    const values: GridData[] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
        values.push(grid[y][x])
    }
    return values;
}

export function getColumn(x: number, grid: GridDataArray): GridData[] {
    const values: GridData[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        values.push(grid[y][x])
    }
    return values;
}

export function getDiagonal(grid: GridDataArray): GridData[] {
    const values: GridData[] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
        values.push(grid[GRID_SIZE - 1 - x][x])
    }
    return values;
}

export function computeScore(values: GridData[]): number {
    const allDifferent = new Set(values.filter(value => value)).size === GRID_SIZE;
    if (allDifferent) return -5;

    const getScore = (combo: number) => {
        switch (combo) {
            case 2:
                return 2;
            case 3:
                return 3;
            case 4:
                return 8;
            case 5:
                return 10;
            default:
                return 0;
        }
    }

    let score = 0;
    let combo = 1;
    let previousSymbol: GridData = null;

    for (let value of values) {
        if (!previousSymbol || previousSymbol !== value) {
            score += getScore(combo);
            combo = 1;
        } else {
            combo++;
        }

        previousSymbol = value;
    }

    score += getScore(combo);

    return score;
}