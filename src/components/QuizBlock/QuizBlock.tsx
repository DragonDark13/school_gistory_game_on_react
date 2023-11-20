import React, {useContext, useEffect, useState} from "react";
import {HistoricalEvent} from "../HistoryTimeline/HistoryTimeline";
import {ThemeContext, UserContext} from "../../App";
import {Button, FormControlLabel, Radio, RadioGroup} from "@mui/material";

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


    useEffect(() => {
        if (results.correct === questions.length) {
            setAllAnswerIsCorrect(true);
            setNextLevelAvailable(true)
        }
    }, [results.correct, questions.length]);

    const handleAnswer = (answer: string) => {
        setUserAnswers([
            ...userAnswers.slice(0, currentQuestion),
            answer,
            ...userAnswers.slice(currentQuestion + 1),
        ]);

        if (answer === correctAnswers[currentQuestion]) {
            setResults({...results, correct: results.correct + 1});
        } else {
            setResults({...results, incorrect: results.incorrect + 1});
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            onAnswer(results);
            setIsQuizFinished(true);
        }
    };

    const handleRetakeQuiz = () => {
        setCurrentQuestion(0);
        setUserAnswers(Array(questions.length).fill(""));
        setResults({correct: 0, incorrect: 0});
        setIsQuizFinished(false);
    };

    const theme = useContext(ThemeContext);
    const {currentUser} = useContext(UserContext);


    return (
        <div>
            {isQuizFinished ? (
                <div>
                    <h1>Тест завершено</h1>
                    <p>Результати:</p>
                    <p>Правильних відповідей: {results.correct}</p>
                    <p>Неправильних відповідей: {results.incorrect}</p>
                    {nextLevelAvailable && (
                        <div>
                            <p>Вітаю, {currentUser ? currentUser.name : "Невідомий"}, ви досягли наступного рівня. Тепер
                                ви можити відправитися у наступний
                                пункт нашої
                                подорожі у часі . Вперед до </p>
                            <h4>{selectedArticle !== null ? events[selectedArticle + 1].date : "Помилка у машині часу"}</h4>
                            <button onClick={handleNextLevel}>Перейти на наступний рівень</button>
                        </div>

                    )}
                    <button onClick={handleRetakeQuiz}>Пройти тест ще раз</button>
                    <button onClick={closeTestPage}>Повернутися на головну</button>
                </div>
            ) : (
                <div>
                    <h1>Test Theme {currentQuestion + 1}</h1>
                    <p>{questions[currentQuestion]}</p>
                    <RadioGroup

                        name="radio-buttons-group"
                    >
                        {options[currentQuestion].map((option, index) => (
                            <FormControlLabel
                                key={index + "button"}
                                className={theme + " answer-quiz-button"}
                                onClick={() => handleAnswer(option)}
                                control={<Radio />}
                                label={option}
                                value={option}
                            />

                          
                        ))}
                    </RadioGroup>
                    <Button variant={"contained"} onClick={backToArticleFromTest}>Переїти до бібліотеки</Button>
                    <Button variant={"contained"} onClick={closeTestPage}>Повернутися на головну</Button>
                </div>
            )}
        </div>
    );
};

export default QuizBlock;
