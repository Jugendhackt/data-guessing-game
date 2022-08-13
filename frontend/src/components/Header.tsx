import styled from "@emotion/styled";
import React from "react";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 2rem;
    border-bottom: 3px solid #776177;
    align-items: center;
    z-index: 1000;
    background-color: #ae21ae;

    & h1 {
        font-size: 30px;
        text-align: center;
        flex: 1;
    }
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
        <h1>Chart Guessr</h1>
    </StyledHeader>
  );
};
