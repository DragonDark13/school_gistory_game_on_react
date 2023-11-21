import 'react-vertical-timeline-component/style.min.css';
import './timeline-ovveriders.scss'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, makeStyles,
    styled,
    Typography,
    TypographyVariantsOptions,
    useTheme
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {tss} from "tss-react";


export interface HistoricalEvent {
    date: string;
    text: string;
}

interface HistoryTimelineProps {
    events: HistoricalEvent[];
    handleExpandArticle: (index: number) => void;
    buttonStates: Array<boolean>;
    handleGoToTestNow: (index: number) => void;
}



const HistoryTimeline: React.FC<HistoryTimelineProps> = ({
                                                             events,
                                                             handleExpandArticle,
                                                             buttonStates,
                                                             handleGoToTestNow
                                                         }) => {

    const theme = useTheme();

    const iconColorState=(active:boolean)=>{

        if (active) return theme.palette.primary.contrastText
        else return theme.palette.primary.main

    }
    const textColorState=(active:boolean)=>{

        if (active) return theme.palette.text.secondary
        else return theme.palette.text.disabled

    }




    return (
        <div>
            <h1>History Timeline</h1>
            <VerticalTimeline lineColor={theme.palette.primary.light}>
                {events.map((event, index) => (
                    <VerticalTimelineElement
                        key={index + "history-timeline"}
                        // date={event.date}
                        dateClassName={"hidden"}

                        iconStyle={{background: theme.palette.primary.light,
                            color: iconColorState(buttonStates[index]),

                        }}
                        contentStyle={{padding: 0, boxShadow: "none"}}
                      icon={<CheckCircleOutlineIcon />}

                    >
                        <Card elevation={ buttonStates[index] ? 4 : 1}>
                            <CardHeader titleTypographyProps={{
                                color: textColorState(buttonStates[index])
                            }}  title={event.date} />
                            {/*<h3 className="vertical-timeline-element-title">{event.date}</h3>*/}
                            <CardContent>
                                <Typography  color={textColorState(buttonStates[index])} component={"div"}>
                                    {event.text}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing sx={{"flexWrap": "wrap"}}>
                                <Button sx={{mb: 1}} size={"small"} fullWidth variant={"contained"}
                                        disabled={!buttonStates[index]} className="learn-more-button"
                                        onClick={() => handleExpandArticle(index)}>
                                    Дізнатися більше
                                </Button>
                                <Button color={"secondary"} size={"small"} fullWidth variant={"contained"}
                                        disabled={!buttonStates[index]}
                                        className={"goToTest"}
                                        onClick={() => handleGoToTestNow(index)}>Пройти тест
                                </Button
                                >
                            </CardActions>
                        </Card>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>


        </div>);
};

export default HistoryTimeline;
