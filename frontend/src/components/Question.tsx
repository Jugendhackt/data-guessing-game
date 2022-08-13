import styled from "@emotion/styled";
import React from "react";
import { Question as QuestionType, ShowAnswer } from "../types";

const Wrapper = styled.div`
    /* display: flex; */
`;

export const Question: React.FC<QuestionType & ShowAnswer> = ({ answer, question, setShowAnswer, showAnswer }) => {
  return (
        <Wrapper>
            <div>{question}</div>
            <div><input type="text" /><button onClick={() => setShowAnswer(true)}>Guess</button></div>
            {showAnswer ? <div>{JSON.stringify(answer)}</div> : null}
        </Wrapper>
  );
};
