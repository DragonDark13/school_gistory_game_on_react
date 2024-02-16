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
import axios from "axios";
import {useQuery} from "react-query";
import {useRequestProcessor} from "./requestProcessor";
import axiosClient from "./axios";


const HistoryTimeline = React.lazy(() => import('./components/HistoryTimeline/HistoryTimeline'));
const QuizBlock = React.lazy(() => import('./components/QuizBlock/QuizBlock'));
const Article = React.lazy(() => import('./components/Article/Article'));
const Header = React.lazy(() => import('./components/Header/Header'));
const ProfilePage = React.lazy(() => import('./components/ProfilePage/ProfilePage'));
const MainPageContent = React.lazy(() => import('./components/MainPageContent/MainPageContent'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));


const fetchData = async () => {
    const response = await axios.get('https://zelse.asuscomm.com/SchoolHistoryGame/ep/main/');
    return response.data;
};

function App() {
    const [selectedArticle, setSelectedArticle] = useState<number>(0)
    const [selectedSubArticle, setSelectedSubArticle] = useState<null | number>(null);
    const [questionsArray, setQuestionsArray] = useState(data.questions)
    const [quizOptionsArray, setQuizOptionsArray] = useState(data.options)
    const [correctAnswers, setCorrectAnswers] = useState(data.correctAnswers)
    const [questionsArraySubArticle, setQuestionsArraySubArticle] = useState(data.questions)
    const [quizOptionsArraySubArticle, setQuizOptionsArraySubArticle] = useState(data.options)
    const [correctAnswersSubArticle, setCorrectAnswersSubArticle] = useState(data.correctAnswers)
    const [fetchIsLoading, setFetchIsLoading] = useState(true)


    // const {isLoading, isError, dataFromQuery} = useQuery('data', fetchData);

    // console.log("dataFromQuery", dataFromQuery);
    // useEffect(() => {
    //     debugger
    //     if (dataFromQuery) {
    //         setHistoryListFromData(dataFromQuery);
    //     }
    // }, [dataFromQuery]);

    // console.log("historyListFromData", historyListFromData);

    const [buttonStates, setButtonStates] = useState(
        data.historyList.map((_, index) => index === 0) // Початково активна лише перша кнопка
    );


    const [subArticleSuccessLevels, setSubArticleSuccessLevels] = useState([]);


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

    // useEffect(() => {
    //     const selectedArticleTest = data.historyList[selectedArticle]?.mainArticleTest;
    //
    //     if (selectedArticleTest?.questions && selectedArticleTest?.options && selectedArticleTest?.correctAnswers) {
    //         const {questions, options, correctAnswers} = selectedArticleTest;
    //         setQuestionsArray(questions);
    //         setQuizOptionsArray(options);
    //         setCorrectAnswers(correctAnswers);
    //     } else {
    //         setQuestionsArray(data.questions);
    //         setQuizOptionsArray(data.options);
    //         setCorrectAnswers(data.correctAnswers);
    //     }
    // }, [selectedArticle]);

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

        }


    }, [selectedArticle, selectedSubArticle]);


    // const handleSubArticleQuizComplete = useCallback(() => {
    //
    //     if (selectedSubArticle !== null) {
    //
    //         setSubArticleSuccessLevels(prevSuccessLevels => {
    //             const newSuccessLevels = [...prevSuccessLevels];
    //
    //             // Перевіряємо, чи є створений підмасив для даної статті
    //             if (!newSuccessLevels[selectedArticle]) {
    //                 newSuccessLevels[selectedArticle] = [];
    //             }
    //
    //             // Оновлюємо значення успішності підмасиву
    //             newSuccessLevels[selectedArticle][subArticleIndex] = value;
    //
    //             return newSuccessLevels;
    //         });
    //     }
    //
    // }, [selectedArticle, selectedSubArticle, setSubArticleSuccessLevels]);
    //

    useEffect(() => {
        const effect = () => {
            if (selectedSubArticle !== null && subArticleAllAnswerIsCorrect) {
                console.log('Sub article')
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

    const {query} = useRequestProcessor();

    const {data: historyDataList, isLoading, isError} = query(
        'users',
        () => axiosClient.get('/main/').then((res) => res.data),
        {enabled: true}
    );

    console.log(isLoading ? "isLoading true" : "isLoading false");
    const [historyListFromData, setHistoryListFromData] = useState<any[]>([]); // Adjust the type as per your data structure
    // console.log("dataFromQuery", dataFromQuery);



    useEffect(() => {
        debugger
        if (historyDataList) {
            setHistoryListFromData(historyDataList as any[]); // Casting historyDataList as an array
        }
    }, [historyDataList]);


    console.log("historyListFromData:::", historyListFromData);

    console.log("isLoading>>>", isLoading ? "isLoading true" : "isLoading false");

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p>Error :(</p>;

    console.log("historyDataList:::::", historyDataList);
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
                                               historyList={historyListFromData}
                                               isLoading={isLoading}
                                               setSelectedSubArticle={setSelectedSubArticle}
                                               subArticleSuccessLevels={subArticleSuccessLevels}
                                               setSelectedArticle={setSelectedArticle}
                                           />
                                       </React.Suspense>
                                   }
                            />

                            <Route path={"/test/:selectedArticle"}
                                   element={
                                       <React.Suspense fallback={<div>Loading...</div>}>
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

                            <Route
                                path="/test/:selectedArticle/:subtopicId"
                                element={
                                    <React.Suspense fallback={<div>Loading...</div>}>
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
                                    </React.Suspense>}
                            />

                            <Route path="/timeline" element={
                                <React.Suspense fallback={<div>Loading...</div>}>
                                    <HistoryTimeline
                                        isLoading={isLoading}
                                        setSelectedSubArticle={setSelectedSubArticle}
                                        subArticleSuccessLevels={subArticleSuccessLevels}
                                        selectedArticle={selectedArticle}
                                        setSelectedArticle={setSelectedArticle}
                                        successLevels={successLevels}
                                        buttonStates={buttonStates}
                                        historyList={historyListFromData}/>
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
