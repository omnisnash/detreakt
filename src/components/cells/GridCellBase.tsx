import styled, {css} from "styled-components";
import {CellType} from "../../models/cells";

const BORDER_SIZE_NORMAL = 2;
const BORDER_SIZE_HEAVY = 4;

export const GridCellContainer = styled.td<{
    $type: CellType,
    $diagonal?: boolean,
    $heavyBorder?: boolean,
    $hovered?: boolean,
    $highlight?: boolean
}>`
  aspect-ratio: 1/1;
  font-size: 7cqb;


  ${props => props.$diagonal && css`
    background-image: radial-gradient(circle at 1px 1px, lightgray 1px, transparent 0);
    background-size: 4px 4px;
  `};

  ${props => props.$type === 'GRID' && css`
    border: ${props.$heavyBorder ? BORDER_SIZE_HEAVY : BORDER_SIZE_NORMAL}px solid black;
  `}

  ${props => props.$type === 'BOTTOM-TOTAL' && css`
    border: ${BORDER_SIZE_NORMAL}px solid black;
    border-top: ${BORDER_SIZE_HEAVY}px solid black;
    border-bottom: ${BORDER_SIZE_HEAVY}px solid black;
  `}

  ${props => props.$type === 'RIGHT-TOTAL' && css`
    border: ${BORDER_SIZE_NORMAL}px solid black;
    border-left: ${BORDER_SIZE_HEAVY}px solid black;
    border-right: ${BORDER_SIZE_HEAVY}px solid black;
  `}

  ${props => props.$type === 'GRAND-TOTAL' && css`
    border: ${BORDER_SIZE_HEAVY}px solid black;
  `}

  ${props => props.$type === 'DIAGONAL-TOP' && css`
    border-left: ${BORDER_SIZE_HEAVY}px solid black;
    border-right: ${BORDER_SIZE_HEAVY}px solid black;
    border-top: ${BORDER_SIZE_HEAVY}px solid black;
  `}

  ${props => props.$type === 'DIAGONAL-BOTTOM' && css`
    border-left: ${BORDER_SIZE_HEAVY}px solid black;
    border-bottom: ${BORDER_SIZE_HEAVY}px solid black;
    border-top: ${BORDER_SIZE_HEAVY}px solid black;
  `}

  ${props => props.$hovered && css`
    &:hover {
      background: var(--selectable);
      cursor: pointer;
    }
  `};

  ${props => props.$highlight && css`
    background: var(--playable);
    cursor: pointer;
  `};


`

export const GridCellContent = styled.div`
  aspect-ratio: 1/1;
  min-width: 9cqb;
  min-height: 9cqb;
  display: flex;
  align-items: center;
  justify-content: center;
`