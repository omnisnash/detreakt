import {ReactComponent as Circle} from "../assets/circle.svg";
import {ReactComponent as Cross} from "../assets/cross.svg";
import {ReactComponent as Hashtag} from "../assets/hashtag.svg";
import {ReactComponent as Slash} from "../assets/slash.svg";
import {ReactComponent as TriSlash} from "../assets/tri-slash.svg";
import {ReactComponent as Triangle} from "../assets/triangle.svg";
import styled from "styled-components";

export const gameSymbols = ["circle", "cross", "hashtag", "slash", "tri-slash", "triangle"] as const;
export type GameSymbols = typeof gameSymbols[number];

const Container = styled.div`
  min-width: 9cqb;
  min-height: 9cqb;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    aspect-ratio: 1/1;
  }
`

const GameSymbol = (props: { symbol: GameSymbols }) => {
    switch (props.symbol) {
        case "circle":
            return <Container><Circle/></Container>;
        case "cross":
            return <Container><Cross/></Container>;
        case "hashtag":
            return <Container><Hashtag/></Container>;
        case "slash":
            return <Container><Slash/></Container>;
        case "tri-slash":
            return <Container><TriSlash/></Container>;
        case "triangle":
            return <Container><Triangle/></Container>;

    }
};

export default GameSymbol;