import styled from "styled-components";

export const SquareButton = styled.button`
  background:transparent;
  width: 100%;

  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius:15px 255px;
  border:solid 2px #41403E;
  aspect-ratio: 1/1;
  
  max-width: 30px;
  
  &:hover:not(:disabled) {
    border-color: var(--primary-color);

    cursor: pointer;
  }
  
  &:disabled {
    opacity: 0.25;
  }
  
`
