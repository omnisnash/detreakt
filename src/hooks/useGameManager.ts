import {GameSymbols} from "../components/GameSymbols";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {
    adjacentEmptyNeighborsSelector,
    FirstSymbolPosition,
    GameStateSelector,
    getEmptyGrid,
    GridDataArray,
    GridHistoryCursor,
    GridHistoryState,
    GridState,
    lockedCellsSelector
} from "../states/atoms";
import {Position} from "../models/cells";
import {isInPositions} from "../utils";

export function useGameManager() {
    const [grid, setGrid] = useRecoilState(GridState);
    const [gridHistory, setGridHistory] = useRecoilState(GridHistoryState);
    const [historyCursor, setCursor] = useRecoilState(GridHistoryCursor);
    const setFirstSymbol = useSetRecoilState(FirstSymbolPosition);
    const gameState = useRecoilValue(GameStateSelector);
    const adjacentToFirst = useRecoilValue(adjacentEmptyNeighborsSelector);
    const lockedCells = useRecoilValue(lockedCellsSelector);

    const resetGrid = useResetRecoilState(GridState);
    const resetGridHistory = useResetRecoilState(GridHistoryState);
    const resetCursor = useResetRecoilState(GridHistoryCursor);
    const resetFirstSymbol = useResetRecoilState(FirstSymbolPosition);

    const placeInitSymbol = (symbol: GameSymbols) => {
        const newGrid: GridDataArray = structuredClone(grid);
        newGrid[0][0] = symbol;
        setGrid(newGrid)
        pushInHistory(newGrid);
    }

    const getContent = (position: Position) => {
        return grid[position.y][position.x];
    }

    const placeSymbol = (x: number, y: number, symbol: GameSymbols) => {
        const newGrid: GridDataArray = structuredClone(grid);
        newGrid[y][x] = symbol;

        if (gameState === "IDLE") {
            setFirstSymbol({x, y})
            pushInHistory(newGrid, {x, y});
        } else if (gameState === "SECOND_SYMBOL") {
            const isCurrentValid = adjacentToFirst.find(position => position.x === x && position.y === y)
            if (!isCurrentValid) {
                return;
            }

            setFirstSymbol(undefined);
            pushInHistory(newGrid, undefined);
        }

        setGrid(newGrid)
    }

    const isPlayableAsSecondPosition = (position: Position): boolean => {
        return isInPositions(position, adjacentToFirst);
    }

    const isLocked = (position: Position): boolean => {
        return isInPositions(position, lockedCells);
    }

    const canUndo = gridHistory.length > 0 && historyCursor - 1 >= 0;
    const canRedo = gridHistory.length > 0 && historyCursor + 1 < gridHistory.length;

    const pushInHistory = (grid: GridDataArray, firstSymbolValue?: Position) => {
        const newArray = [...gridHistory];
        newArray.splice(historyCursor + 1);
        setGridHistory([...newArray, {grid: grid, firstSymbolPosition: firstSymbolValue}])
        setCursor(currVal => currVal + 1)
    }

    const undo = () => {
        if (!canUndo) return;
        const state = gridHistory[historyCursor - 1]
        setGrid(state.grid);
        setFirstSymbol(state.firstSymbolPosition);
        setCursor(currVal => currVal - 1);
    }

    const redo = () => {
        if (!canRedo) return;
        const state = gridHistory[historyCursor + 1];
        setGrid(state.grid);
        setFirstSymbol(state.firstSymbolPosition);
        setCursor(currVal => currVal + 1);
    }

    const clear = () => {
        if (gameState === "END") {
            resetCursor()
            resetGridHistory();
            resetGrid();
        } else {
            const newGrid = getEmptyGrid()
            setGrid(newGrid);
            pushInHistory(newGrid)
        }

        resetFirstSymbol();
    }

    return {
        placeInitSymbol,
        getContent,
        placeSymbol,
        isPlayableAsSecondPosition,
        isLocked,
        canRedo,
        canUndo,
        undo,
        redo,
        clear
    }
}