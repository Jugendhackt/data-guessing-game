import styled from "@emotion/styled";
import React from "react";

const StyledHeader = styled.header`
 color:purple;
 display: flex;
 align-items: center;
 position: fixed;
 top: 0;
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
        <h1>Data Guessing Game</h1>
    </StyledHeader>
  );
};
