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
    const [questionsArray,setQuestionsArray] = usse

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
                                       <React.Suspense fallback={<div>Loading...</div>}>
                                           <MainPageContent handleClickOpenModalSignIn={handleClickOpenModalSignIn}/>
                                       </React.Suspense>
                                   }
                            />
                            <Route path="/profile"
                                   element={
                                       <React.Suspense fallback={<div>Loading...</div>}>
                                           <ProfilePage
                                               historyList={data.historyList}
                                               achievementLevel={"test"}
                                               achievements={achievements}
                                               achievedList={data.achievedList}
                                               avatar={avatarImg}
                                               lessonsVisited={7}
                                               username={currentUser ? currentUser.name : "Петро" +
                                                   " Сагайдачний"}/>
                                       </React.Suspense>}
                            />

                            <Route path="/article/:selectedArticle"
                                   element={
                                       <React.Suspense fallback={<div>Loading...</div>}>
                                           <Article
                                               setSelectedSubArticle={setSelectedSubArticle}
                                               subArticleSuccessLevels={subArticleSuccessLevels}
                                               setSelectedArticle={setSelectedArticle}
                                               historyList={data.historyList}
                                           />
                                       </React.Suspense>
                                   }
                            />

                            <Route path={"/test/:selectedArticle"}
                                   element={
                                       <React.Suspense fallback={<div>Loading...</div>}>
                                           <QuizBlock
                                               testType="article"
                                               historyList={data.historyList}
                                               handleNextLevel={handleNextLevel}
                                               setAllAnswerIsCorrect={setAllAnswerIsCorrect}
                                               questions={data.historyList[selectedArticle]?.mainArticleTest ? data.historyList[selectedArticle]?.mainArticleTest?.questions : data.questions}
                                               options={data.historyList[selectedArticle]?.mainArticleTest?.options ? data.historyList[selectedArticle]?.mainArticleTest?.options : data.options}
                                               correctAnswers={data.historyList[selectedArticle]?.mainArticleTest?.correctAnswers ? data.historyList[selectedArticle]?.mainArticleTest?.correctAnswers : data.correctAnswers}
                                               onAnswer={handleQuizComplete}
                                           />
                                       </React.Suspense>
                                   }
                            />

                            <Route
                                path="/test/:selectedArticle/:subtopicId"
                                element={
                                    <React.Suspense fallback={<div>Loading...</div>}>
                                        <QuizBlock
                                            testType="subArticle"
                                            historyList={data.historyList}
                                            handleNextLevel={handleNextLevel}
                                            setAllAnswerIsCorrect={setSubArticleAllAnswerIsCorrect}
                                            questions={data.historyList[selectedArticle]?.subtopics?.[selectedSubArticle]?.subArticleTest?.questions ? data.historyList[selectedArticle]?.subtopics?.[selectedSubArticle]?.subArticleTest?.questions : data.subArticleTest.questions}
                                            options={data.historyList[selectedArticle]?.subtopics?.[selectedSubArticle]?.subArticleTest?.options ? data.historyList[selectedArticle]?.subtopics?.[selectedSubArticle]?.subArticleTest?.options : data.subArticleTest.options}
                                            correctAnswers={data.historyList[selectedArticle]?.subtopics?.[selectedSubArticle]?.subArticleTest?.correctAnswers ? data.historyList[selectedArticle]?.subtopics?.[selectedSubArticle]?.subArticleTest?.correctAnswers : data.subArticleTest.correctAnswers}
                                            onAnswer={handleQuizComplete}
                                            setSelectedSubArticle={setSelectedSubArticle}
                                        />
                                    </React.Suspense>}
                            />

                            <Route path="/timeline" element={
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <HistoryTimeline
                                        setSelectedSubArticle={setSelectedSubArticle}
                                        subArticleSuccessLevels={subArticleSuccessLevels}
                                        setSelectedArticle={setSelectedArticle}
                                        successLevels={successLevels}
                                        buttonStates={buttonStates}
                                        historyList={data.historyList}/>
                                </React.Suspense>
                            }
                            />
                        </Routes>
                    </React.Suspense>
                </main>

                <Footer/>
            </div>
        </Router>
    );
}


export default App;
