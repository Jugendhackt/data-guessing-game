import { Dispatch, SetStateAction } from "react";

export type Answer = Array<{year: number; value: number}>

export type Question = {
    type: "series" | string;
    question: string;
    answer: Answer;
}

export type Questions = Array<Question>;

export type ShowAnswer = {
    showAnswer: boolean;
    setShowAnswer: Dispatch<SetStateAction<boolean>>;
}
