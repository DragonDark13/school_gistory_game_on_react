import React, {EventHandler, useContext, useEffect, useState} from "react";
import {
    Button,
    Card, CardActions,
    CardContent, CardHeader, CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    LinearProgress,
    Radio,
    RadioGroup,
    Typography, useMediaQuery,
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
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {UserContext} from "../MyProviders/MyProviders";
import QuizSuccessModal from "../../QuizSuccessModal/QuizSuccessModal";
import {HistoricalEvent, IQuizBlockProps, SubtopicsProps} from "../../types/types";
import {useAuth} from "../AuthContext/AuthContext";
import {makeStyles} from "tss-react/mui";
import AnswerReactionBlock from "./components/AnswerReactionBlock/АnswerReactionBlock";
import TimeUpMessageBlock from "./components/TimeUpMessageBlock/TimeUpMessageBlock";
import TimerProgress from "./components/TimerProgress/TimerProgress";
import axiosClient from "../../axios";


const useStyles = makeStyles()((theme) => ({


    sucessOptionSelected: {

        '&.MuiFormControlLabel-root.Mui-disabled': {
            borderColor: theme.palette.success.main,
            color: theme.palette.success.main,

            '& .MuiRadio-root.Mui-disabled': {
                color: theme.palette.success.main,
            },

            '& .MuiFormControlLabel-label.Mui-disabled': {
                color: theme.palette.success.main,
            }
        }


    },

    errorOptionSelected: {
        '&.MuiFormControlLabel-root.Mui-disabled': {
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,

            '& .MuiRadio-root.Mui-disabled': {
                color: theme.palette.error.main,
            },

            '& .MuiFormControlLabel-label.Mui-disabled': {
                color: theme.palette.error.main,
            }
        }

    },


}))


const QuizBlock: React.FC<IQuizBlockProps> = ({
                                                  // questions,
                                                  // options,
                                                  // correctAnswers,
                                                  onAnswer,
                                                  historyList,
                                                  setAllAnswerIsCorrect,
                                                  testType = "article",
                                                  setSelectedSubArticle,
                                                  setCurrentUser,
                                                  currentUser
                                              }) => {


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [results, setResults] = useState({correct: 0, incorrect: 0});
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [nextLevelAvailable, setNextLevelAvailable] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isNextButtonActive, setIsNextButtonActive] = useState(false);
    const {selectedArticle, subtopicId} = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [answerChosen, setAnswerChosen] = useState(false);
    const [currentAnswerStatus, setCurrentAnswerStatus] = useState(false);
    const maxTimeStatic = 10;
    const [remainingTime, setRemainingTime] = useState(maxTimeStatic);
    const [currentTestId, setCurrentTestId] = useState<number | null | undefined>(null)
    const [currentArticleTitle, setCurrentArticleTitle] = useState<string>("")
    const [currentArticle, setCurrentArticle] = useState<SubtopicsProps | HistoricalEvent | null>(null);

    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [quizOptions, setQuizOptions] = useState<string[][]>([]);
    const [quizCorrectAnswers, setQuizCorrectAnswers] = useState<number[]>([]);


    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);
    let selectedSubArticleNumber = 0;  // Default value in case it's not a subArticle

    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    const {cx, classes} = useStyles();
    const themeDefault = useTheme();

    const smUp = useMediaQuery(themeDefault.breakpoints.up('sm'));


    useEffect(() => {
        if (setSelectedSubArticle) {
            setSelectedSubArticle(selectedSubArticleNumber);
        }
    }, [setSelectedSubArticle, selectedSubArticleNumber]);

    useEffect(() => {
        if (historyList.length > 0) {

            if (testType === "subArticle") {
                selectedSubArticleNumber = parseInt(subtopicId || '0', 10);
                const selectedArticle = historyList[selectedArticleNumber];
                if (selectedArticle && selectedArticle.subtopics) {
                    const selectedSubtopic = selectedArticle.subtopics[selectedSubArticleNumber];
                    if (selectedSubtopic) {
                        setCurrentArticle(selectedSubtopic);

                    }
                }


            } else {
                setCurrentArticle(historyList[selectedArticleNumber])

            }

        }
    }, [historyList, subtopicId]);

    useEffect(() => {
            if (currentArticle) {
                if (testType === "subArticle") {
                    if ("title" in currentArticle) {
                        setCurrentArticleTitle(currentArticle.title)
                    }
                    if ("sub_article_test_id" in currentArticle) {
                        setCurrentTestId(currentArticle?.sub_article_test_id)
                    }

                    if ("sub_article_test_questions" in currentArticle) {
                        const questionsArray = currentArticle.sub_article_test_questions.map(item => item.question);

                        // Оновлюємо стейт
                        setQuizQuestions(questionsArray);

                        const optionArray = currentArticle.sub_article_test_questions.map(item => item.options);

                        setQuizOptions(optionArray);

                        const correctAnswersArray = currentArticle.sub_article_test_questions.map(item => item.correct_answers as Number[]);


                        setQuizCorrectAnswers(correctAnswersArray);


                    }

                } else {
                    if ("text" in currentArticle) {
                        setCurrentArticleTitle(currentArticle.text)
                    }
                    if ("main_article_test_id" in currentArticle) {
                        setCurrentTestId(currentArticle.main_article_test_id)
                    }
                    if ("main_article_test_questions" in currentArticle) {
                        const questionsArray = currentArticle.main_article_test_questions.map(item => item.question);

                        // Оновлюємо стейт
                        setQuizQuestions(questionsArray);

                        const optionArray = currentArticle.main_article_test_questions.map(item => item.options);

                        setQuizOptions(optionArray);

                        const correctAnswersArray = currentArticle.main_article_test_questions.map(item => item.correct_answers as Number[]);


                        setQuizCorrectAnswers(correctAnswersArray);
                    }
                }
            }


        }, [currentArticle]
    )

    if (testType === "subArticle") {


    } else {


        useEffect(() => {
            if (!isAuthenticated) {
                navigate("/");

            }
        }, [isAuthenticated])

    }

