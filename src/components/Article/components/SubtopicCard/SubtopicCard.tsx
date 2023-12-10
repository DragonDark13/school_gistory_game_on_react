import React from 'react';
import {
    Button, ButtonProps,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CardProps,
    Collapse,
    IconButton,
    IconButtonProps,
    styled,
    Typography
} from '@mui/material';
import myImage from "../../../../static/image/city.jpg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./subtopics_card.scss"

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {useNavigate, useParams} from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';


interface SubtopicCardProps {
    subArticleIndex: number;
    title: string,
    content: string,
    done: boolean,
}


const SubtopicCard = ({content, title, subArticleIndex, done}: SubtopicCardProps) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const {selectedArticle} = useParams();
    const navigate = useNavigate();

    // Your logic to extract subtopics from historyList based on selectedArticle

    const handleGoToTest = () => {
        // Navigate to the test page with the selectedArticle parameter

        navigate(`/test/${selectedArticle}/${subArticleIndex}`);
    };
    return (
        <Card elevation={done ? 6 : 0} className={"subtopics_card"}>

            <CardHeader

                avatar={done ? <CheckIcon/> : <QuestionMarkIcon/>}
                titleTypographyProps={{
                    variant: "h5",
                }}
                title={title}
            />
            <CardMedia
                component="img"
                image={myImage}
                alt="myImage"
            />

            {!expanded && !done && <CardActions disableSpacing>

                <Button color={"secondary"} onClick={handleExpandClick}
                        endIcon={<ExpandMoreIcon/>}
                        aria-expanded={expanded} size={"small"} fullWidth variant={"contained"}
                        className="learn-more-button">
                    Дізнатися більше
                </Button>
            </CardActions>}

            {!done
            &&
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>{content}</Typography>
                </CardContent>
            </Collapse>
            }


            {expanded && <CardActions disableSpacing>

                <Button onClick={handleExpandClick}
                        endIcon={<ExpandLessIcon/>}
                        color={"secondary"}
                        aria-expanded={expanded} size={"small"} fullWidth variant={"contained"}
                        className="learn-more-button">
                    Згорнути
                </Button>
            </CardActions>}


            {!done ? <CardActions disableSpacing>
                    <Button onClick={handleGoToTest} endIcon={<ArrowForwardIosIcon/>} color={"secondary"} size={"small"}
                            fullWidth
                            variant={"outlined"}
                            className={"goToTest"}
                    >
                        Пройти тест
                    </Button>
                </CardActions> : null
                // <CardContent>
                //     <Typography>Ви вже пройшли це завдання</Typography>
                // </CardContent>

            }


        </Card>
    );
};

export default SubtopicCard;
