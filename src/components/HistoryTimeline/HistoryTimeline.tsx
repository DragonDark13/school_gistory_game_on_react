import {Button, Card, CardActions, CardContent, CardHeader, Typography, TypographyVariantsOptions} from '@mui/material';
import React, {useState} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

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


    return (
        <div>
            <h1>History Timeline</h1>
            <VerticalTimeline>
                {events.map((event, index) => (
                    <VerticalTimelineElement
                        key={index + "history-timeline"}
                        date={event.date}
                        iconStyle={{background: '#007BFF', color: '#fff'}}
                    >
                        <Card>
                            <CardHeader title={event.date}/>
                            {/*<h3 className="vertical-timeline-element-title">{event.date}</h3>*/}
                            <CardContent>
                                <Typography>
                                    {event.text}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                            <Button variant={"contained"}
                                disabled={!buttonStates[index]} className="learn-more-button"
                                    onClick={() => handleExpandArticle(index)}>
                                Дізнатися більше
                            </Button>
                            <Button variant={"contained"} disabled={!buttonStates[index]} className={"goToTest"}
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
