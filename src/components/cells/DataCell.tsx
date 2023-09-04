import React, {useEffect, useState} from 'react';
import {GridCellContainer, GridCellContent} from "./GridCellBase";
import ShapeSelector from "../ShapeSelector";
import GameSymbol, {GameSymbols} from "../GameSymbols";
import {useRecoilValue} from "recoil";
import {GameStateSelector} from "../../states/atoms";
import {useGameManager} from "../../hooks/useGameManager";

export interface DataCellProps {
    x: number;
    y: number;
}

const DataCell = (props: DataCellProps) => {
    const {x, y} = props;

    const gameState = useRecoilValue(GameStateSelector);

    const {getContent, placeInitSymbol, placeSymbol, isPlayableAsSecondPosition, isLocked} = useGameManager();

    const playableAsSecondPosition = isPlayableAsSecondPosition({x, y})
    const cellContent = getContent({x, y});
    const isDiagonal = x + y === 4;
    const isFirstDataCell = x === 0 && y === 0;
    const shouldKeepSymbolSelectorOpen = isFirstDataCell && gameState === "INIT";
    const locked = isLocked({x, y});

    const cellIsSelectable = () => {
        switch (gameState) {
            case "INIT":
                return isFirstDataCell;
            case "IDLE":
                return !locked && !cellContent;
            case "SECOND_SYMBOL":
                return gameState === "SECOND_SYMBOL" && playableAsSecondPosition
            case "END":
                return false;

        }
    }


    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
    const [selectorOpen, setSelectorOpen] = useState<boolean>(shouldKeepSymbolSelectorOpen);

    useEffect(() => {
        if (shouldKeepSymbolSelectorOpen && !cellContent) {
            setSelectorOpen(true)
        } else if (isFirstDataCell) {
            setSelectorOpen(false)
        }
    }, [gameState]);

    const handleOpenSelector = () => {
        if (!cellIsSelectable()) return;
        setSelectorOpen(true)
    }

    const handleSelectSymbol = (symbol: GameSymbols) => {
        if (isFirstDataCell) {
            placeInitSymbol(symbol);
        } else {
            placeSymbol(props.x, props.y, symbol)
        }
        setSelectorOpen(false);
    }

    const handleCloseSelector = () => {
        if (shouldKeepSymbolSelectorOpen) return;
        setSelectorOpen(false);
    }
    return (
        <GridCellContainer $highlight={playableAsSecondPosition} $hovered={cellIsSelectable()}
                           onClick={handleOpenSelector} $heavyBorder={isFirstDataCell} $type={"GRID"}
                           $diagonal={isDiagonal}>
            <GridCellContent ref={setAnchor}>
                {selectorOpen &&
                    <ShapeSelector onSelectSymbol={handleSelectSymbol} open={selectorOpen} onClose={handleCloseSelector}
                                   anchor={anchor}/>
                }
                {cellContent ? <GameSymbol symbol={cellContent}/> : null}
            </GridCellContent>
        </GridCellContainer>
    );
};


export default DataCell;