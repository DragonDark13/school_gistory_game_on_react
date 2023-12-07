import React, {useContext, useEffect, useState} from "react";
import {HistoricalEvent, SubtopicsProps} from "../HistoryTimeline/HistoryTimeline";
import {
    Button,
    Card, CardActions,
    CardContent, CardHeader,
    Container,
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
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {UserContext} from "../MyProviders/MyProviders";
import QuizSuccessModal from "../../QuizSuccessModal/QuizSuccessModal";


interface QuizBlockProps {
    testType: 'article' | 'subArticle';
    questions: string[];
    options: string[][];
    correctAnswers: string[];
    onAnswer: (results: { correct: number; incorrect: number }) => void;
    handleNextLevel: () => void;
    historyList: HistoricalEvent[];
    setAllAnswerIsCorrect: (arg0: boolean) => void
    setSelectedSubArticle?: (arg0: number) => void;
}


const QuizBlock: React.FC<QuizBlockProps> = ({
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


    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);
    let selectedSubArticleNumber = 0;  // Default value in case it's not a subArticle
    let currentArticle;
    let currentArticleTitle;

    const navigate = useNavigate();


    useEffect(() => {
        if (setSelectedSubArticle && selectedSubArticleNumber !== undefined) {
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


    const handleClose = () => {
        setOpenModal(false);
        navigate(`/article/${selectedArticleNumber}`);
    };


    return (
        <Container>
            <Helmet>
                <title> {`Тестування ${selectedArticleNumber}`}</title>
            </Helmet>
            <Grid className={"back_button_container"} container justifyContent={"space-between"}>
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
                <React.Fragment>


                    <h1>Тема: {currentArticleTitle && currentArticleTitle}</h1>
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

            <QuizSuccessModal openModal={openModal} handleClose={handleClose}/>
        </Container>
    );
};

export default QuizBlock;
