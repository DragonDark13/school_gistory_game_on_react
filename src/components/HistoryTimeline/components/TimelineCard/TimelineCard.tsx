// TimelineCard.tsx
import React from 'react';
import {
    Button,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Hidden,
    LinearProgress,
    Typography
} from '@mui/material';
import {useTheme} from '@mui/system';
import {HistoricalEvent} from "../../HistoryTimeline";
import myImage from '../../../../static/image/city.jpg';
import "./timeline_card.scss"


interface TimelineCardProps {
    event: HistoricalEvent;
    index: number;
    buttonState: boolean;
    handleExpandArticle: (index: number) => void;
    handleGoToTestNow: (index: number) => void;
    handleGoToSubArticleTest: (index: number) => void;
    successLevel: boolean;
    isAllSubtaskDone: boolean;
    totalSubtopics: number,
    completedSubtopics: number,
}

const TimelineCard: React.FC<TimelineCardProps> = ({
                                                       event,
                                                       index,
                                                       buttonState,
                                                       handleExpandArticle,
                                                       handleGoToTestNow,
                                                       handleGoToSubArticleTest,
                                                       successLevel,
                                                       isAllSubtaskDone,
                                                       totalSubtopics,
                                                       completedSubtopics
                                                   }) => {
    const theme = useTheme();

    const textColor = buttonState ? theme.palette.text.secondary : theme.palette.text.disabled;
    const completionPercentage = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;


    return (
        <React.Fragment>
            <CardHeader titleTypographyProps={{color: textColor}} title={event.date}/>
            <CardMedia
                className={!buttonState ? "imageOpacity" : ""}
                component="img"
                height="194"
                image={myImage}
                alt="city"
            />
            <Hidden smDown>
                <CardContent>
                    <Typography color={textColor} component={"div"}>
                        {event.text}
                    </Typography>
                </CardContent>
            </Hidden>
            <CardActions disableSpacing sx={{"flexWrap": "wrap"}}>
                <Button variant={"outlined"} color={"secondary"} size={"small"} sx={{mb: 1}} fullWidth
                        disabled={!buttonState}
                        className="learn-more-button" onClick={(e) => {
                    e.stopPropagation();
                    handleExpandArticle(index);
                }}>
                    Дізнатися більше
                </Button>

                {!successLevel && (isAllSubtaskDone ?

                        <Button size={"large"} variant={"contained"} fullWidth disabled={!buttonState}
                                className={"goToTest"} onClick={(e) => {
                            e.stopPropagation();
                            handleGoToTestNow(index);
                        }}
                        >
                            Завершити рівень
                        </Button>
                        :
                        <React.Fragment>
                            <div className="progress_bar_container">
                                <LinearProgress color={"primary"}
                                                variant="determinate"
                                                value={completionPercentage}/>

                                <Typography variant="body2" gutterBottom>
                                    Виконано: {completedSubtopics} із {totalSubtopics} ({completionPercentage.toFixed(2)}%)
                                </Typography>
                            </div>

                            <Button size={"large"} variant={"contained"} fullWidth disabled={!buttonState}
                                    className={"goToTest"} onClick={(e) => {
                                e.stopPropagation();
                                handleGoToSubArticleTest(index);
                            }}
                            >
                                Пройти завдання
                            </Button>
                        </React.Fragment>
                )
                }
            </CardActions>
        </React.Fragment>

    );
};

export default TimelineCard;
