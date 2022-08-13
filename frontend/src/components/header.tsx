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
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
        <h1>Data Guessing Game</h1>
    </StyledHeader>
  );
};
