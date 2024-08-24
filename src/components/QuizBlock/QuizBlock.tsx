import React, {useEffect, useState} from "react";
import {
    Button,
    Container,
    Grid,
    useMediaQuery,
    useTheme
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import "./quiz_style.scss"
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import QuizSuccessModal from "../../QuizSuccessModal/QuizSuccessModal";
import {HistoricalEvent, IDataForQuiz, IQuizBlockProps, SubtopicsProps} from "../../types/types";
import {makeStyles} from "tss-react/mui";
import axiosClient from "../../axios";
import QuizResults from "./components/QuizResults/QuizResults";
import QuestionContainer, {IQuestionContainerProps} from "./components/QuestionContainer/QuestionContainer";


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


const QuizHeader: React.FC<{ selectedArticleNumber: number }> = ({selectedArticleNumber}) => (
    <Grid className={"back_button_container"} container justifyContent={"space-between"}>
        <Grid item>
            <Button component={RouterLink} to={`/article/${selectedArticleNumber}`} startIcon={<ArrowBackIosIcon/>}>
                До бібліотеки
            </Button>
        </Grid>
        <Grid item>
            <Button component={RouterLink} to={"/timeline"} endIcon={<ArrowUpwardIcon/>} color={"secondary"}>
                До Часопростору
            </Button>
        </Grid>
    </Grid>
);


const QuizBlock: React.FC<IQuizBlockProps> = ({
                                                  historyList,
                                                  setAllAnswerIsCorrect,
                                                  testType = "article",
                                                  setSelectedSubArticle,
                                                  setCurrentUser,
                                                  currentUser
                                              }) => {
    console.log("Current Props:",
        historyList,
        currentUser);

    console.log("QuizBlock.tsx start")

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState({correct: 0, incorrect: 0});
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [nextLevelAvailable, setNextLevelAvailable] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isNextButtonActive, setIsNextButtonActive] = useState(false);
    const {selectedArticle, subtopicId} = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [answerChosen, setAnswerChosen] = useState(false);
    const [currentAnswerStatus, setCurrentAnswerStatus] = useState(false);
    const maxTimeStatic = 30;
    const [timeIsFinished, setTimeIsFinished] = useState<boolean>(false)
    const [currentTestId, setCurrentTestId] = useState<number | null | undefined>(null)
    const [currentArticleTitle, setCurrentArticleTitle] = useState<string>("")
    const [currentArticle, setCurrentArticle] = useState<SubtopicsProps | HistoricalEvent | null>(null);

    const [quizQuestions, setQuizQuestions] = useState<string[]>([]);
    const [quizOptions, setQuizOptions] = useState<string[][]>([]);
    const [quizCorrectAnswers, setQuizCorrectAnswers] = useState<number[]>([]);
    const [percentCompleted, setPercentCompleted] = useState<number>(0)


    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);
    let selectedSubArticleNumber = 0;  // Default value in case it's not a subArticle

    const navigate = useNavigate();

    const {cx, classes} = useStyles();
    const themeDefault = useTheme();

    const smUp = useMediaQuery(themeDefault.breakpoints.up('sm'));


    // useEffect(() => {
    //     if (setSelectedSubArticle) {
    //         setSelectedSubArticle(selectedSubArticleNumberFromUrl);
    //     }
    // }, [selectedSubArticleNumberFromUrl]);

    useEffect(() => {
        console.log("historyList", historyList);

        if (historyList.length > 0) {
            console.log("testType", testType);
            if (testType === "subArticle") {
                selectedSubArticleNumber = parseInt(subtopicId || '0', 10);
                if (setSelectedSubArticle) {
                    setSelectedSubArticle(selectedSubArticleNumber);
                }
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
    }, [subtopicId, historyList]);

    const updateStateFromArticle = (questions: IDataForQuiz[]) => {
        const questionsArray: string[] = questions.map(item => item.question) || [];
        setQuizQuestions(questionsArray);
        console.log("questionsArray", questionsArray);

        const optionsArray: string[][] = questions.map(item => item.options) || [];
        setQuizOptions(optionsArray);
        console.log("optionsArray", optionsArray);

        const correctAnswersArray: number[] = questions.map(item => item.correct_answers) || [];
        setQuizCorrectAnswers(correctAnswersArray);
        console.log("correctAnswersArray", correctAnswersArray);


        // inspect

        const isValid = optionsArray.every((options, index) =>
            correctAnswersArray[index] >= 0 && correctAnswersArray[index] < options.length
        );

        const equalArrayLenght = optionsArray.length === correctAnswersArray.length && correctAnswersArray.length === questions.length;

        if (!equalArrayLenght || !isValid) console.warn("Length mismatch: optionsArray and correctAnswersArray should be" +
            " of" +
            " the same length as questionsArray");

    };

    useEffect(() => {

        if (currentArticle) {
            console.log("currentArticle1111", currentArticle)

            if (testType === "subArticle") {
                setCurrentArticleTitle("title" in currentArticle ? currentArticle.title : "");
                setCurrentTestId("sub_article_test_id" in currentArticle ? currentArticle.sub_article_test_id : undefined);

                if ("sub_article_test_questions" in currentArticle && currentArticle.sub_article_test_questions) {
                    updateStateFromArticle(currentArticle.sub_article_test_questions);
                }
            } else {
                setCurrentArticleTitle("text" in currentArticle ? currentArticle.text : "");
                setCurrentTestId("main_article_test_id" in currentArticle ? currentArticle.main_article_test_id : undefined);

                if ("main_article_test_questions" in currentArticle && currentArticle.main_article_test_questions) {
                    updateStateFromArticle(currentArticle.main_article_test_questions);
                }
            }
        }
    }, [currentArticle]);


// Успішне завершення тесту
    useEffect(() => {

        if (quizQuestions.length > 0) {
            setPercentCompleted(Math.round((100 / quizQuestions.length) * results.correct))
        }

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

        if (timeIsFinished && !answerChosen) {
            setResults({...results, incorrect: results.incorrect + 1});
            setCurrentAnswerStatus(false);
            setIsNextButtonActive(true);
        }

    }, [answerChosen, timeIsFinished])

    const clearSettingsBeforeNewQuestion = () => {
        setSelectedAnswer(null);
        setIsNextButtonActive(false);
        setAnswerChosen(false)
        setTimeIsFinished(false);
    }
    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        // setUserAnswers(Array(quizQuestions.length).fill(""));
        setResults({correct: 0, incorrect: 0});
        setIsQuizFinished(false);
        setPercentCompleted(0)
        clearSettingsBeforeNewQuestion();
    };


    const handleNextQuestion = () => {
        if (selectedAnswer === null && !timeIsFinished) {
            return;
        }

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            clearSettingsBeforeNewQuestion();
        } else {
            setIsQuizFinished(true);
        }
    };

    const handleAnswerKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" && isNextButtonActive) {
            handleNextQuestion();
        }
    };


    const theme = useTheme();


    const handleClose = () => {
        setOpenModal(false);
        navigate(`/article/${selectedArticleNumber}`);
    };


    // useEffect(() => {
    //     let timer: NodeJS.Timeout | undefined;
    //
    //     // Timer effect
    //     const startTimer = () => {
    //         Timertimer = setInterval(() => {
    //             setRemainingTime((prevTime) => {
    //                 if (prevTime === 0) {
    //                     clearInterval(timer); // Clear the timer when it reaches 0
    //                     setTimeIsFinished(true)
    //                     return 0;
    //                 } else {
    //                     return prevTime - 1; // Decrement the remaining time
    //                 }
    //             });
    //         }, 1000);
    //     };
    //
    //     if (!answerChosen) {
    //         // Run the timer only if answerChosen is false
    //         console.log("Run the timer ")
    //         startTimer();
    //     } else {
    //         clearInterval(timer);
    //     }
    //     // startTimer()
    //     // Cleanup function
    //     return () => {
    //         if (timer) clearInterval(timer);
    //     };
    //
    // }, [answerChosen]); // Runs whenever answerChosen changes; // Runs whenever answerChosen changes; // Runs once when the component mounts

