import React from 'react';
import {GridCellContainer, GridCellContent} from "./GridCellBase";
import {GRID_SIZE} from "../../constants";
import {computeScore, getColumn, getDiagonal, getRow} from "../../utils";
import {useRecoilValue} from "recoil";
import {GridState} from "../../states/atoms";

const GrandTotalCell = () => {
    const grid = useRecoilValue(GridState);

    let total = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
        total += computeScore(getRow(i, grid));
        total += computeScore(getColumn(i, grid));
    }
    total += computeScore(getDiagonal(grid)) * 2;

    return (
        <GridCellContainer $type={"GRAND-TOTAL"}>
            <GridCellContent>
                <b>{total}</b>
            </GridCellContent>
        </GridCellContainer>
    );
};

export default GrandTotalCell;