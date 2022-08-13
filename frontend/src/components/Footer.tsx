import styled from "@emotion/styled";
import React from "react";

const StyledFooter = styled.footer`
    display: flex;
    position: fixed;
    bottom: 0;
    align-items: center;
    right: 0;
    left: 0;
    border-top: 3px solid #776177;
    align-items: flex-end;
    z-index: 1000;
    background-color: #ae21ae;
    flex-direction: column;

    & button {
        margin: 1rem;
        flex: 1;
    }
    & div {
        flex: 1;
        margin: 1rem;
        font-size: 12px;
        & a {
            color: rgba(255, 255, 255, 0.87);
        }
    }
`;

type Props = {
    onClick: () => void;
}

export const Footer: React.FC<Props> = ({ onClick }) => {
    return (
        <StyledFooter>
            <button onClick={onClick}>Next question</button>
            <div>With data from <a href="https://ourworldindata.org" target="_blank" rel="noreferrer">ourworldindata.org</a></div>
        </StyledFooter>
    );
};
