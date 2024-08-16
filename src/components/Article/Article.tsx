import React, {useEffect, useState} from "react";
import "./article.scss"
import {Button, Container, Grid, LinearProgress, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import SubtopicCard from "./components/SubtopicCard/SubtopicCard";
import {useTheme} from "@mui/system";
import {useAuth} from "../AuthContext/AuthContext";
import {contentRenderFunction} from "../../utils/utils";
import Preloader from "../Preloader/Preloader";
import {IArticleContentArrayItem, IArticleProps, SubtopicsProps} from "../../types/types";
import myImage from "../../static/image/city.jpg";


const Article: React.FC<IArticleProps> = ({
                                              setSelectedArticle,
                                              historyList,
                                              isLoading,
                                              currentUser
                                          }) => {

        const {selectedArticle} = useParams();
        const [stateArticle, setStateArticle] = useState({
            currentArticleContent: null as IArticleContentArrayItem[] | null,
            subArticlesArray: [] as SubtopicsProps[],
            completionPercentage: 0,
            completedSubtopics: 0,
            totalSubtopics: 0,
            currentLevelCompleted: false,
        });

        const navigate = useNavigate();
        const selectedArticleNumber = parseInt(selectedArticle || '0', 10);

        const theme = useTheme();
        const mdUp = useMediaQuery(theme.breakpoints.up('md'));

        const {isAuthenticated} = useAuth();

        useEffect(() => {
            if (!isAuthenticated) {
                navigate("/");
            }
        }, [isAuthenticated]);

        useEffect(() => {
            setSelectedArticle(selectedArticleNumber);
            const subtopics = historyList[selectedArticleNumber]?.subtopics ?? [];
            const content = historyList[selectedArticleNumber]?.content ?? null;

            setStateArticle(prevState => ({
                ...prevState,
                currentLevelCompleted: currentUser.current_level > selectedArticleNumber,
                subArticlesArray: subtopics,
                currentArticleContent: typeof content === "object" ? content : null
            }));

        }, [selectedArticleNumber, historyList, currentUser]);

        useEffect(() => {
            const calculateProgress = () => {
                const selectedArticle = historyList[selectedArticleNumber];
                if (!selectedArticle || !selectedArticle.subtopics) {
                    return;
                }

                const subtopics = selectedArticle.subtopics;
                const total = subtopics.length;

                const completed = subtopics.reduce((acc, subtopic) => {
                    const testResult = currentUser.tests_completed_list.find(result => result.test_id === subtopic.sub_article_test_id);
                    if (testResult && testResult.completed) {
                        acc += 1;
                    }
                    return acc;
                }, 0);

                setStateArticle(prevState => ({
                    ...prevState,
                    totalSubtopics: total,
                    completedSubtopics: completed,
                    completionPercentage: total > 0 ? (completed / total) * 100 : 0,
                }));
            };

            calculateProgress();
        }, [historyList, selectedArticleNumber, currentUser]);

        const handleGoToSubArticleTest = (articleIndex: number) => {
            if (currentUser === null) {
                return;
            }
            let tests_completed_list = currentUser.tests_completed_list;

            const firstIncompleteTest = tests_completed_list.find(test =>
                test.test_type === "Sub Article" &&
                test.event_id === articleIndex + 1 &&
                !test.completed
            );

            if (!firstIncompleteTest) {
                console.error('No incomplete test found.');
                return;
            }

            const subArticle = historyList[articleIndex]?.subtopics;

            if (!subArticle) {
                console.error('SubArticle is not available.');
                return;
            }

            const findIndexBySubArticleTestId = (testId: number): number => {
                return subArticle.findIndex(subArticle => subArticle.sub_article_test_id === testId);
            };

            const id = firstIncompleteTest.test_id;

            const selectedSubArticleIndex = findIndexBySubArticleTestId(id);

            setSelectedArticle(articleIndex);
            navigate(`/test/${articleIndex}/${selectedSubArticleIndex}`);
        };

        const handleShowQuiz = () => {
            navigate(`/test/${selectedArticleNumber}`);
        };

        const finalTestIsNotOpen = (stateArticle.subArticlesArray.length > 0 &&
            !stateArticle.subArticlesArray.every((subtopic: SubtopicsProps) => {
                const testResult = currentUser.tests_completed_list.find((result) => result.test_id === subtopic.sub_article_test_id);
                return testResult && testResult.completed;
            }));

        return (
            <Container className={"article_page_container"}>
                <Helmet>
                    <title>{isLoading ? `Loading` : `Тема ${historyList[selectedArticleNumber]?.text}`}</title>
                </Helmet>

                {isLoading ? (<Preloader/>) : (
                    <React.Fragment>
                        <Grid className={"back_button_container"} container>
                            <Grid item>
                                <Button component={RouterLink} to={"/timeline"} color={"secondary"}
                                        startIcon={<ArrowBackIosIcon/>}
                                        className="close-button">
                                    До Часопростору
                                </Button>
                            </Grid>
                        </Grid>

                        <Typography textAlign={"center"} variant={"h6"} className={"lesson"}>Lesson</Typography>
                        <Typography textAlign={"center"} className={"date"}
                                    variant={"h5"}>{historyList[selectedArticleNumber]?.date}</Typography>

                        <Typography textAlign={"center"} className={"title"}
                                    variant={"h4"}>{historyList[selectedArticleNumber]?.text}</Typography>

                        <Grid container justifyContent={"center"}>
                            <Grid item xs={"auto"}>
                                {!stateArticle.currentLevelCompleted && (finalTestIsNotOpen ?
                                        <Button className={"start_button_top"}
                                                onClick={() => handleGoToSubArticleTest(selectedArticleNumber)}
                                                variant={"contained"}>Start Test</Button>
                                        :
                                        <Button className={"start_button_top"}
                                                onClick={handleShowQuiz}
                                                variant={"contained"}>Start Test</Button>
                                )}
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={5}> <img src={myImage} alt=""/></Grid>
                            <Grid item xs={12} md={7}>
                                <div
                                    className={"content_container"}>{historyList[selectedArticleNumber]?.content && contentRenderFunction(stateArticle.currentArticleContent ? stateArticle.currentArticleContent : "")}</div>
                            </Grid>
                        </Grid>

                        {stateArticle.subArticlesArray.length > 0 && (
                            <Grid className={"subtopic_card_list"} container justifyContent={"center"}>

                                {!stateArticle.currentLevelCompleted && <Grid item xs={12} sm={12} md={6} xl={6}>
                                    <Typography variant={"h6"}>Пройдіть додаткові завдання перед головним
                                        тестом</Typography>
                                </Grid>}

                                {!stateArticle.currentLevelCompleted &&
                                <Grid className={"additional_test_progress_container"} container
                                      justifyContent={"center"}>
                                    <Grid item xs={12} sm={8} md={6} xl={4}>
                                        <LinearProgress color={"primary"} variant="determinate"
                                                        value={stateArticle.completionPercentage}/>
                                        <Typography className={"linear_progress_title"} variant="body2" gutterBottom>
                                            Виконано: {stateArticle.completedSubtopics} із {stateArticle.totalSubtopics} ({stateArticle.completionPercentage.toFixed(2)}%)
                                        </Typography>
                                    </Grid>
                                </Grid>}

                                <Grid item container xs={12} spacing={2}>
                                    {stateArticle.subArticlesArray.map((subtopic, index) => {

                                        const testResult = currentUser.tests_completed_list.find(result => result.test_id === subtopic.sub_article_test_id);
                                        const isCompleted = testResult ? testResult.completed : false;

                                        return (
                                            <Grid item key={index + "card"} xs={12} sm={6} md={4} xl={3}>
                                                <SubtopicCard
                                                    done={isCompleted}
                                                    selectedArticleNumber={selectedArticleNumber}
                                                    subArticleIndex={index}
                                                    title={subtopic.title}
                                                    content={subtopic.content}
                                                    handleGoToSubTestNow={(articleIndex, subArticleIndex) => navigate(`/test/${articleIndex}/${subArticleIndex}`)}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        )}

                        {!stateArticle.currentLevelCompleted && <Grid container justifyContent={"center"}>
                            <Grid item xs={12}>
                                {stateArticle.subArticlesArray.length > 0 && stateArticle.completionPercentage < 100 && (
                                    <Typography textAlign={"center"} variant={"h6"}>
                                        Пройдіть всі додаткові тести, щоб розблокувати головний тест
                                    </Typography>
                                )}

                                <Grid container justifyContent={"center"}>
                                    <Grid item xs={12} sm={6} md={"auto"}>
                                        <Button
                                            disabled={stateArticle.completionPercentage < 100}
                                            onClick={handleShowQuiz}
                                            size={"large"}
                                            fullWidth={!mdUp}
                                            variant={"contained"}
                                            className="quiz-button"
                                        >
                                            Завершити рівень
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>}
                    </React.Fragment>)}
            </Container>
        );
    }
;

export default Article;
