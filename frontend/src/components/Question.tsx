import styled from "@emotion/styled";
import React from "react";
import { Question as QuestionType, ShowAnswer } from "../types";
import { Chart } from "./Chart";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    & div {
        margin: 0 0 1rem 0;
    }
`;

export const Question: React.FC<QuestionType & ShowAnswer> = ({ answer, question, setShowAnswer, showAnswer }) => {
    return (
        <Wrapper>
            <div>{question}</div>
            <div>
                <Chart datapoints={answer} />
            </div>
            <div>
                <button onClick={() => setShowAnswer(true)}>Guess</button>
            </div>
        </Wrapper>
    );
};
