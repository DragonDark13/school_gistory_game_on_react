import React, {
    useCallback, useContext,
    useEffect,
    useState
} from 'react';
import data from "./data/data.json";
import "./static/css/normalize.css"
import "./static/style/main.scss"
import {Route, Routes, HashRouter as Router} from 'react-router-dom';
import avatarImg from "./static/image/city.jpg"
import {Helmet} from "react-helmet-async";
import {UserContext} from './components/MyProviders/MyProviders';
import ModalSignInSignUp from "./components/ModalSignInSignUp/ModalSignInSignUp";

const HistoryTimeline = React.lazy(() => import('./components/HistoryTimeline/HistoryTimeline'));
const QuizBlock = React.lazy(() => import('./components/QuizBlock/QuizBlock'));
const Article = React.lazy(() => import('./components/Article/Article'));
const Header = React.lazy(() => import('./components/Header/Header'));
const ProfilePage = React.lazy(() => import('./components/ProfilePage/ProfilePage'));
const MainPageContent = React.lazy(() => import('./components/MainPageContent/MainPageContent'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));


function App() {
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

    }, [selectedArticle, setButtonStates, setAchievements]);

    useEffect(() => {
        const effect = () => {
            if (allAnswerIsCorrect) {
                allAnswerIsCorrectFunc();
                setAllAnswerIsCorrect(false);
                // for new level reload answer
            }
        };

        effect();
    }, [allAnswerIsCorrect, selectedArticle, allAnswerIsCorrectFunc]);


    const handleSubArticleQuizComplete = useCallback(() => {

        setSubArticleSuccessLevels((prevStates) => {
            const updatedStates = [...prevStates];
            updatedStates[selectedArticle][selectedSubArticle] = true;
            return updatedStates;
        });


    }, [selectedSubArticle, setSubArticleSuccessLevels]);


    useEffect(() => {
        const effect = () => {
            if (selectedSubArticle !== null && subArticleAllAnswerIsCorrect) {
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

    const handleNextLevel = () => {
        setSelectedArticle(selectedArticle + 1);
    };

    const [openModal, setOpenModal] = React.useState(false);
    const [showSignInForm, setShowSignInForm] = React.useState(false)
    const [showSignUpForm, setShowSignUpForm] = React.useState(false)

    const handleClickOpenModalSignIn = () => {
        setOpenModal(true);
        setShowSignInForm(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setShowSignInForm(false);
        setShowSignUpForm(false);
    };

    const {currentUser} = useContext(UserContext)

    return (
        <Router>
            <div className="App">

                <Helmet>
                    <title>Головна</title>
                </Helmet>
                <Header handleClickOpenModalSignIn={handleClickOpenModalSignIn}/>

                <ModalSignInSignUp
                    goToHistoryTimeLine={true}
                    setOpenModal={setOpenModal} openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    showSignInForm={showSignInForm} showSignUpForm={showSignUpForm}
                    setShowSignInForm={setShowSignInForm}
                    setShowSignUpForm={setShowSignUpForm}/>


                <main>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path={"/"}
                                   element={
                                       <MainPageContent handleClickOpenModalSignIn={handleClickOpenModalSignIn}/>
                                   }
                            />
                            <Route path="/profile"
                                   element={
                                       <ProfilePage
                                           historyList={data.historyList}
                                           achievementLevel={"test"}
                                           achievements={achievements}
                                           achievedList={data.achievedList}
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
                                    historyList={data.historyList}/>}/>
                        </Routes>
                    </React.Suspense>
                </main>

                <Footer/>
            </div>
        </Router>
    );
}


export default App;
