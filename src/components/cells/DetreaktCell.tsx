import React from "react";
import styled from "styled-components";
import {SquareButton} from "../SquareButton";
import {useGameManager} from "../../hooks/useGameManager";

const DetreaktCellContainer = styled.td`
  min-width: 30px;
`

const DetreaktCellContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  gap: 5cqb;
`

const DetreaktCellButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 5%;
  box-sizing: border-box;
`

const DetreaktTitle = styled.span`
  writing-mode: tb-rl;
  transform: rotate(180deg);
  font-size: 10cqb;
`

export const DetreaktCell = () => {
    const {undo, redo, canUndo, canRedo, clear} = useGameManager();

    return (
        <DetreaktCellContainer rowSpan={5}>
            <DetreaktCellContent>
                <DetreaktTitle>Détreakt</DetreaktTitle>
                <DetreaktCellButtons>
                    <SquareButton disabled={!canUndo} onClick={undo}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                        </svg>
                    </SquareButton>
                    <SquareButton disabled={!canRedo} onClick={redo}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"/>
                        </svg>
                    </SquareButton>
                    <SquareButton onClick={clear}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                    </SquareButton>
                </DetreaktCellButtons>
            </DetreaktCellContent>

        </DetreaktCellContainer>
    )
}