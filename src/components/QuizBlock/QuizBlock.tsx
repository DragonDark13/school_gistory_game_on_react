import React, {useContext, useEffect, useState} from "react";
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
import {IQuizBlockProps} from "../../types/types";
import {useAuth} from "../AuthContext/AuthContext";
import {makeStyles} from "tss-react/mui";
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';



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
                                                  questions,
                                                  options,
                                                  correctAnswers,
                                                  onAnswer,
                                                  historyList,
                                                  setAllAnswerIsCorrect,
                                                  testType = "article",
                                                  setSelectedSubArticle
                                              }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(""));
    const [results, setResults] = useState({correct: 0, incorrect: 0});
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [nextLevelAvailable, setNextLevelAvailable] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const [isNextButtonActive, setIsNextButtonActive] = useState(false);
    const {selectedArticle, subtopicId} = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [answerChosen, setAnswerChosen] = useState(false);
    const [currentAnswerStatus, setCurrentAnswerStatus] = useState(false);
    const maxTimeStatic = 10;
    const [remainingTime, setRemainingTime] = useState(maxTimeStatic);


    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);
    let selectedSubArticleNumber = 0;  // Default value in case it's not a subArticle
    let currentArticle;
    let currentArticleTitle;

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


    if (testType === "subArticle") {
        selectedSubArticleNumber = parseInt(subtopicId || '0', 10);
        console.log("selectedSubArticleNumber", selectedSubArticleNumber);
        console.log("selectedSubArticle", historyList[selectedArticleNumber]?.subtopics?.[selectedSubArticleNumber]);
        currentArticle = historyList[selectedArticleNumber]?.subtopics?.[selectedSubArticleNumber]
        currentArticleTitle = currentArticle?.title;


    } else {
        currentArticle = historyList[selectedArticleNumber];
        currentArticleTitle = currentArticle.text;


        useEffect(() => {
            if (!isAuthenticated) {
                navigate("/");

            }
        }, [isAuthenticated])

    }


    useEffect(() => {
        if (results.correct === questions.length) {
            setAllAnswerIsCorrect(true);
            setNextLevelAvailable(true)

            if (testType === "subArticle") {
                setOpenModal(true);
                setTimeout(() => {
                    // Redirect to the main article page after 5 seconds
                    navigate(`/article/${selectedArticleNumber}`);
                }, 5000);
            }

        }
    }, [results.correct, questions.length]);

    const handleAnswer = (answerIndex) => {
        setAnswerChosen(true);
        setSelectedAnswer(answerIndex);

        // Перевірка, чи обрана відповідь вірна
        if (correctAnswers[currentQuestion].includes(answerIndex)) {
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
        setSelectedAnswer("")
        setIsNextButtonActive(false);
        setAnswerChosen(false)
    }
    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers(Array(questions.length).fill(""));
        setResults({correct: 0, incorrect: 0});
        setIsQuizFinished(false);
        clearSettingsBeforeNewQuestion()
    };


    const {currentUser} = useContext(UserContext);

    const handleNextQuestion = () => {
        if (!selectedAnswer) {
            // Якщо не обрано відповідь, не переходьте до наступного питання
            return;
        }


        if (currentQuestion < questions.length - 1) {
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
        let timer;

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
            clearInterval(timer)
        }

        // Cleanup function
        return () => clearInterval(timer);

    }, [answerChosen]); // Runs whenever answerChosen changes; // Runs whenever answerChosen changes; // Runs once when the component mounts

    // Calculate the progress for CircularProgress

    const optionHighlight = (option) => {

        if (option === selectedAnswer) {

            if (option === correctAnswers[currentQuestion]) {
                return classes.sucessOptionSelected;
            } else return classes.errorOptionSelected;

        } else if (option === correctAnswers[currentQuestion]) {
            return classes.sucessOptionSelected;
        } else return "";

    }

    const optionsHighlightWhenTimerIsFinished = (option) => {
        if (option === correctAnswers[currentQuestion]) {
            return classes.sucessOptionSelected;
        } else return "";
    }

    const phrasesSucess = [
        "Well done!",
        "Excellent job!",
        "Congratulations!",
        "Bravo!",
        "Fantastic!"
    ];

    const phrasesError = [
        "Incorrect.",
        "Wrong answer.",
        "Try again.",
        "Not quite.",
        "That's incorrect."
    ]