// Calculate the progress for CircularProgress

    const optionHighlight = (option: number) => {

        if (selectedAnswer !== null) {
            if (option === selectedAnswer) {

                if (option === quizCorrectAnswers[currentQuestion]) {
                    return classes.sucessOptionSelected;
                } else return classes.errorOptionSelected;

            } else if (option === quizCorrectAnswers[currentQuestion]) {
                return classes.sucessOptionSelected;
            } else return " ";
        } else return " ";


    }

    const optionsHighlightWhenTimerIsFinished = (option: number) => {
        if (option === quizCorrectAnswers[currentQuestion]) {
            return classes.sucessOptionSelected;
        } else return "";
    }


    const quizResultsProps = {
        results,
        percentCompleted,
        nextLevelAvailable,
        handleRetakeQuiz,
        currentUser,
        selectedArticleNumber,
        historyList,
        testType,
    };

    // const questionContainerProps = {
    //     quizQuestions,
    //     currentQuestion,
    //     quizOptions,
    //     selectedAnswer,
    //     handleAnswer,
    //     handleAnswerKeyPress,
    //     maxTimeStatic,
    //     answerChosen,
    //     currentAnswerStatus,
    //     isNextButtonActive,
    //     handleNextQuestion,
    //     smUp,
    //     optionsHighlightWhenTimerIsFinished,
    //     optionHighlight,
    //     currentArticleTitle,
    //     percentCompleted,
    //     currentQuestionText: quizQuestions[currentQuestion],
    //     setTimeIsFinished,
    //     timeIsFinished,
    // };


    console.log(timeIsFinished ? "timeIsFinished Yes" : "timeIsFinished No")

    return (
        <Container>
            <Helmet>
                <title> {`Тестування ${selectedArticleNumber}`}</title>
            </Helmet>
            <QuizHeader selectedArticleNumber={selectedArticleNumber}/>
            {isQuizFinished ? (
                <QuizResults props={quizResultsProps}/>
            ) : (
                <QuestionContainer
                    setTimeIsFinished={setTimeIsFinished}
                    answerChosen={answerChosen}
                    maxTimeStatic={maxTimeStatic}
                    currentAnswerStatus={currentAnswerStatus}
                    currentArticleTitle={currentArticleTitle}
                    currentQuestion={currentQuestion}
                    handleAnswer={handleAnswer}
                    currentQuestionText={quizQuestions[currentQuestion]}
                    handleAnswerKeyPress={handleAnswerKeyPress}
                    handleNextQuestion={handleNextQuestion}
                    isNextButtonActive={isNextButtonActive}
                    optionHighlight={optionHighlight}
                    optionsHighlightWhenTimerIsFinished={optionsHighlightWhenTimerIsFinished}
                    percentCompleted={percentCompleted}
                    quizOptions={quizOptions}
                    selectedAnswer={selectedAnswer}
                    smUp={smUp}
                    timeIsFinished={timeIsFinished}
                />
            )}

            <QuizSuccessModal openModal={openModal} handleClose={handleClose}/>
        </Container>
    );
}


export default QuizBlock;
