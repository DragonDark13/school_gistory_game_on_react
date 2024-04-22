import 'react-vertical-timeline-component/style.min.css';
import './timeline-ovveriders.scss'
import {
    Card, Container, Typography,
    useTheme
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TimelineCard from "./components/TimelineCard/TimelineCard";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {IHistoryTimelineProps} from "../../types/types";
import {useAuth} from "../AuthContext/AuthContext";
import axios from "axios";
import axiosClient from "../../axios";
import Preloader from "../Preloader/Preloader";


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

    console.log("isLoading----",isLoading);

    const [subTopicsArray, setSubTopicsArray] = useState([]);


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
        navigate(`/test/${articleIndex}`);
        setSelectedArticle(articleIndex)
    }

    const handleGoToSubTestNow = (articleIndex: number, subArticleIndex: number) => {
        navigate(`/test/${articleIndex}/${subArticleIndex}`);
        setSelectedArticle(articleIndex)
        setSelectedSubArticle(subArticleIndex)
    }

    const fetchDataSubTopicsArray = async (articleIndex: number) => {
        try {
            const response =
                await axiosClient.get(`/ep/subtopics/${articleIndex}/ `);
            setSubTopicsArray(response.data);


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    };


    const handleGoToSubArticleTest = (articleIndex: number) => {
        // Check if the article has subarticles
        setSelectedArticle(articleIndex)
        fetchDataSubTopicsArray(articleIndex);
    };

    useEffect(() => {
        if (subTopicsArray && subTopicsArray.length > 0) {
            // Find the index of the first uncompleted subarticle
            const firstUncompletedIndex = subTopicsArray.findIndex((subArticle, subIndex) => {
                return !subArticleSuccessLevels[selectedArticle]?.[subIndex];
            });

            // If there is an uncompleted subarticle, navigate to its test page
            if (firstUncompletedIndex !== -1) {
                handleGoToSubTestNow(selectedArticle, firstUncompletedIndex);
            } else {
                handleGoToTestNow(selectedArticle);
            }
        }
    }, [subTopicsArray, subArticleSuccessLevels, selectedArticle, handleGoToSubTestNow, handleGoToTestNow]);

    const isAllSubtaskDone = (articleIndex: number) => {
        if (subTopicsArray.length > 0) {
            return !subTopicsArray ||
                (subTopicsArray.length > 0 &&
                    subTopicsArray.every(
                        (_, subIndex) => subArticleSuccessLevels[articleIndex]?.[subIndex]
                    ));

        } else return true;

    };

    const getTotalSubtopics = (articleIndex: number) => {

        return setSubTopicsArray ? setSubTopicsArray.length : 0;
    }

    const getCompletedSubtopics = (articleIndex: number) => {

        if (subArticleSuccessLevels.length > 0) {
            return subArticleSuccessLevels[articleIndex].filter(done => done).length;
        } else {
            return 0;
        }
    }

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
                                    className={buttonStates[index] && !successLevels[index] ? "current_active_vertical_timeline_element" : ""}

                                    iconStyle={{
                                        background: theme.palette.primary.light,
                                        color: iconColorState(buttonStates[index]),
                                    }}
                                    contentStyle={{padding: 0, boxShadow: "none"}}
                                    icon={successLevels[index] ? <CheckCircleOutlineIcon/> :
                                        <RadioButtonUncheckedRoundedIcon/>}

                                >
                                    <Card elevation={buttonStates[index] ? 4 : 1}>
                                        <TimelineCard
                                            completedSubtopics={getCompletedSubtopics(index)}
                                            totalSubtopics={getTotalSubtopics(index)}
                                            isAllSubtaskDone={isAllSubtaskDone(index)}
                                            event={event}
                                            index={index}
                                            buttonState={buttonStates[index]}
                                            handleExpandArticle={handleExpandArticle}
                                            handleGoToSubArticleTest={handleGoToSubArticleTest}
                                            handleGoToTestNow={handleGoToTestNow}
                                            successLevel={successLevels[index]}
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
