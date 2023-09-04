import React from 'react';
import styled from "styled-components";
import {DetreaktCell} from "./cells/DetreaktCell";
import {DetreaktRulesCell} from "./cells/DetreaktRulesCell";
import SumCell from "./cells/SumCell";
import DataCell from "./cells/DataCell";
import GrandTotalCell from "./cells/GrandTotalCell";

const TableContainer = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  font-family: 'TrashHand', serif;
  font-weight: normal;
  font-style: normal;
`;

const Grid = () => {
    const rows: React.ReactElement[] = [];
    for (let i = 0; i < 7; i++) {
        const cells: React.ReactElement[] = [];
        if (i === 0) {
            cells.push(<td key={"empty-top"}></td>);
            cells.push(<DetreaktRulesCell key={"rules"}/>);
            cells.push(<SumCell key={"diagonal-top"} type={"DIAGONAL-TOP"}/>);
        } else if (i === 1) {
            cells.push(<DetreaktCell key={"logo-and-buttons"}/>);
            cells.push(...[...Array(5).keys()].map(index => <DataCell key={`${index}-${i - 1}`} x={index} y={i - 1}/>));
            cells.push(<SumCell key={`right-sum-${i - 1}`} type={"RIGHT-TOTAL"} y={i - 1}/>);
        } else if (i === 6) {
            cells.push(<SumCell key={"diagonal-bottom"} type={"DIAGONAL-BOTTOM"}/>);
            cells.push(...[...Array(5).keys()].map(index => <SumCell key={`bottom-sum-${index}`} type={"BOTTOM-TOTAL"} x={index}/>));
            cells.push(<GrandTotalCell key={"grand-total"}/>);

        } else {
            cells.push(...[...Array(5).keys()].map(index => <DataCell key={`${index}-${i - 1}`} x={index} y={i - 1}/>));
            cells.push(<SumCell key={`right-sum-${i - 1}`} type={"RIGHT-TOTAL"} y={i - 1}/>);
        }

        rows.push(<tr key={`row-${i}`}>{cells}</tr>)
    }


    return (
        <TableContainer>
            <tbody>
            {rows}
            </tbody>
        </TableContainer>
    );
};

export default Grid;