// TimelineCard.tsx
import React from 'react';
import {Button, CardActions, CardContent, CardHeader, CardMedia, Hidden, Typography} from '@mui/material';
import {useTheme} from '@mui/system';
import {HistoricalEvent} from "./HistoryTimeline";
import myImage from '../../static/image/city.jpg';


interface TimelineCardProps {
    event: HistoricalEvent;
    index: number;
    buttonState: boolean;
    handleExpandArticle: (index: number) => void;
    handleGoToTestNow: (index: number) => void;
    successLevel: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
                                                       event,
                                                       index,
                                                       buttonState,
                                                       handleExpandArticle,
                                                       handleGoToTestNow,
                                                       successLevel
                                                   }) => {
    const theme = useTheme();

    const textColor = buttonState ? theme.palette.text.secondary : theme.palette.text.disabled;




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
                <Button sx={{mb: 1}} size={"large"} fullWidth variant={"contained"} disabled={!buttonState}
                        className="learn-more-button" onClick={(e) => {
                    e.stopPropagation();
                    handleExpandArticle(index);
                }}>
                    Дізнатися більше
                </Button>
                <Button color={"secondary"} size={"small"} fullWidth variant={"outlined"} disabled={!buttonState}
                        className={"goToTest"} onClick={(e) => {
                    e.stopPropagation();
                    handleGoToTestNow(index);
                }}
                >
                    Пройти тест
                </Button>
            </CardActions>
        </React.Fragment>

    );
};

export default TimelineCard;
