import {atom, selector} from "recoil";
import {GameSymbols} from "../components/GameSymbols";
import {Position} from "../models/cells";
import {GRID_SIZE} from "../constants";
import {getAdjacentEmptyNeighbours, isInPositions} from "../utils";

export type GridData = GameSymbols | null;
export type GridDataArray = GridData[][];
export type GameState = {
    grid: GridDataArray;
    firstSymbolPosition?: Position
};

export const getEmptyGrid = (): GridDataArray => Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));

export const GridState = atom<GridDataArray>({
    key: "GridState",
    default: getEmptyGrid()
})

export const GridHistoryState = atom<GameState[]>({
    key: "GridHistoryState",
    default: [{
        grid: getEmptyGrid()
    }]
})

export const GridHistoryCursor = atom<number>({
    key: "GridHistoryCursor",
    default: 0
})

export const FirstSymbolPosition = atom<Position | undefined>({
    key: "FirstSymbolPosition",
    default: undefined
})

export const CanPlaySelector = selector<boolean>({
    key: "CanPlaySelector",
    get: ({get}) => {
        const firstSymbolPosition = get(FirstSymbolPosition);
        const grid = get(GridState);
        const lockedCells = get(lockedCellsSelector);
        const adjacentEmptyNeighbors = get(adjacentEmptyNeighborsSelector);

        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x <= GRID_SIZE; x++) {
                // Second symbol to place, is current playable ?
                if (!!firstSymbolPosition && isInPositions({x, y}, adjacentEmptyNeighbors)) {
                    return true;
                }

                // Has adjacent cell not locked?
                const adjacent = getAdjacentEmptyNeighbours({x, y}, grid)
                if (adjacent.length !== 0 && adjacent.some(adjacent => !isInPositions(adjacent, lockedCells))) {
                    return true
                }
            }
        }
        return false;
    }
})

export const InitSymbolPlacedSelector = selector<boolean>({
    key: "InitSymbolPlacedSelector",
    get: ({get}) => {
        const grid = get(GridState);
        return !!grid[0][0];
    }
})

export const GameStateSelector = selector<"INIT" | "IDLE" | "SECOND_SYMBOL" | "END">({
    key: "GameStateSelector",
    get: ({get}) => {
        const initSymbolPlaced = get(InitSymbolPlacedSelector);
        const canPlay = get(CanPlaySelector);
        const firstSymbol = get(FirstSymbolPosition);

        if (!canPlay) return "END";
        if (!initSymbolPlaced) return "INIT";
        if (firstSymbol) return "SECOND_SYMBOL";
        return "IDLE"
    }
})

export const adjacentEmptyNeighborsSelector = selector<Position[]>({
    key: "adjacentEmptyNeighborsSelector",
    get: ({get}) => {
        const grid = get(GridState);
        const firstPosition = get(FirstSymbolPosition);

        if (!firstPosition) return [];

        return getAdjacentEmptyNeighbours(firstPosition, grid);
    }
})

export const lockedCellsSelector = selector<Position[]>({
    key: "lockedCellsSelector",
    get: ({get}) => {
        const grid = get(GridState);

        const positions: Position[] = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x <= GRID_SIZE; x++) {
                if (grid[y][x]) continue;
                const adjacent = getAdjacentEmptyNeighbours({x, y}, grid)
                if (adjacent.length === 0) {
                    positions.push({x, y});
                }
            }
        }
        return positions
    }
})