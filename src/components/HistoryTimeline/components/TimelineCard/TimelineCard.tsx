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
import myImage from '../../../../static/image/city.jpg';
import "./timeline_card.scss"
import {ITimelineCardProps} from "../../../../types/types";


const TimelineCard: React.FC<ITimelineCardProps> = ({
                                                        event,
                                                        index,
                                                        handleExpandArticle,
                                                        handleGoToTestNow,
                                                        handleGoToSubArticleTest,
                                                        successLevel,
                                                        isAllSubtaskDone,
                                                        totalSubtopics,
                                                        completedSubtopics
                                                    }) => {
    const theme = useTheme();
    // console.log("isAllSubtaskDone",isAllSubtaskDone);

    const notActiveCard = successLevel < index;

    const textColor = !notActiveCard ? theme.palette.text.primary : theme.palette.text.disabled;
    const completionPercentage = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;



    return (
        <React.Fragment>
            <CardHeader titleTypographyProps={{color: textColor}} title={event.date}/>
            <CardMedia
                className={notActiveCard ? "imageOpacity" : ""}
                component="img"
                height="194"
                image={myImage}
                alt="city"
            />
                <CardContent>
                    <Typography color={textColor} component={"div"}>
                        {event.text}
                    </Typography>
                </CardContent>
            <CardActions disableSpacing sx={{"flexWrap": "wrap"}}>
                <Button variant={"outlined"} color={"secondary"} size={"small"} sx={{mb: 1}} fullWidth
                        disabled={notActiveCard}
                        className="learn-more-button" onClick={(e) => {
                    e.stopPropagation();
                    handleExpandArticle(index);
                }}>
                    Дізнатися більше
                </Button>

                {(successLevel === index) && (isAllSubtaskDone ?

                        <Button size={"large"} variant={"contained"} fullWidth disabled={notActiveCard}
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

                            <Button size={"large"} variant={"contained"} fullWidth
                                    className={"goToTest"} onClick={(e) => {
                                e.stopPropagation();
                                handleGoToSubArticleTest(index );
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
