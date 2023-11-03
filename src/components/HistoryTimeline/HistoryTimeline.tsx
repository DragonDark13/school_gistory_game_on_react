import React, {useState} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface HistoricalEvent {
    date: string;
    text: string;
}

interface HistoryTimelineProps {
    events: HistoricalEvent[];
}

const QuizBlock: React.FC<{ questions: string[]; options: string[][]; correctAnswers: string[]; onAnswer: (results: { correct: number; incorrect: number }) => void }> = ({
                                                                                                                                                                              questions,
                                                                                                                                                                              options,
                                                                                                                                                                              correctAnswers,
                                                                                                                                                                              onAnswer,
                                                                                                                                                                          }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(''));
    const [results, setResults] = useState({correct: 0, incorrect: 0});

    const handleAnswer = (answer: string) => {
        debugger
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
        }
    };

    return (
        <div>
            {currentQuestion < questions.length - 1 ? (
                <div>
                    <h1>Test Theme {currentQuestion + 1}</h1>
                    <p>{questions[currentQuestion]}</p>
                    {
                        options[currentQuestion].map((option, index) => (
                            <button
                                key={index + "button"}
                                className="answer-quiz-button"
                                onClick={() => handleAnswer(option)}
                            >
                                {option}
                            </button>
                        ))
                    }
                </div>
            ) : (
                <div>
                    <h1>Тест завершено</h1>
                    <p>Результати:</p>
                    <p>Правильних відповідей: {results.correct}</p>
                    <p>Неправильних відповідей: {results.incorrect}</p>

                </div>
            )}
        </div>
    );
};

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({events}) => {

    const [expandedArticle, setExpandedArticle] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [chronologicalStates, setChronologicalStates] = useState(events.map((_, index) => index === 0));
    const [selectedArticle, setSelectedArticle] = useState<null | number>(null)

    const handleExpandArticle = (index: number) => {
        setExpandedArticle(true);
        setSelectedArticle(index)
    };

    const handleCloseArticle = () => {
        setExpandedArticle(false);
        setSelectedArticle(null)
    }

    const handleShowQuiz = () => {
        setShowQuiz(true);
        setExpandedArticle(false);
    };

    const handleAnswerQuiz = (correct: boolean) => {
        if (correct) {
            const updatedStates = chronologicalStates.map((_, index) => index === 0 || chronologicalStates[index]);
            setChronologicalStates(updatedStates);
        }
        setShowQuiz(false);
    };

    const questions: string[] = [
        'Питання 1: Як називається столиця Франції?',
        'Питання 2: Скільки днів у лютому у високосному році?',
        'Питання 3: Скільки планет в Сонячній системі?',
    ];

    const options: string[][] = [
        ['Париж', 'Лондон', 'Берлін', 'Рим'],
        ['28', '29', '30', '31'],
        ['7', '8', '9', '10'],
    ];

    const correctAnswers: string[] = ['Париж', '29', '8'];

    const handleQuizComplete = (results: { correct: number; incorrect: number }) => {
        // Ваш код для обробки результатів тесту
        console.log('Результати тесту:');
        console.log(`Правильних відповідей: ${results.correct}`);
        console.log(`Неправильних відповідей: ${results.incorrect}`);
    };
    return (
        <div>
            <h1>History Timeline</h1>
            {(!expandedArticle && !showQuiz) && <VerticalTimeline>
                {events.map((event, index) => (
                    <VerticalTimelineElement
                        key={index + "history-timeline"}
                        date={event.date}
                        iconStyle={{background: '#007BFF', color: '#fff'}}
                    >
                        <h3 className="vertical-timeline-element-title">{event.date}</h3>
                        <p>{event.text}</p>
                        <button className="learn-more-button" onClick={() => handleExpandArticle(index)}>
                            Дізнатися більше
                        </button>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
            }
            {expandedArticle && (
                <div>
                    <h1>Theme {selectedArticle}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <button className="quiz-button" onClick={handleShowQuiz}>
                        Пройти тест
                    </button>
                    <button className="close-button" onClick={handleCloseArticle}>
                        Закрити
                    </button>
                </div>
            )}

            {showQuiz && (
                <div>
                    <QuizBlock questions={questions} options={options} correctAnswers={correctAnswers}
                               onAnswer={handleQuizComplete}/>
                </div>
            )}
        </div>);
};

export default HistoryTimeline;
