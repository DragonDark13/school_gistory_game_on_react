import React, {useContext, useEffect, useState} from "react";
import {HistoricalEvent} from "../HistoryTimeline/HistoryTimeline";
import { UserContext} from "../../App";
import {
    Button,
    Card, CardActions,
    CardContent, CardHeader,
    FormControlLabel,
    Grid,
    LinearProgress,
    Radio,
    RadioGroup,
    Typography,
    useTheme
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import StarIcon from '@mui/icons-material/Star';

import "./quiz_style.scss"


interface QuizBlockProps {
    questions: string[];
    options: string[][];
    correctAnswers: string[];
    onAnswer: (results: { correct: number; incorrect: number }) => void;
    closeTestPage: () => void;
    allAnswerIsCorrectFunc: () => void;
    handleNextLevel: () => void;
    events: HistoricalEvent[];
    selectedArticle: number | null;
    setAllAnswerIsCorrect: (arg0: boolean) => void
    backToArticleFromTest: () => void
}


const QuizBlock: React.FC<QuizBlockProps> = ({
                                                 questions,
                                                 options,
                                                 correctAnswers,
                                                 onAnswer,
                                                 closeTestPage,
                                                 allAnswerIsCorrectFunc,
                                                 handleNextLevel,
                                                 selectedArticle,
                                                 events,
                                                 setAllAnswerIsCorrect,
                                                 backToArticleFromTest
                                             }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(""));
    const [results, setResults] = useState({correct: 0, incorrect: 0});
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [nextLevelAvailable, setNextLevelAvailable] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [isNextButtonActive, setIsNextButtonActive] = useState(false);


    useEffect(() => {
        if (results.correct === questions.length) {
            setAllAnswerIsCorrect(true);
            setNextLevelAvailable(true)
        }
    }, [results.correct, questions.length]);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setIsNextButtonActive(true);
    };


    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers(Array(questions.length).fill(""));
        setResults({correct: 0, incorrect: 0});
        setIsQuizFinished(false);
        setSelectedAnswer("")
        setIsNextButtonActive(false);
    };

    const {currentUser} = useContext(UserContext);

    const handleNextQuestion = () => {
        if (!selectedAnswer) {
            // Якщо не обрано відповідь, не переходьте до наступного питання
            return;
        }

        if (selectedAnswer === correctAnswers[currentQuestion]) {
            setResults({...results, correct: results.correct + 1});
        } else {
            setResults({...results, incorrect: results.incorrect + 1});
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(""); // Очистіть вибір для нового питання
            setIsNextButtonActive(false); // Зробіть кнопку "Далі" неактивною
        } else {
            onAnswer(results);
            setIsQuizFinished(true);
        }
    };

    const handleAnswerKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && isNextButtonActive) {
            handleNextQuestion();
        }
    };

    const resultIcon = (result: boolean) => {

        if (result) {
            return <CheckCircleIcon color={"success"}/>
        } else return <DoNotDisturbOnIcon color={"error"}/>

    }
    const theme = useTheme();


    return (
        <React.Fragment>
            <Grid className={"back_button_container"} container justifyContent={"space-between"}>
                <Grid item>
                    <Button startIcon={<ArrowBackIosIcon/>} onClick={backToArticleFromTest}>
                        До бібліотеки
                    </Button>
                </Grid>
                <Grid item>
                    <Button endIcon={<ArrowUpwardIcon/>} color={"secondary"} onClick={closeTestPage}>
                        На головну
                    </Button>
                </Grid>
            </Grid>


            {isQuizFinished ? (
                <div>


                    <Typography className={"title"} variant={"h4"}>Ваші Результати:</Typography>

                    <Card className={"result_test_card"}>
                        <CardHeader title={` ${options.length}/${results.correct}`}
                                    subheader={resultIcon(nextLevelAvailable)}
                        />
                        <CardContent>
                            <LinearProgress
                                color={"success"}
                                value={Math.round((100 / options.length) * results.correct)}
                                variant={"determinate"}
                            />
                        </CardContent>

                    </Card>


                    {/*<p>Правильних відповідей: {results.correct}</p>*/}
                    {/*<p>Неправильних відповідей: {results.incorrect}</p>*/}


                    {nextLevelAvailable ? (
                            <div>

                                <Grid className={"icon_container"} container justifyContent={"center"}>
                                    <Grid item>
                                        <StarIcon fontSize={"large"} color={"success"}
                                                  className={"pulse"}/>
                                    </Grid>
                                </Grid>

                                <Card sx={{background: theme.palette.secondary.light}}>
                                    <CardContent>
                                        <Typography sx={{color: theme.palette.text.secondary}}>Вітаю, <Typography
                                            component={"span"}
                                            variant={"subtitle1"}>{currentUser ? currentUser.name : "Невідомий"}</Typography>,
                                            ви
                                            досягли наступного
                                            рівня. Тепер
                                            ви можити відправитися у наступний
                                            пункт нашої
                                            подорожі у часі.</Typography>

                                        {/*<Grid className={"go_to_next_level_container"} container*/}
                                        {/*      justifyContent={"space-between"} alignItems={"center"}>*/}
                                        {/*    <Grid xs={12}>*/}

                                        {/*    </Grid>*/}
                                        {/*    */}
                                        {/*    /!*<Grid>*!/*/}
                                        {/*    /!*    <Typography variant={"subtitle1"}*!/*/}
                                        {/*    /!*                color={"secondary"}></Typography>*!/*/}
                                        {/*    /!*</Grid>*!/*/}
                                        {/*</Grid>*/}
                                    </CardContent>
                                    <CardActions>
                                        <Button fullWidth startIcon={<ArrowForwardIosIcon/>} color={"secondary"}
                                                endIcon={<ArrowForwardIosIcon/>} variant={"contained"}
                                                size={"large"}
                                                onClick={handleNextLevel}>{selectedArticle !== null ? events[selectedArticle + 1].date : "Помилка" +
                                            " у машині часу"}</Button>
                                    </CardActions>

                                </Card>


                            </div>

                        ) :

                        <React.Fragment>
                            <Typography className={"textMessage"}>
                                Не сумуйте. Підготуйтесь та спробуйте знову
                            </Typography>

                            <Button fullWidth endIcon={<ReplayIcon/>}
                                    variant={"contained"}
                                    onClick={handleRetakeQuiz}>Пройти ще раз</Button></React.Fragment>

                    }


                </div>
            ) : (
                <React.Fragment>


                    <h1>Тема: {currentQuestion + 1}</h1>
                    <p>{questions[currentQuestion]}</p>
                    <RadioGroup

                        name="radio-buttons-group"
                    >
                        {options[currentQuestion].map((option, index) => (
                            <FormControlLabel
                                key={index + "button"}
                                className={theme + " answer-quiz-button"}
                                onKeyPress={handleAnswerKeyPress}
                                onClick={() => handleAnswer(option)}
                                control={<Radio checked={selectedAnswer === option}/>}
                                label={option}
                                value={option}
                            />
                        ))}
                    </RadioGroup>

                    <Grid container justifyContent="center" mt={2}>
                        <Button
                            endIcon={<ArrowForwardIosIcon/>}
                            variant={"contained"}
                            size={"large"}
                            onClick={handleNextQuestion}
                            disabled={!isNextButtonActive}
                        >
                            Продовжити
                        </Button>
                    </Grid>

                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default QuizBlock;
