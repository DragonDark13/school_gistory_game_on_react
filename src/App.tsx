import React, {
    useCallback, useContext,
    useEffect,
    useState
} from 'react';
import HistoryTimeline from './components/HistoryTimeline/HistoryTimeline';
import QuizBlock from "./components/QuizBlock/QuizBlock";
import Article from "./components/Article/Article";
import data from "./data/data.json";
import Header from "./components/Header/Header";
import {
    Container,
} from "@mui/material";
import "./static/css/normalize.css"
import "./static/style/main.scss"
import AboutProject from "./components/AboutProject/AboutProject";
import AboutFeatureList from "./components/AboutFeatureList/AboutFeatureList";
import {BrowserRouter, Route, Routes, HashRouter as Router} from 'react-router-dom';
import ProfilePage from "./components/ProfilePage/ProfilePage";
import avatarImg from "./static/image/city.jpg"
import {Helmet} from "react-helmet-async";
import MyProviders, {UserContext} from './components/MyProviders/MyProviders';


function App() {
    const [showTimeline, setShowTimeline] = useState(true)
    const [showQuiz, setShowQuiz] = useState(false);
    const [expandedArticle, setExpandedArticle] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<number>(0)
    const [selectedSubArticle, setSelectedSubArticle] = useState<null | number>(null);

    const [buttonStates, setButtonStates] = useState(
        data.historyList.map((_, index) => index === 0) // Початково активна лише перша кнопка
    );


    const [subArticleSuccessLevels, setSubArticleSuccessLevels] = useState(() => {
        const initialSuccessLevels = data.historyList.map((article) => {
            if (article?.subtopics !== undefined && article?.subtopics?.length > 0) {
                return article.subtopics.map(() => false);
            }
            return [];
        });

        return initialSuccessLevels;
    });


    const [successLevels, setSuccessLevels] = useState(data.historyList.map((_, index) => index === -1))
    console.log(successLevels);

    const [achievements, setAchievements] = useState<[] | string[]>([])
    const [allAnswerIsCorrect, setAllAnswerIsCorrect] = useState(false)
    const [subArticleAllAnswerIsCorrect, setSubArticleAllAnswerIsCorrect] = useState(false);
    console.log(subArticleAllAnswerIsCorrect);

    const allAnswerIsCorrectFunc = useCallback(() => {
        if (selectedArticle !== null) {

            console.log("selectedArticle", selectedArticle);
            console.log(buttonStates);
            setButtonStates((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[selectedArticle + 1] = true;
                return updatedStates;
            });

            console.log("selectedArticle", selectedArticle);

            setSuccessLevels((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[selectedArticle] = true;
                return updatedStates;
            });

            console.log("selectedArticle", selectedArticle);

            console.log("successLevels", successLevels);

            setAchievements((prevAchievements) => {
                const newAchievements = [...prevAchievements];
                newAchievements[selectedArticle] = data.historyList[selectedArticle].achieved;
                return newAchievements;
            });
        }
    }, [selectedArticle, setButtonStates, setAchievements]);

    useEffect(() => {
        const effect = () => {
            if (selectedArticle !== null && allAnswerIsCorrect) {
                allAnswerIsCorrectFunc();
                setAllAnswerIsCorrect(false);
                // for new level reload answer
            }
        };

        effect();
    }, [allAnswerIsCorrect, selectedArticle, allAnswerIsCorrectFunc]);


    const handleSubArticleQuizComplete = useCallback(() => {
        if (selectedSubArticle !== null) {

            setSubArticleSuccessLevels((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[selectedArticle][selectedSubArticle] = true;
                return updatedStates;
            });

        }
    }, [selectedSubArticle, setSubArticleSuccessLevels]);


    useEffect(() => {
        const effect = () => {
            if (selectedArticle !== null && selectedSubArticle !== null && subArticleAllAnswerIsCorrect) {
                console.log('Sub article')
                handleSubArticleQuizComplete();
                setSubArticleAllAnswerIsCorrect(false);
                // for new level reload answer
            }
        };

        effect();
    }, [subArticleAllAnswerIsCorrect, selectedSubArticle, handleSubArticleQuizComplete, selectedArticle]);

    console.log("subArticleSuccessLevels:::", subArticleSuccessLevels);


    const handleQuizComplete = (results: { correct: number; incorrect: number }) => {
        // Ваш код для обробки результатів тесту
        console.log('Результати тесту:');
        console.log(`Правильних відповідей: ${results.correct}`);
        console.log(`Неправильних відповідей: ${results.incorrect}`);
    };


    const handleShowQuiz = () => {
        setShowQuiz(true);
        setExpandedArticle(false);
    };

    const closeTestPage = () => {
        setShowQuiz(false);
        setShowTimeline(true)
        // Виконати дії для переходу на головну сторінку
        // Наприклад, перенаправлення на іншу сторінку або зміна URL
        // Може залежати від вашої архітектури додатку
        console.log("Перехід на головну сторінку");
    };

    const backToArticleFromTest = () => {
        setShowQuiz(false);
        setExpandedArticle(true);
    }

    const handleNextLevel = () => {
        if (selectedArticle !== null) {
            setShowQuiz(false);
            setSelectedArticle(selectedArticle + 1);
            setExpandedArticle(true);
        }
    };

    const handleGoToTestNow = (index: number) => {
        setSelectedArticle(index);
        handleShowQuiz();
        setShowTimeline(false)
    }


    const {currentUser} = useContext(UserContext)


    return (
        <Router>
            <div className="App">


                <MyProviders>
                    <Helmet>
                        <title>Головна</title>
                    </Helmet>
                    <Header/>

                    <main>

                        <Routes>
                            <Route path="/profile"
                                   element={<ProfilePage
                                       historyList={data.historyList}
                                       achievementLevel={"test"}
                                       achievements={achievements}
                                       avatar={avatarImg}
                                       lessonsVisited={7}
                                       username={currentUser ? currentUser.name : "Петро" +
                                           " Сагайдачний"}/>}/>

                            <Route path="/article/:selectedArticle"
                                   element={
                                       <Article
                                           subArticleSuccessLevels={subArticleSuccessLevels}
                                           setSelectedArticle={setSelectedArticle}
                                           historyList={data.historyList}
                                           // selectedArticle={selectedArticle}
                                       />
                                   }
                            />

                            <Route path={"/test/:selectedArticle"}
                                   element={
                                       <QuizBlock
                                           testType="article"
                                           historyList={data.historyList}
                                           handleNextLevel={handleNextLevel}
                                           setAllAnswerIsCorrect={setAllAnswerIsCorrect}
                                           questions={data.questions} options={data.options}
                                           correctAnswers={data.correctAnswers}
                                           onAnswer={handleQuizComplete}
                                       />
                                   }
                            />

                            <Route
                                path="/test/:selectedArticle/:subtopicId"
                                element={
                                    <QuizBlock
                                        testType="subArticle"
                                        historyList={data.historyList}
                                        handleNextLevel={handleNextLevel}
                                        setAllAnswerIsCorrect={setSubArticleAllAnswerIsCorrect}
                                        questions={data.subArticleTest.questions}
                                        options={data.subArticleTest.options}
                                        correctAnswers={data.subArticleTest.correctAnswers}
                                        onAnswer={handleQuizComplete}
                                        setSelectedSubArticle={setSelectedSubArticle}
                                    />}
                            />

                            <Route path="/timeline" element={
                                <HistoryTimeline
                                    setSelectedSubArticle={setSelectedSubArticle}
                                    subArticleSuccessLevels={subArticleSuccessLevels}
                                    setSelectedArticle={setSelectedArticle}
                                    successLevels={successLevels}
                                    buttonStates={buttonStates}
                                    // handleExpandArticle={handleExpandArticle}
                                    historyList={data.historyList}/>}/>

                            <Route path={"/"}
                                   element={
                                       <div className={"main_page"}>
                                           <Container>
                                               <AboutProject/>
                                           </Container>

                                           <AboutFeatureList/>
                                       </div>
                                   }
                            />

                        </Routes>
                    </main>
                    {/*<footer>*/}
                    {/*    <Container>*/}
                    {/*        <div>sociicons</div>*/}
                    {/*        <div>copyright</div>*/}
                    {/*    </Container>*/}
                    {/*</footer>*/}
                </MyProviders>

            </div>
        </Router>
    );
}


export default App;
