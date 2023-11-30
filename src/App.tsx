import React, {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
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
    createTheme,
    CssBaseline,
    PaletteMode,
    ThemeProvider,
} from "@mui/material";
import getDesignTokens from './themes/getDesignTokens';
import {AuthProvider} from "./components/AuthContext/AuthContext";
import "./static/css/normalize.css"
import "./static/style/main.scss"
import AboutProject from "./components/AboutProject/AboutProject";
import AboutFeatureList from "./components/AboutFeatureList/AboutFeatureList";


export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});


export interface IThemeContextProps {
    theme: 'light' | 'dark';
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const ThemeContext = createContext<IThemeContextProps>({
    theme: 'light',
    setTheme: () => null,
});

export interface ILanguageContextProps {
    language: 'uk' | 'en';
    setLanguage: Dispatch<SetStateAction<'uk' | 'en'>>;
}

export const LanguageContext = createContext<ILanguageContextProps>({
    language: 'uk',
    setLanguage: () => null,
});

export interface IUser {
    name: string;
    // Додайте інші властивості користувача, які вам потрібні
}

export interface UserContextProps {
    currentUser: null | IUser;
    setCurrentUser: Dispatch<SetStateAction<null | object>>;
}

export const UserContext = createContext<UserContextProps>({
    currentUser: null,
    setCurrentUser: () => null,
});

interface MyProvidersProps {
    children: ReactNode;
}


function App() {
    const [showTimeline, setShowTimeline] = useState(true)
    const [showQuiz, setShowQuiz] = useState(false);
    const [expandedArticle, setExpandedArticle] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState<null | number>(null)
    const [buttonStates, setButtonStates] = useState(
        data.historyList.map((_, index) => index === 0) // Початково активна лише перша кнопка
    );

    const [successLevels, setSuccessLevels] = useState(data.historyList.map((_, index) => index === -1))
    console.log(successLevels);

    const [achievements, setAchievements] = useState<[] | string[]>([])
    const [allAnswerIsCorrect, setAllAnswerIsCorrect] = useState(false)

    console.log("achievements",achievements);

    const handleExpandArticle = (index: number) => {
        setExpandedArticle(true);
        setSelectedArticle(index)
        setShowTimeline(false)
        setShowQuiz(false)
    };


    const handleCloseArticle = () => {
        setExpandedArticle(false);
        setSelectedArticle(null)
        setShowTimeline(true)
    }


    const allAnswerIsCorrectFunc = useCallback(() => {
        if (selectedArticle !== null) {
            setButtonStates((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[selectedArticle + 1] = true;
                return updatedStates;
            });


            setSuccessLevels((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[selectedArticle] = true;
                return updatedStates;
            });

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
            }
        };

        effect();
    }, [allAnswerIsCorrect, selectedArticle, allAnswerIsCorrectFunc]);


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


    return (
        <div className="App">


            <MyProviders>
                <Header/>

                <main>
                    <Container>
                        <AboutProject/>
                    </Container>

                    <AboutFeatureList/>

                                    <Container>
                    {showTimeline &&
                    <HistoryTimeline successLevels={successLevels} handleGoToTestNow={handleGoToTestNow}
                                     buttonStates={buttonStates}
                                     handleExpandArticle={handleExpandArticle}
                                     events={data.historyList}/>
                    }
                    {expandedArticle && (
                        <Article handleCloseArticle={handleCloseArticle} handleShowQuiz={handleShowQuiz}
                                 selectedArticle={selectedArticle}/>
                    )}
                    {showQuiz &&

                    <QuizBlock
                        allAnswerIsCorrectFunc={allAnswerIsCorrectFunc}
                        events={data.historyList}
                        selectedArticle={selectedArticle}
                        handleNextLevel={handleNextLevel}
                        setAllAnswerIsCorrect={setAllAnswerIsCorrect}
                        closeTestPage={closeTestPage}
                        questions={data.questions} options={data.options}
                        correctAnswers={data.correctAnswers}
                        onAnswer={handleQuizComplete}
                        backToArticleFromTest={backToArticleFromTest}
                    />

                    }

                </Container>


                </main>


                <footer>
                    <Container>
                        <div>sociicons</div>
                        <div>copyright</div>
                    </Container>
                </footer>
            </MyProviders>

        </div>
    );
}

function MyProviders({children}: MyProvidersProps) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    // const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<'uk' | 'en'>('uk');

    const [mode, setMode] = React.useState<PaletteMode>('light');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            <UserContext.Provider
                value={{
                    currentUser,
                    setCurrentUser
                }}
            >
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <AuthProvider>
                            <CssBaseline/>
                            {children}
                        </AuthProvider>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </UserContext.Provider>
        </LanguageContext.Provider>
    );
}


export default App;