// Генеруємо випадковий індекс для вибору фрази зі списку

    const answerReactionBlock = () => {
        // Вибираємо випадкову фразу для успішної відповіді
        const successPhrase = phrasesSucess[Math.floor(Math.random() * phrasesSucess.length)];

        // Вибираємо випадкову фразу для невдачної відповіді
        const errorPhrase = phrasesError[Math.floor(Math.random() * phrasesError.length)];

        return (
            <Grid container alignItems={"center"} columnSpacing={1}>
                <Grid item xs={"auto"}>
                    {currentAnswerStatus ? ( // Перевіряємо, чи відповідь правильна
                        <CheckCircleIcon fontSize={"large"} color={"success"}/>
                    ) : (
                        <CancelIcon fontSize={"large"} color={"error"}/>
                    )}
                </Grid>
                <Grid item xs={"auto"}>
                    <Typography className={"random_phrase"} variant={"h5"}>
                        {currentAnswerStatus ? successPhrase : errorPhrase}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    const phrasesTimeUp = [
        "Time's up.",
        "Out of time.",
        "Your time has expired.",
        "Time expired.",
        "Time is over."
    ];


    const timeUpMessageBlock = () => {
        // Вибираємо випадкову фразу для повідомлення про завершення часу
        const timeUpPhrase = phrasesTimeUp[Math.floor(Math.random() * phrasesTimeUp.length)];

        return (
            <Grid container alignItems={"center"} columnSpacing={1}>
                <Grid item xs={"auto"}>
                    <AccessTimeIcon fontSize={"large"} color={"error"}/>
                </Grid>
                <Grid item xs={"auto"}>
                    <Typography className={"random_phrase"} variant={"h5"}>
                        {timeUpPhrase}
                    </Typography>
                </Grid>
            </Grid>
        );
    }

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

                                {testType === "article" && <Card sx={{background: theme.palette.secondary.light}}>
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

                                    </CardContent>
                                    <CardActions>
                                        <Button component={RouterLink} to={`/article/${selectedArticleNumber + 1}`}
                                                fullWidth startIcon={<ArrowForwardIosIcon/>} color={"secondary"}
                                                endIcon={<ArrowForwardIosIcon/>} variant={"contained"}
                                                size={"large"}
                                        >{selectedArticleNumber !== null ? historyList[selectedArticleNumber + 1].date : "Помилка" +
                                            " у машині часу"}</Button>
                                    </CardActions>

                                </Card>}


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
                <div className={"question_container"}>
                    <LinearProgress
                        color={"secondary"}
                        value={Math.round((100 / options.length) * results.correct)}
                        variant={"determinate"}
                    />

                    <h1>Тема: {currentArticleTitle && currentArticleTitle}</h1>
                    <Grid container rowSpacing={{xs: 2, sm: 0}} columnSpacing={{xs: 1, sm: 2, md: 3}}
                          alignItems={"center"}
                          justifyContent={"center"}>
                        <Grid item xs={12} md={6}>
                            <Typography variant={smUp ? "h6" : 'body1'}>{questions[currentQuestion]}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <RadioGroup
                                name="radio-buttons-group"
                            >
                                {options[currentQuestion].map((option, index) => (
                                    <FormControlLabel

                                        key={index + "button"}
                                        className={cx(remainingTime == 0 ? optionsHighlightWhenTimerIsFinished(option) : optionHighlight(option))}
                                        onKeyPress={handleAnswerKeyPress}
                                        onClick={() => {
                                            if (!answerChosen && remainingTime > 0) {
                                                handleAnswer(option);
                                            }
                                        }}
                                        control={<Radio checked={selectedAnswer === option}/>}
                                        label={option}
                                        value={option}
                                        disabled={answerChosen || remainingTime == 0} // Заборона вибору, якщо вже
                                        // обрано
                                        //
                                    />
                                ))}
                            </RadioGroup>
                        </Grid>
                    </Grid>


                    <Grid container justifyContent={smUp ? 'space-between' : "start"} mt={2} alignItems={"center"}>

                        <Grid className={"status_icon_container"} item xs={"auto"} md={"auto"}>
                            {answerChosen ? answerReactionBlock()
                                :
                                (remainingTime > 0 ?
                                        <div className={"timer_progress"}>
                                            {/* Your other JSX components */}
                                            <CircularProgress
                                                variant="determinate"
                                                value={(remainingTime / maxTimeStatic) * 100} // Calculate the progress value
                                                color="secondary" // Change the color of the progress indicator
                                                thickness={5} // Adjust the thickness of the progress indicator
                                                size={60} // Set the size of the progress indicator
                                            />
                                            <Typography color={"secondary"} variant={"h6"}>{remainingTime}</Typography>
                                        </div>
                                        :
                                        timeUpMessageBlock()
                                )

                            }
                        </Grid>

                        <Grid item xs={12} md={"auto"}>
                            <Button
                                color={answerChosen ? (currentAnswerStatus ? "success" : "error") : remainingTime == 0 ? "error" : "primary"}
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
};

export default QuizBlock;
