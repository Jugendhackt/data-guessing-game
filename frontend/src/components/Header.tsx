import styled from "@emotion/styled";
import React from "react";

const StyledHeader = styled.header`
    display: flex;
    align-items: center;    
    border-bottom: 3px solid #776177;
    align-items: center;
    margin-bottom: 0.5rem;

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
