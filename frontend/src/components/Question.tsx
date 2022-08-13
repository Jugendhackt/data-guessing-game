import styled from "@emotion/styled";
import React from "react";
import { Question as QuestionType, ShowAnswer } from "../types";
import { Chart } from "./Chart";

const Wrapper = styled.div`
    /* display: flex; */
`;

export const Question: React.FC<QuestionType & ShowAnswer> = ({ answer, question, setShowAnswer, showAnswer }) => {
  return (
        <Wrapper>
            <div>{question}</div>
            <Chart datapoints={answer} />
            <div><input type="text" /><button onClick={() => setShowAnswer(true)}>Guess</button></div>
            {showAnswer ? <div>{JSON.stringify(answer)}</div> : null}
        </Wrapper>
  );
};
