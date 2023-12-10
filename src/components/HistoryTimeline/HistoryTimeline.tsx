import 'react-vertical-timeline-component/style.min.css';
import './timeline-ovveriders.scss'
import {
    Card, CardActionArea, Container, Typography,
    useTheme
} from '@mui/material';
import React from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TimelineCard from "../TimelineCard/TimelineCard";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";

export interface SubtopicsProps {
    title: string,
    content: string
}

export interface HistoricalEvent {
    date: string;
    text: string;
    achieved: string
    subtopics?: SubtopicsProps[] | undefined;
}


interface HistoryTimelineProps {
    historyList: HistoricalEvent[];
    // handleExpandArticle: (index: number) => void;
    buttonStates: Array<boolean>;
    successLevels: Array<boolean>;
    setSelectedArticle: (arg0: number) => void;
    subArticleSuccessLevels: boolean[][]
    setSelectedSubArticle: (arg0: number) => void;

}


const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
                                                             historyList,
                                                             // handleExpandArticle,
                                                             buttonStates,
                                                             successLevels,
                                                             setSelectedArticle,
                                                             subArticleSuccessLevels,
                                                             setSelectedSubArticle
                                                         }) => {

    const theme = useTheme();

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


    const handleGoToSubArticleTest = (articleIndex: number) => {
        // Check if the article has subarticles
        const subArticles = historyList[articleIndex]?.subtopics;
        if (subArticles && subArticles.length > 0) {
            // Find the index of the first uncompleted subarticle
            const firstUncompletedIndex = subArticles.findIndex((subArticle, subIndex) => {
                return !subArticleSuccessLevels[articleIndex]?.[subIndex];
            });

            // If there is an uncompleted subarticle, navigate to its test page
            if (firstUncompletedIndex !== -1) {
                handleGoToSubTestNow(articleIndex, firstUncompletedIndex);
            } else {
                handleGoToTestNow(articleIndex);
            }
        }
    };

    const isAllSubtaskDone = (articleIndex: number) => {
        if (historyList[articleIndex].subtopics !== undefined) {
            const subArticles = historyList[articleIndex]?.subtopics;
            return !subArticles ||
                (subArticles.length > 0 &&
                    subArticles.every(
                        (_, subIndex) => subArticleSuccessLevels[articleIndex]?.[subIndex]
                    ));

        } else return true;

    };

    const getTotalSubtopics = (articleIndex: number) => {
        const article = historyList[articleIndex];
        return article.subtopics ? article.subtopics.length : 0;
    }

    const getCompletedSubtopics = (articleIndex: number) => {
        const article = historyList[articleIndex];
        return subArticleSuccessLevels[articleIndex].filter(done => done).length;
    }


    return (
        <Container>
            <Helmet>
                <title>Часопростір</title>
            </Helmet>
            <Typography className={"main_title"} textAlign={"center"} component={"h1"}
                        variant={"h3"}>Часопростір</Typography>
            <VerticalTimeline lineColor={theme.palette.primary.light}>
                {historyList.map((event, index) => (
                    <React.Fragment key={index + "TimelineCard"}>
                        <VerticalTimelineElement
                            key={index + "history-timeline"}
                            // date={event.date}
                            dateClassName={"hidden"}

                            iconStyle={{
                                background: theme.palette.primary.light,
                                color: iconColorState(buttonStates[index]),

                            }}
                            contentStyle={{padding: 0, boxShadow: "none"}}
                            icon={successLevels[index] ? <CheckCircleOutlineIcon/> : <RadioButtonUncheckedRoundedIcon/>}

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


                ))}
            </VerticalTimeline>


        </Container>);
};

export default HistoryTimeline;
