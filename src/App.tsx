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
import {useRequestProcessor} from "./requestProcessor";
import axiosClient from "./axios";
import Preloader from "./components/Preloader/Preloader";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import number = CSS.number;


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
    const [questionsArray, setQuestionsArray] = useState(data.questions)
    const [quizOptionsArray, setQuizOptionsArray] = useState(data.options)
    const [correctAnswers, setCorrectAnswers] = useState(data.correctAnswers)
    const [questionsArraySubArticle, setQuestionsArraySubArticle] = useState(data.questions)
    const [quizOptionsArraySubArticle, setQuizOptionsArraySubArticle] = useState(data.options)
    const [correctAnswersSubArticle, setCorrectAnswersSubArticle] = useState(data.correctAnswers)


    const [buttonStates, setButtonStates] = useState(
        data.historyList.map((_, index) => index === 0) // Початково активна лише перша кнопка
    );


    const [subArticleSuccessLevels, setSubArticleSuccessLevels] = useState([]);


    // const [successLevels, setSuccessLevels] = useState(data.historyList.map((_, index) => index === -1))
    const [successLevels, setSuccessLevels] = useState<number>(0)
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

        // setSuccessLevels((prevStates) => {
        //     const updatedStates = [...prevStates];
        //     updatedStates[selectedArticle] = true;
        //     return updatedStates;
        // });


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


    useEffect(() => {

        if (selectedSubArticle !== null) {
            const selectedSubArticleTest = data.historyList[selectedArticle]?.subtopics?.[selectedSubArticle]?.subArticleTest;

            if (selectedSubArticleTest?.questions && selectedSubArticleTest?.options && selectedSubArticleTest?.correctAnswers) {
                const {questions, options, correctAnswers} = selectedSubArticleTest;
                setQuestionsArraySubArticle(questions);
                setQuizOptionsArraySubArticle(options);
                setCorrectAnswersSubArticle(correctAnswers);
            } else {
                setQuestionsArraySubArticle(data.questions);
                setQuizOptionsArraySubArticle(data.options);
                setCorrectAnswersSubArticle(data.correctAnswers);
            }

        } else {

            const selectedArticleTestData = data.historyList[selectedArticle]?.mainArticleTest;

            if (selectedArticleTestData?.questions && selectedArticleTestData?.options && selectedArticleTestData?.correctAnswers) {

                const {questions, options, correctAnswers} = selectedArticleTestData;
                setQuestionsArray(questions);
                setQuizOptionsArray(options);
                setCorrectAnswers(correctAnswers);
            } else {
                setQuestionsArray(data.questions);
                setQuizOptionsArray(data.options);
                setCorrectAnswers(data.correctAnswers);
            }
        }


    }, [selectedArticle, selectedSubArticle]);

    useEffect(() => {
        const effect = () => {
            if (selectedSubArticle !== null && subArticleAllAnswerIsCorrect) {
                // handleSubArticleQuizComplete();
                setSubArticleAllAnswerIsCorrect(false);
                // for new level reload answer
            }
        };

        effect();
    }, [subArticleAllAnswerIsCorrect, selectedSubArticle, selectedArticle]);

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

    useEffect(() => {

        if (currentUser && currentUser.current_level){
            setSuccessLevels(currentUser.current_level)

        }

    }, [currentUser]);



    const {query} = useRequestProcessor();


    const {data: historyDataList, isLoading, isError} = query(
        'users',
        () => axiosClient.get('/get-events ').then((res) => res.data),
        {enabled: true}
    );

    console.log(isLoading ? "isLoading true" : "isLoading false");
    const [historyListFromData, setHistoryListFromData] = useState<any[]>([]); // Adjust the type as per your data structure
    // console.log("dataFromQuery", dataFromQuery);


    useEffect(() => {

        if (historyDataList !== undefined) {
            setHistoryListFromData(historyDataList as any[]); // Casting historyDataList as an array
        } else {
            setHistoryListFromData([]);
        }
    }, [historyDataList]);


    console.log("historyListFromData:::", historyListFromData);

    console.log("isLoading>>>", isLoading ? "isLoading true" : "isLoading false");


    console.log("currentUser:::::", currentUser);


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
                    <React.Suspense fallback={<Preloader/>}>
                        <Routes>
                            <Route path={"/"}
                                   element={
                                       <React.Suspense fallback={<Preloader/>}>
                                           <MainPageContent handleClickOpenModalSignIn={handleClickOpenModalSignIn}/>
                                       </React.Suspense>
                                   }
                            />
                            <Route
                                path="/profile"
                                element={
                                    <PrivateRoute
                                        element={
                                            <React.Suspense fallback={<Preloader/>}>
                                                {historyListFromData.length > 0 ? (
                                                    <ProfilePage
                                                        isLoading={isLoading}
                                                        historyList={historyListFromData}
                                                        achievementLevel={"test"}
                                                        achievements={achievements}
                                                        achievedList={data.achievedList}
                                                        avatar={avatarImg}
                                                        lessonsVisited={currentUser?.current_level}
                                                        username={currentUser ? currentUser.user_name : "Петро Сагайдачний"}
                                                    />
                                                ) : (
                                                    <Preloader/>
                                                )}
                                            </React.Suspense>
                                        }
                                    />
                                }
                            />
                            <Route
                                path="/article/:selectedArticle"
                                element={
                                    <PrivateRoute
                                        element={
                                            <React.Suspense fallback={<Preloader/>}>
                                                {(historyListFromData.length > 0) ? (
                                                    <Article
                                                        articleContentFromApp={historyListFromData[selectedArticle].content}
                                                        historyList={historyListFromData}
                                                        isLoading={isLoading}
                                                        setSelectedSubArticle={setSelectedSubArticle}
                                                        subArticleSuccessLevels={subArticleSuccessLevels}
                                                        setSelectedArticle={setSelectedArticle}
                                                    />
                                                ) : (
                                                    <Preloader/>
                                                )}
                                            </React.Suspense>
                                        }
                                    />
                                }
                            />
                            <Route
                                path="/test/:selectedArticle"
                                element={
                                    <PrivateRoute
                                        element={
                                            <React.Suspense fallback={<Preloader/>}>
                                                <QuizBlock
                                                    testType="article"
                                                    historyList={historyListFromData}
                                                    handleNextLevel={handleNextLevel}
                                                    setAllAnswerIsCorrect={setAllAnswerIsCorrect}
                                                    questions={questionsArray}
                                                    options={quizOptionsArray}
                                                    correctAnswers={correctAnswers}
                                                    onAnswer={handleQuizComplete}
                                                />
                                            </React.Suspense>
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/test/:selectedArticle/:subtopicId"
                                element={
                                    <PrivateRoute
                                        element={
                                            <React.Suspense fallback={<Preloader/>}>
                                                <QuizBlock
                                                    testType="subArticle"
                                                    historyList={historyListFromData}
                                                    handleNextLevel={handleNextLevel}
                                                    setAllAnswerIsCorrect={setSubArticleAllAnswerIsCorrect}
                                                    questions={questionsArraySubArticle}
                                                    options={quizOptionsArraySubArticle}
                                                    correctAnswers={correctAnswersSubArticle}
                                                    onAnswer={handleQuizComplete}
                                                    setSelectedSubArticle={setSelectedSubArticle}
                                                />
                                            </React.Suspense>
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/timeline"
                                element={
                                    <PrivateRoute
                                        element={
                                            <React.Suspense fallback={<Preloader/>}>
                                                {historyListFromData.length > 0 ? (
                                                    <HistoryTimeline
                                                        isLoading={isLoading}
                                                        setSelectedSubArticle={setSelectedSubArticle}
                                                        subArticleSuccessLevels={subArticleSuccessLevels}
                                                        selectedArticle={selectedArticle}
                                                        setSelectedArticle={setSelectedArticle}
                                                        successLevels={successLevels}
                                                        buttonStates={buttonStates}
                                                        historyList={historyListFromData}
                                                    />
                                                ) : (
                                                    <Preloader/>
                                                )}
                                            </React.Suspense>
                                        }
                                    />
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