// Успішне завершення тесту
    useEffect(() => {
        if (results.correct === quizQuestions.length && (quizQuestions.length > 0 && results.correct > 0)) {
            setAllAnswerIsCorrect(true);
            setNextLevelAvailable(true)

            if (testType === "subArticle") {
                setOpenModal(true);
                setTimeout(() => {
                    // Redirect to the main article page after 5 seconds
                    navigate(`/article/${selectedArticleNumber}`);
                }, 5000);
            }


            // Відправлення даних про завершення тесту на сервер
            axiosClient.post('/complete-test', {
                test_id: currentTestId,
                completed: true
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // Припускаємо, що токен зберігається в localStorage
                }
            })
                .then(response => {
                    // console.log('Test completion recorded:', response.data);
                    // Обробка даних користувача після успішного запиту
                    // const userData = response.data;
                    setCurrentUser(response.data.user_data);

                    // Додайте код для обробки userData, наприклад, оновлення стану
                })
                .catch(error => {
                    console.error('Error recording test completion:', error);
                });
        }
    }, [results.correct, quizQuestions.length]);

    const handleAnswer = (answerIndex: number) => {
        setAnswerChosen(true);
        setSelectedAnswer(answerIndex);
        // Перевірка, чи обрана відповідь вірна
        if (quizCorrectAnswers[currentQuestion] === answerIndex) {
            setResults({...results, correct: results.correct + 1});
            setCurrentAnswerStatus(true);
        } else {
            setResults({...results, incorrect: results.incorrect + 1});
            setCurrentAnswerStatus(false);
        }

        setIsNextButtonActive(true);
    };

    useEffect(() => {

        if (remainingTime === 0 && !answerChosen) {
            setResults({...results, incorrect: results.incorrect + 1});
            setCurrentAnswerStatus(false);
            setIsNextButtonActive(true);
        }

    }, [answerChosen, remainingTime])

    const clearSettingsBeforeNewQuestion = () => {
        setSelectedAnswer(null);
        setIsNextButtonActive(false);
        setAnswerChosen(false)
        setRemainingTime(maxTimeStatic);
    }
    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        // setUserAnswers(Array(quizQuestions.length).fill(""));
        setResults({correct: 0, incorrect: 0});
        setIsQuizFinished(false);
        clearSettingsBeforeNewQuestion();
    };


    const handleNextQuestion = () => {
        if (!selectedAnswer && remainingTime > 0) {
            return;
        }

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            clearSettingsBeforeNewQuestion();
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


    const handleClose = () => {
        setOpenModal(false);
        navigate(`/article/${selectedArticleNumber}`);
    };


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        // Timer effect
        const startTimer = () => {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timer); // Clear the timer when it reaches 0
                        return 0;
                    } else {
                        return prevTime - 1; // Decrement the remaining time
                    }
                });
            }, 1000);
        };

        if (!answerChosen) {
            // Run the timer only if answerChosen is false
            startTimer();
        } else {
            clearInterval(timer);
        }

        // Cleanup function
        return () => {
            if (timer) clearInterval(timer);
        };

    }, [answerChosen]); // Runs whenever answerChosen changes; // Runs whenever answerChosen changes; // Runs once when the component mounts

