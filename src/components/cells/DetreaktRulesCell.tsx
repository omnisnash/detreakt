import React from "react";
import styled from "styled-components";

const DetreaktRulesCellContent = styled.td`
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0 16px;
    align-items: center;
    justify-content: center;
    font-size: 5cqb;
  }
`

export const DetreaktRulesCell = () => {
    return (
        <DetreaktRulesCellContent colSpan={5}>
            <div>
                <span>□□ = 2</span>
                <span>□□□ = 3</span>
                <span>□□□□ = 8</span>
                <span>□□□□□ = 10</span>
                <span>(0 = -5)</span>
            </div>
        </DetreaktRulesCellContent>
    )
}