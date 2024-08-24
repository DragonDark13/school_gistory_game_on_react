// QuestionContainer.tsx
import React from "react";
import {Button, Grid, Radio, RadioGroup, Typography, FormControlLabel, LinearProgress} from "@mui/material";
import TimeUpMessageBlock from "../TimeUpMessageBlock/TimeUpMessageBlock";
import AnswerReactionBlock from "../AnswerReactionBlock/АnswerReactionBlock";
import TimerProgress from "../TimerProgress/TimerProgress";
import {useStyles} from "tss-react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export type IQuestionContainerProps = {
    currentQuestion: number;
    quizOptions: string[][];
    selectedAnswer: number | null;
    handleAnswer: (answerIndex: number) => void;
    handleAnswerKeyPress: (event: React.KeyboardEvent) => void;
    maxTimeStatic: number;
    answerChosen: boolean;
    currentAnswerStatus: boolean;
    isNextButtonActive: boolean;
    handleNextQuestion: () => void;
    smUp: boolean;
    currentArticleTitle: string;
    optionsHighlightWhenTimerIsFinished: (option: number) => string;
    optionHighlight: (option: number) => string;
    percentCompleted: number,
    currentQuestionText: string,
    setTimeIsFinished: (arg0: boolean) => void;
    timeIsFinished: boolean
};

const QuestionContainer: React.FC<IQuestionContainerProps> = ({
                                                                  currentQuestion,
                                                                  quizOptions,
                                                                  selectedAnswer,
                                                                  handleAnswer,
                                                                  handleAnswerKeyPress,
                                                                  maxTimeStatic,
                                                                  answerChosen,
                                                                  currentAnswerStatus,
                                                                  isNextButtonActive,
                                                                  handleNextQuestion,
                                                                  smUp,
                                                                  currentArticleTitle,
                                                                  optionsHighlightWhenTimerIsFinished,
                                                                  optionHighlight,
                                                                  percentCompleted,
                                                                  currentQuestionText,
                                                                  setTimeIsFinished,
                                                                  timeIsFinished
                                                              }) => {


    const {cx} = useStyles();

    console.log("QuestionContainer start")

    return (
        <div className={"question_container"}>
            <LinearProgress color={"primary"}
                            defaultValue={0}
                            value={percentCompleted ? percentCompleted : 0}
                            variant={"determinate"}/>
            <Typography className={"quiz_title"}
                        variant={"h5"}>Тема: {currentArticleTitle && currentArticleTitle}</Typography>
            <Grid container rowSpacing={{xs: 2, sm: 0}} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                  justifyContent={"center"}>
                <Grid item xs={12} sm={6}>
                    <Typography variant={"h6"}>{currentQuestionText}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RadioGroup name="radio-buttons-group" onKeyPress={handleAnswerKeyPress}>
                        {(quizOptions && quizOptions.length > 0) && quizOptions[currentQuestion].map((option, index) => (
                            <FormControlLabel
                                key={index + "button"}
                                className={cx(timeIsFinished ? optionsHighlightWhenTimerIsFinished(index) : answerChosen ? optionHighlight(index) : "")}
                                onKeyPress={handleAnswerKeyPress}
                                onClick={() => {
                                    if (!answerChosen && !timeIsFinished) {
                                        handleAnswer(index);
                                    }
                                }}
                                control={<Radio checked={selectedAnswer === index}/>}
                                label={option}
                                value={option}
                                disabled={answerChosen || timeIsFinished}
                            />
                        ))}
                    </RadioGroup>
                </Grid>
            </Grid>
            <Grid container justifyContent={"space-between"} mt={2} alignItems={"center"}>
                <Grid className={"status_icon_container"} item xs={"auto"}>
                    {answerChosen && <AnswerReactionBlock currentAnswerStatus={currentAnswerStatus}/>}
                    {!answerChosen && (!timeIsFinished ?
                        <TimerProgress
                            maxTimeStatic={maxTimeStatic}
                            answerChosen={answerChosen}
                            setTimeIsFinished={setTimeIsFinished}
                        /> :
                        <TimeUpMessageBlock/>)}
                </Grid>
                <Grid item xs={12} sm={"auto"}>
                    <Button
                        color={answerChosen ? (currentAnswerStatus ? "success" : "error") : timeIsFinished ? "error" : "primary"}
                        onKeyDown={handleNextQuestion}
                        fullWidth={!smUp}
                        className={'next_button'}
                        endIcon={<ArrowForwardIosIcon/>}
                        variant={"contained"}
                        size={"large"}
                        onClick={handleNextQuestion}
                        disabled={!isNextButtonActive}
                    >
                        Продовжити
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
};

export default QuestionContainer;