// Calculate the progress for CircularProgress

    const optionHighlight = (option: number) => {

        if (option === selectedAnswer) {

            if (option === quizCorrectAnswers[currentQuestion]) {
                return classes.sucessOptionSelected;
            } else return classes.errorOptionSelected;

        } else if (option === quizCorrectAnswers[currentQuestion]) {
            return classes.sucessOptionSelected;
        } else return "";

    }

    const optionsHighlightWhenTimerIsFinished = (option: number) => {
        if (option === quizCorrectAnswers[currentQuestion]) {
            return classes.sucessOptionSelected;
        } else return "";
    }

    useEffect(() => {

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleNextQuestion();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [handleNextQuestion]);


    return (
        <Container>
            <Helmet>
                <title> {`Тестування ${selectedArticleNumber}`}</title>
            </Helmet>
            <Grid sx={{display: "none"}} className={"back_button_container"} container justifyContent={"space-between"}>
                <Grid item>
                    <Button component={RouterLink} to={`/article/${selectedArticleNumber}`}
                            startIcon={<ArrowBackIosIcon/>}>
                        До бібліотеки
                    </Button>
                </Grid>
                <Grid item>
                    <Button component={RouterLink} to={"/timeline"} endIcon={<ArrowUpwardIcon/>} color={"secondary"}>
                        До Часопростору
                    </Button>
                </Grid>
            </Grid>


            {isQuizFinished ? (
                <div className={"finished_container"}>

                    <Typography className={"title"} variant={"h4"}>Ваші Результати:</Typography>

                    <Grid container justifyContent={"center"}>
                        <Grid item xs={12} sm={8} md={5}><Card className={"result_test_card"}>
                            <CardHeader title={` ${quizOptions.length}/${results.correct}`}
                                        subheader={resultIcon(nextLevelAvailable)}
                            />
                            <CardContent>
                                <LinearProgress
                                    color={"success"}
                                    value={Math.round((100 / quizQuestions.length) * results.correct)}
                                    variant={"determinate"}
                                />
                            </CardContent>

                        </Card>
                        </Grid>
                    </Grid>


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

                                {testType === "article" &&
                                <Grid container justifyContent={"center"}>
                                    <Grid item xs={12} md={6}>

                                        <Card sx={{background: theme.palette.secondary.light}}>
                                            <CardContent>
                                                <Typography sx={{color: theme.palette.text.secondary}}>Вітаю, <Typography
                                                    component={"span"}
                                                    variant={"subtitle1"}>{currentUser ? currentUser.user_name : "Невідомий"}</Typography>,
                                                    ви
                                                    досягли наступного
                                                    рівня. Тепер
                                                    ви можити відправитися у наступний
                                                    пункт нашої
                                                    подорожі у часі.
                                                </Typography>

                                            </CardContent>
                                            <CardActions>
                                                <Button component={RouterLink} to={`/article/${selectedArticleNumber + 1}`}
                                                        fullWidth startIcon={<ArrowForwardIosIcon/>} color={"secondary"}
                                                        endIcon={<ArrowForwardIosIcon/>} variant={"contained"}
                                                        size={"large"}
                                                >{selectedArticleNumber !== null ? historyList[selectedArticleNumber + 1].date : "Помилка" +
                                                    " у машині часу"}</Button>
                                            </CardActions>

                                        </Card>
                                    </Grid>
                                </Grid>


                                }


                            </div>

                        ) :

                        <React.Fragment>

                            <Typography className={"textMessage"}>
                                Не сумуйте. Підготуйтесь та спробуйте знову
                            </Typography>

                            <Grid flexDirection={smUp ? "row-reverse" : "row"} spacing={2} container
                                  justifyContent={"space-between"}>
                                <Grid item xs={12} sm={"auto"}>
                                    <Button size={"large"} fullWidth endIcon={<ReplayIcon/>}
                                            variant={"contained"}
                                            onClick={handleRetakeQuiz}>Пройти ще раз</Button>
                                </Grid>
                                <Grid item xs={12} sm={"auto"}>
                                    <Button variant={"outlined"} color={"secondary"} size={"large"} fullWidth
                                            component={RouterLink}
                                            to={`/article/${selectedArticleNumber}`}
                                            startIcon={<ArrowBackIosIcon/>}>
                                        До бібліотеки
                                    </Button>
                                </Grid>

                            </Grid>


                        </React.Fragment>

                    }


                </div>
            ) : (
                <div className={"question_container"}>
                    <LinearProgress
                        color={"secondary"}
                        value={Math.round((100 / quizOptions.length) * results.correct)}
                        variant={"determinate"}
                    />

                    <h1>Тема: {currentArticleTitle && currentArticleTitle}</h1>
                    <Grid container rowSpacing={{xs: 2, sm: 0}} columnSpacing={{xs: 1, sm: 2, md: 3}}
                          alignItems={"center"}
                          justifyContent={"center"}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant={smUp ? "h6" : 'body1'}>
                                {quizQuestions[currentQuestion]}
                            </Typography> </Grid>
                        <Grid item xs={12} sm={6}>
                            <RadioGroup
                                name="radio-buttons-group"
                                onKeyPress={handleAnswerKeyPress}
                            >
                                {(quizOptions && quizOptions.length > 0) && quizOptions[currentQuestion].map((option, index) => (
                                    <FormControlLabel
                                        key={index + "button"}
                                        className={cx(remainingTime == 0 ? optionsHighlightWhenTimerIsFinished(index + 1) : optionHighlight(index + 1))}
                                        onKeyPress={handleAnswerKeyPress}
                                        onClick={() => {
                                            if (!answerChosen && remainingTime > 0) {
                                                handleAnswer(index + 1);
                                            }
                                        }}
                                        control={<Radio checked={selectedAnswer === index + 1}/>}
                                        label={option}
                                        value={option}
                                        disabled={answerChosen || remainingTime == 0}
                                    />
                                ))}
                            </RadioGroup> </Grid>
                    </Grid>


                    <Grid container justifyContent={smUp ? 'space-between' : "start"} mt={2} alignItems={"center"}>

                        <Grid className={"status_icon_container"} item xs={"auto"} md={"auto"}>
                            {answerChosen && <AnswerReactionBlock currentAnswerStatus={currentAnswerStatus}/>}

                            {!answerChosen &&
                            (remainingTime > 0 ?
                                    <TimerProgress maxTimeStatic={maxTimeStatic} remainingTime={remainingTime}/> :

                                    <TimeUpMessageBlock/>
                            )

                            }
                        </Grid>

                        <Grid item xs={12} sm={"auto"}>
                            <Button

                                color={answerChosen ? (currentAnswerStatus ? "success" : "error") : remainingTime == 0 ? "error" : "primary"}
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
            )}

            <QuizSuccessModal openModal={openModal} handleClose={handleClose}/>
        </Container>
    );
}


export default QuizBlock;
