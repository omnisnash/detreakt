import React from 'react';
import {CellType} from "../../models/cells";
import {GridCellContainer, GridCellContent} from "./GridCellBase";
import {GridData, GridState} from "../../states/atoms";
import {computeScore, getColumn, getDiagonal, getRow} from "../../utils";
import {useRecoilValue} from "recoil";

interface SumCellPropsBase {
    type: Exclude<CellType, 'GRID' | 'GRAND-TOTAL'>
}

interface SumCellBottom extends SumCellPropsBase {
    type: "BOTTOM-TOTAL";
    x: number;
}

interface SumCellRight extends SumCellPropsBase {
    type: "RIGHT-TOTAL";
    y: number;
}

interface SumCellDiagonal extends SumCellPropsBase {
    type: "DIAGONAL-BOTTOM" | "DIAGONAL-TOP";
}

export type SumCellProps = SumCellBottom | SumCellRight | SumCellDiagonal

const SumCell = (props: SumCellProps) => {
    const grid = useRecoilValue(GridState);
    const isDiagonal = ["DIAGONAL-BOTTOM", "DIAGONAL-TOP"].includes(props.type);

    let values: GridData[];
    switch (props.type) {
        case "DIAGONAL-BOTTOM":
        case "DIAGONAL-TOP":
            values = getDiagonal(grid)
            break;
        case "BOTTOM-TOTAL":
            values = getColumn(props.x, grid)
            break;
        case "RIGHT-TOTAL":
            values = getRow(props.y, grid)
            break;
    }

    return (
        <GridCellContainer $type={props.type} $diagonal={isDiagonal}>
            <GridCellContent>
                {computeScore(values)}
            </GridCellContent>
        </GridCellContainer>
    );
};

export default SumCell;