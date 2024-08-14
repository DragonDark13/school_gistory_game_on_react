// QuestionContainer.tsx
import React from "react";
import {Button, Grid, Radio, RadioGroup, Typography, FormControlLabel, LinearProgress} from "@mui/material";
import TimeUpMessageBlock from "../TimeUpMessageBlock/TimeUpMessageBlock";
import AnswerReactionBlock from "../AnswerReactionBlock/АnswerReactionBlock";
import TimerProgress from "../TimerProgress/TimerProgress";
import {useStyles} from "tss-react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


type QuestionContainerProps = {
    currentQuestion: number;
    quizOptions: string[][];
    selectedAnswer: number | null;
    handleAnswer: (answerIndex: number) => void;
    handleAnswerKeyPress: (event: React.KeyboardEvent) => void;
    remainingTime: number;
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
};

const QuestionContainer: React.FC<{ props: QuestionContainerProps }> = ({props}) => {
    const {
        currentQuestion,
        quizOptions,
        selectedAnswer,
        handleAnswer,
        handleAnswerKeyPress,
        remainingTime,
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
        currentQuestionText
    } = props;

    const {cx} = useStyles();


    return (
        <div className={"question_container"}>
            <LinearProgress color={"primary"}
                            defaultValue={0}
                            value={percentCompleted ? percentCompleted : 0}
                            variant={"determinate"}/>
            <Typography variant={"h5"}>Тема: {currentArticleTitle && currentArticleTitle}</Typography>
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
                                className={cx(remainingTime === 0 ? optionsHighlightWhenTimerIsFinished(index + 1) : optionHighlight(index + 1))}
                                onKeyPress={handleAnswerKeyPress}
                                onClick={() => {
                                    if (!answerChosen && remainingTime > 0) {
                                        handleAnswer(index + 1);
                                    }
                                }}
                                control={<Radio checked={selectedAnswer === index + 1}/>}
                                label={option}
                                value={option}
                                disabled={answerChosen || remainingTime === 0}
                            />
                        ))}
                    </RadioGroup>
                </Grid>
            </Grid>
            <Grid container justifyContent={"space-between"} mt={2} alignItems={"center"}>
                <Grid className={"status_icon_container"} item xs={"auto"}>
                    {answerChosen && <AnswerReactionBlock currentAnswerStatus={currentAnswerStatus}/>}
                    {!answerChosen && (remainingTime > 0 ?
                        <TimerProgress maxTimeStatic={maxTimeStatic} remainingTime={remainingTime}/> :
                        <TimeUpMessageBlock/>)}
                </Grid>
                <Grid item xs={12} sm={"auto"}>
                    <Button
                        color={answerChosen ? (currentAnswerStatus ? "success" : "error") : remainingTime === 0 ? "error" : "primary"}
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
