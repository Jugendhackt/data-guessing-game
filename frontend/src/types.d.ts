import { Dispatch, SetStateAction } from "react";

export type Question = {
    answerType: "value";
    question: string;
    answer: number;
}

export type Questions = Array<Question>;

export type ShowAnswer = {
    showAnswer: boolean;
    setShowAnswer: Dispatch<SetStateAction<boolean>>;
}
