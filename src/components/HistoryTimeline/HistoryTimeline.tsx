import 'react-vertical-timeline-component/style.min.css';
import './timeline-ovveriders.scss'
import {
    Card, Container, Typography,
    useTheme
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TimelineCard from "./components/TimelineCard/TimelineCard";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {IHistoryTimelineProps, ITestCompletedItem, SubtopicsProps} from "../../types/types";
import {useAuth} from "../AuthContext/AuthContext";
import axios from "axios";
import axiosClient from "../../axios";
import Preloader from "../Preloader/Preloader";
import {UserContext} from "../MyProviders/MyProviders";


const HistoryTimeline: React.FC<IHistoryTimelineProps> = ({
                                                              historyList,
                                                              // handleExpandArticle,
                                                              buttonStates,
                                                              successLevels,
                                                              setSelectedArticle,
                                                              selectedArticle,
                                                              subArticleSuccessLevels,
                                                              setSelectedSubArticle,
                                                              isLoading
                                                          }) => {

    const theme = useTheme();

    const {currentUser} = useContext(UserContext)
    console.log("start HistoryTimeline");

    const [subTopicsArray, setSubTopicsArray] = useState<null | any>(null);


    const iconColorState = (active: boolean) => {
        if (active) return theme.palette.primary.contrastText
        else return theme.palette.primary.main
    }

    const navigate = useNavigate();

    const handleExpandArticle = (index: number) => {
        setSelectedArticle(index);
        // Перейти на сторінку з параметром
        navigate(`/article/${index}`);
    };

    const handleGoToTestNow = (articleIndex: number) => {
        // debugger
        navigate(`/test/${articleIndex}`);
        setSelectedArticle(articleIndex)
    }

    const handleGoToSubTestNow = (articleIndex: number, subArticleIndex: number) => {
        // debugger
        navigate(`/test/${articleIndex}/${subArticleIndex}`);
        setSelectedArticle(articleIndex)
        setSelectedSubArticle(subArticleIndex)
    }

    // const fetchDataSubTopicsArray = async (articleIndex: number) => {
    //     try {
    //         const response =
    //             await axiosClient.get(`/ep/subtopics/${articleIndex}/ `);
    //         setSubTopicsArray(response.data);
    //
    //
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //
    //     }
    // };

    useEffect(() => {
        if (historyList) {
            setSubTopicsArray(historyList[selectedArticle].subtopics)
        }

    }, [selectedArticle, historyList]);


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

// Інші місця, де потрібні зміни
    const getCompletedSubtopics = (articleIndex: number): number => {
        const article = historyList[articleIndex];
        if (!article || !article.subtopics) {
            return 0;
        }

        return article.subtopics.reduce((count, subtopic: SubtopicsProps) => {
            const tests_completed_list = currentUser?.tests_completed_list;

            // Ініціалізуємо testResult як undefined або тип ITestCompletedItem
            let testResult: ITestCompletedItem | undefined;

            if (tests_completed_list) {
                testResult = tests_completed_list.find(
                    (result: ITestCompletedItem) => result.test_id === subtopic.sub_article_test_id
                );
            }

            // Перевірка на undefined перед доступом до властивостей
            return testResult && testResult.completed ? count + 1 : count;
        }, 0);
    };

    useEffect(() => {
        if (subTopicsArray && subTopicsArray.length > 0) {
            // Find the index of the first uncompleted subarticle
            const firstUncompletedIndex = subTopicsArray.findIndex((subArticle: SubtopicsProps, subIndex: number) => {
                return !subArticleSuccessLevels[selectedArticle]?.[subIndex];
            });

            // If there is an uncompleted subarticle, navigate to its test page
            if (firstUncompletedIndex !== -1) {
                // handleGoToSubTestNow(selectedArticle, firstUncompletedIndex);
            } else {
                // handleGoToTestNow(selectedArticle);
            }
        }
    }, [subTopicsArray, subArticleSuccessLevels, selectedArticle, handleGoToSubTestNow, handleGoToTestNow]);

    const isAllSubtaskDone = (articleIndex: number): boolean => {
        const article = historyList[articleIndex];
        if (!article || !currentUser || !article.subtopics) {
            return false;
        }

        return article.subtopics.every(subtopic => {
            const testResult = currentUser.tests_completed_list.find(result => result.test_id === subtopic.sub_article_test_id);
            return testResult && testResult.completed;
        });
    };

    const getTotalSubtopics = (articleIndex: number) => {

        const article = historyList[articleIndex];
        return article && article.subtopics ? article.subtopics.length : 0;
    }

    // const getCompletedSubtopics = (articleIndex: number) => {
    //     const article = historyList[articleIndex];
    //
    //     const completed = article.subtopics?.reduce((acc, subtopic) => {
    //         const testResult = article.subtopics.tests_completed_list.find(result => result.test_id === subtopic.sub_article_test_id);
    //         if (testResult && testResult.completed) {
    //             acc += 1;
    //         }
    //         return acc;
    //     }, 0);
    //
    //     return completed;
    // }

    const {isAuthenticated} = useAuth();


    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");

        }
    }, [isAuthenticated])


    return (
        <Container className={"history_timeline_page"}>
            <Helmet>
                <title>Часопростір</title>
            </Helmet>
            <Typography className={"main_title"} textAlign={"center"} component={"h1"}
                        variant={"h3"}>Часопростір</Typography>
            <VerticalTimeline lineColor={theme.palette.primary.light}>
                {isLoading ? (
                        (<Preloader/>)
                    ) :
                    (historyList && historyList.length > 0)
                        ?
                        historyList.map((event, index) => (
                            <React.Fragment key={index + "TimelineCard"}>
                                <VerticalTimelineElement
                                    key={index + "history-timeline"}
                                    // date={event.date}
                                    dateClassName={"hidden"}
                                    className={successLevels === index ? "current_active_vertical_timeline_element" : ""}

                                    iconStyle={{
                                        background: theme.palette.primary.light,
                                        color: iconColorState(successLevels > index),
                                    }}
                                    contentStyle={{padding: 0, boxShadow: "none"}}
                                    icon={successLevels >= (index + 1) ? <CheckCircleOutlineIcon/> :
                                        <RadioButtonUncheckedRoundedIcon/>}

                                >
                                    <Card elevation={successLevels >= index ? 4 : 1}>
                                        <TimelineCard
                                            completedSubtopics={getCompletedSubtopics(index)}
                                            totalSubtopics={getTotalSubtopics(index)}
                                            isAllSubtaskDone={isAllSubtaskDone(index)}
                                            event={event}
                                            index={index}
                                            handleExpandArticle={handleExpandArticle}
                                            handleGoToSubArticleTest={handleGoToSubArticleTest}
                                            handleGoToTestNow={handleGoToTestNow}
                                            successLevel={successLevels}
                                        />
                                    </Card>
                                </VerticalTimelineElement>
                            </React.Fragment>


                        )) :
                        <div>data not found...</div>

                }
            </VerticalTimeline>


        </Container>);
};

export default HistoryTimeline;
