import React, {useEffect, useState} from "react";
import {Button, Container, Grid, LinearProgress, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./article.scss"
import myImage from "../../static/image/city.jpg";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import SubtopicCard from "./components/SubtopicCard/SubtopicCard";
import {
    IArticleContentArrayItem,
    IArticleProps,
    ISubtopicsTextContent,
    ITestCompletedItem,
    SubtopicsProps
} from "../../types/types";
import {useTheme} from "@mui/system";
import {useAuth} from "../AuthContext/AuthContext";
import {contentRenderFunction} from "../../utils/utils";
import Preloader from "../Preloader/Preloader";


// const fetchDataArticleContent = async (selectedArticleNumber: number) => {
//     const response = await axiosClient.get(`/ep/maincontent/${selectedArticleNumber}/`);
//     return response.data;
// };

// const fetchDataSubTopicsArray = async (selectedArticleNumber: number) => {
//     const response = await axiosClient.get(`/ep/subtwithcontent/${selectedArticleNumber}`);
//     return response.data.subtopics;
// };

// const useArticleContent = (selectedArticleNumber: number) => {
//     return useQuery(['articleContent', selectedArticleNumber], () => fetchDataArticleContent(selectedArticleNumber), {
//         enabled: !!selectedArticleNumber,
//     });
// };
//
// const useSubTopicsArray = (selectedArticleNumber: number) => {
//     return useQuery(['subTopicsArray', selectedArticleNumber], () => fetchDataSubTopicsArray(selectedArticleNumber), {
//         enabled: !!selectedArticleNumber,
//     });
// };


const Article: React.FC<IArticleProps> = ({
                                              setSelectedArticle,
                                              subArticleSuccessLevels,
                                              setSelectedSubArticle,
                                              historyList,
                                              isLoading,
                                              articleContentFromApp,
                                              currentUser

                                          }) => {

    // console.log("historyList", historyList);
    // console.log("isLoading::", isLoading);
    const {selectedArticle} = useParams();
    const [currentArticleContent, setCurrentArticleContent] = useState<null | IArticleContentArrayItem[]>(null);
    const [subTopicTextArray, setSubTopicTextArray] = useState<ISubtopicsTextContent[] | []>([]);
    const [subArticlesArray, setSubArticlesArray] = useState<SubtopicsProps[]>([]);

    const [completionPercentage, setCompletionPercentage] = useState(0);
    const [completedSubtopics, setCompletedSubtopics] = useState(0);
    const [totalSubtopics, setTotalSubtopics] = useState(0);
    const [currentLevelCompleted, setCurrentLevelCompleted] = useState(false);


    subArticleSuccessLevels = []

    const navigate = useNavigate();

    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);

    // console.log("selectedArticleNumber", selectedArticleNumber);

    useEffect(
        () => {
            setCurrentLevelCompleted(currentUser.current_level > selectedArticleNumber)

        }, [selectedArticleNumber, currentUser]
    )

    useEffect(() => {


        setSelectedArticle(selectedArticleNumber);
        const subtopics = historyList[selectedArticleNumber]?.subtopics;
        setSubArticlesArray(subtopics ?? []);

        const content = historyList[selectedArticleNumber]?.content;
        setCurrentArticleContent(typeof content === "object" ? content : null);


    }, [selectedArticleNumber])

    const handleShowQuiz = () => {
        // debugger
        navigate(`/test/${selectedArticleNumber}`);
    }

    const article = historyList[selectedArticleNumber];


    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const {isAuthenticated} = useAuth();


    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");

        }
    }, [isAuthenticated])

    const handleGoToTestNow = (articleIndex: number) => {
        navigate(`/test/${articleIndex}`);
        setSelectedArticle(articleIndex)
    }

    const handleGoToSubTestNow = (articleIndex: number, subArticleIndex: number) => {
        // debugger
        // setSelectedArticle(articleIndex)
        // setSelectedSubArticle(subArticleIndex)
        navigate(`/test/${articleIndex}/${subArticleIndex}`);

    }


    const handleGoToSubArticleTest = (articleIndex: number) => {
        // Знаходимо перший тест, де completed === false
        if (currentUser === null) {
            return false
        }
        let tests_completed_list = currentUser.tests_completed_list;

        if (!tests_completed_list) {
            console.error('User tests_completed_list is not available.');
            return;
        }
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
        handleGoToSubTestNow(articleIndex, selectedSubArticleIndex);
    };


    // const {
    //     data: currentArticleContentFromFetch,
    //     isLoading: isArticleContentLoading
    // } = useArticleContent(selectedArticleNumber);
    // const {
    //     data: subTopicsArrayFromFetch,
    //     isLoading: isSubTopicsArrayLoading
    // } = useSubTopicsArray(selectedArticleNumber);
    //

    // useEffect(() => {
    //     // You can perform additional actions if needed
    //
    //     if (currentArticleContentFromFetch) {
    //         setCurrentArticleContent(currentArticleContentFromFetch);
    //     } else {
    //         setCurrentArticleContent(null);
    //     }
    //
    //     if (subTopicsArrayFromFetch) {
    //         setSubTopicsArray(subTopicsArrayFromFetch);
    //     } else {
    //         setSubTopicsArray([]);
    //     }
    //
    // }, [currentArticleContentFromFetch, subTopicsArrayFromFetch]);

    // const totalSubtopics = historyList[selectedArticleNumber].subtopics ? historyList[selectedArticleNumber].subtopics.length : 0;
    // const completedSubtopics = subArticleSuccessLevels.length > 0 ? subArticleSuccessLevels[selectedArticleNumber].filter(done => done).length : 0;
    // const completionPercentage = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;
    // const finalTestIsNotOpen = (historyList[selectedArticleNumber].subtopics.length > 0 && subArticleSuccessLevels.length > 0) ? (subArticleSuccessLevels.length > 0 && !subArticleSuccessLevels[selectedArticleNumber].every(done => done)) : true;

    useEffect(() => {
        if (!historyList || selectedArticleNumber >= historyList.length) {
            return; // або можете показати повідомлення про помилку
        }

        const selectedArticle = historyList[selectedArticleNumber];

        if (selectedArticle && selectedArticle.subtopics) {
            const subtopics = selectedArticle.subtopics;
            const total = subtopics.length;

            const completed = subtopics.reduce((acc, subtopic) => {
                const testResult = currentUser.tests_completed_list.find(result => result.test_id === subtopic.sub_article_test_id);
                if (testResult && testResult.completed) {
                    acc += 1;
                }
                return acc;
            }, 0);

            setTotalSubtopics(total);
            setCompletedSubtopics(completed);
            setCompletionPercentage(total > 0 ? (completed / total) * 100 : 0);
        }
    }, [historyList, selectedArticleNumber, currentUser.tests_completed_list]);


    const finalTestIsNotOpen = (subArticlesArray.length > 0 &&
        !subArticlesArray.every((subtopic: SubtopicsProps) => {
            const testResult = currentUser.tests_completed_list.find((result: ITestCompletedItem) => result.test_id === subtopic.sub_article_test_id);
            return testResult && testResult.completed;
        }));

    return (
        <Container className={"article_page_container"}>
            <Helmet>
                <title> {isLoading ? `Loading` : `Тема ${article.text}`}</title>
            </Helmet>


            {
                isLoading ? (<Preloader/>) :

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
                        <Typography textAlign={"center"} className={"date"} variant={"h5"}>{article.date}</Typography>

                        <Typography textAlign={"center"} className={"title"} variant={"h4"}>{article.text}</Typography>

                        <Grid container justifyContent={"center"}>
                            <Grid item xs={"auto"}>
                                {!currentLevelCompleted && (finalTestIsNotOpen ?
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
                                    className={"content_container"}>{historyList[selectedArticleNumber].content && contentRenderFunction(currentArticleContent ? currentArticleContent : "")}</div>
                            </Grid>
                        </Grid>


                        {/* Display subtopics as cards */}
                        {subArticlesArray.length > 0 && (
                            <Grid className={"subtopic_card_list"} container justifyContent={"center"}>

                                {!currentLevelCompleted && <Grid item xs={12} sm={12} md={6} xl={6}>
                                    <Typography variant={"h6"}>Пройдіть додаткові завдання перед головним
                                        тестом</Typography>
                                </Grid>}

                                {!currentLevelCompleted &&
                                <Grid className={"additional_test_progress_container"} container
                                      justifyContent={"center"}>
                                    <Grid item xs={12} sm={8} md={6} xl={4}>
                                        <LinearProgress color={"primary"} variant="determinate"
                                                        value={completionPercentage}/>
                                        <Typography className={"linear_progress_title"} variant="body2" gutterBottom>
                                            Виконано: {completedSubtopics} із {totalSubtopics} ({completionPercentage.toFixed(2)}%)
                                        </Typography>
                                    </Grid>
                                </Grid>}

                                <Grid item container xs={12} spacing={2}>
                                    {subArticlesArray.map((subtopic, index) => {

                                        // console.log('Subtopic ID:', subtopic.sub_article_test_id);
                                        const testResult = currentUser.tests_completed_list.find(result => result.test_id === subtopic.sub_article_test_id);
                                        // console.log('Test Result:', testResult);
                                        const isCompleted = testResult ? testResult.completed : false;

                                        return (
                                            <Grid item key={index + "card"} xs={12} sm={6} md={4} xl={3}>
                                                <SubtopicCard
                                                    done={isCompleted}
                                                    selectedArticleNumber={selectedArticleNumber}
                                                    subArticleIndex={index}
                                                    title={subtopic.title}
                                                    content={subtopic.content}
                                                    handleGoToSubTestNow={handleGoToSubTestNow}
                                                />
                                            </Grid>
                                        );
                                    })}                                </Grid>
                            </Grid>
                        )}


                        {!currentLevelCompleted && <Grid container justifyContent={"center"}>
                            <Grid item xs={12} sm={6} md={"auto"}>
                                <Button
                                    disabled={finalTestIsNotOpen}
                                    size={"large"}
                                    fullWidth={!mdUp}
                                    variant={"contained"}
                                    className="quiz-button"
                                    onClick={handleShowQuiz}>
                                    Завершити рівень
                                </Button>
                            </Grid>
                        </Grid>}
                    </React.Fragment>
            }

        </Container>
    )

}

export default Article