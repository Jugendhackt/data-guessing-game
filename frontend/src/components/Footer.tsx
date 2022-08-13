import styled from "@emotion/styled";
import React from "react";

const StyledFooter = styled.footer`
    display: flex;
    position: fixed;
    bottom: 0;
    margin: 20px;
    align-items: center;
    right: 20px;
`;

type Props = {
    onClick: () => void;
}

export const Footer: React.FC<Props> = ({ onClick }) => {
  return (
        <StyledFooter>
            <button onClick={onClick}>Next question</button>
        </StyledFooter>
  );
};
