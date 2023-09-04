import React, {SyntheticEvent, useRef} from 'react';
import {
    arrow,
    autoUpdate,
    flip,
    FloatingArrow,
    FloatingFocusManager,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useId,
    useInteractions,
    useRole
} from "@floating-ui/react";
import styled from "styled-components";
import GameSymbol, {gameSymbols, GameSymbols} from "./GameSymbols";

const PopupContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  background: white;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid lightgray;
`

const SymbolContainer = styled.div`
  display: grid;

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;

  gap: 0.5rem;
;
  height: 100%;
  
  svg:hover {
    color: var(--primary-color);
  }

`

export interface ShapeSelectorProps {
    open: boolean;
    onClose: () => void;
    anchor: HTMLDivElement | null;
    onSelectSymbol: (symbol: GameSymbols) => void;
}

const ShapeSelector = (props: ShapeSelectorProps) => {
    const arrowRef = useRef(null);

    const {refs, floatingStyles, context} = useFloating({
        open: props.open,
        onOpenChange: props.onClose,
        elements: {
            reference: props.anchor
        },
        middleware: [
            offset(10),
            flip({fallbackAxisSideDirection: "end"}),
            shift(),
            arrow({
                element: arrowRef,
            }),
        ],
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const {getFloatingProps} = useInteractions([
        click,
        dismiss,
        role
    ]);

    const headingId = useId();

    const onSelectSymbol = (event: SyntheticEvent, symbol: GameSymbols) => {
        event.stopPropagation();
        event.preventDefault();
        props.onSelectSymbol(symbol);
    }

    return (
        <>
            {props.open && (
                <FloatingFocusManager context={context} modal={false}>
                    <PopupContainer
                        className="Popover"
                        ref={refs.setFloating}
                        style={floatingStyles}
                        aria-labelledby={headingId}
                        {...getFloatingProps()}
                    >
                        <FloatingArrow ref={arrowRef} context={context}/>
                        <SymbolContainer>
                            {gameSymbols.map(symbol => <div key={symbol} onClick={(e) => onSelectSymbol(e, symbol)}>
                                <GameSymbol symbol={symbol}/></div>)}
                        </SymbolContainer>
                    </PopupContainer>
                </FloatingFocusManager>
            )}
        </>
    );
};

export default ShapeSelector;