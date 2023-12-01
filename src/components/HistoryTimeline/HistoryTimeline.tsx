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
import TimelineCard from "./TimelineCard";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";


export interface HistoricalEvent {
    date: string;
    text: string;
    achieved: string
}

interface HistoryTimelineProps {
    events: HistoricalEvent[];
    // handleExpandArticle: (index: number) => void;
    buttonStates: Array<boolean>;
    successLevels: Array<boolean>;
    handleGoToTestNow: (index: number) => void;
}


const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
                                                             events,
                                                             // handleExpandArticle,
                                                             buttonStates,
                                                             handleGoToTestNow,
                                                             successLevels
                                                         }) => {

    const theme = useTheme();

    const iconColorState = (active: boolean) => {
        if (active) return theme.palette.primary.contrastText
        else return theme.palette.primary.main
    }

    const navigate = useNavigate();

    const handleExpandArticle = (index: number) => {

        // Перейти на сторінку з параметром
        navigate(`/article/${index}`);
    };

    handleGoToTestNow = (index: number) => {
        navigate(`/test/${index}`);
    }


    return (
        <Container>
            <Helmet>
                <title>Часопростір</title>
            </Helmet>
            <Typography className={"main_title"} textAlign={"center"} component={"h1"}
                        variant={"h3"}>Часопростір</Typography>
            <VerticalTimeline lineColor={theme.palette.primary.light}>
                {events.map((event, index) => (
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
                                event={event}
                                index={index}
                                buttonState={buttonStates[index]}
                                handleExpandArticle={handleExpandArticle}
                                handleGoToTestNow={handleGoToTestNow}
                                successLevel={successLevels[index]}
                            />


                        </Card>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>


        </Container>);
};

export default HistoryTimeline;
