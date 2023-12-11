import React from "react";
import {Button, Container, Grid, LinearProgress, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./article.scss"
import myImage from "../../static/image/city.jpg";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import SubtopicCard from "./components/SubtopicCard/SubtopicCard";
import {IArticleProps} from "../../types/types";
import {useTheme} from "@mui/system";


const Article: React.FC<IArticleProps> = ({historyList, setSelectedArticle, subArticleSuccessLevels}) => {
    const {selectedArticle} = useParams();

    const navigate = useNavigate();

    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);
    setSelectedArticle(selectedArticleNumber);

    const handleShowQuiz = () => {
        navigate(`/test/${selectedArticleNumber}`);
    }

    const article = historyList[selectedArticleNumber];


    const totalSubtopics = article.subtopics ? article.subtopics.length : 0;
    const completedSubtopics = subArticleSuccessLevels[selectedArticleNumber].filter(done => done).length;
    const completionPercentage = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;
    const finalTestIsNotOpen = article.subtopics !== undefined && !subArticleSuccessLevels[selectedArticleNumber].every(done => done);


    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Container className={"article_page_container"}>
            <Helmet>
                <title> {`Тема ${article.text}`}</title>
            </Helmet>
            <Grid className={"back_button_container"} container>
                <Grid item>
                    <Button component={RouterLink} to={"/timeline"} color={"secondary"} startIcon={<ArrowBackIosIcon/>}
                            className="close-button">
                        До Часопростору
                    </Button>
                </Grid>
            </Grid>


            <Typography className={"title"} variant={"h4"}>{article.text}</Typography>

            <img src={myImage} alt=""/>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>


            {/* Display subtopics as cards */}
            {(article.subtopics && article.subtopics.length === subArticleSuccessLevels[selectedArticleNumber].length) &&
            <Grid className={"subtopic_card_list"} container  justifyContent={"center"}>

                <Grid item xs={12} sm={6} md={6} xl={6}>
                    <Typography variant={"h6"}>Пройдіть додаткові завдання перед головним тестом</Typography>
                    {/* Display the progress bar */}
                </Grid>

                <Grid container justifyContent={"center"}>
                    <Grid item xs={12} sm={6} md={6} xl={4}>
                    <LinearProgress color={"primary"} variant="determinate" value={completionPercentage}/>

                    {/* Display the progress percentage */}
                    <Typography variant="body2" gutterBottom>
                        Виконано: {completedSubtopics} із {totalSubtopics} ({completionPercentage.toFixed(2)}%)
                    </Typography>

                </Grid></Grid>

                <Grid item container xs={12} spacing={2}>{article.subtopics.map((subtopic, index) => (
                    <Grid item key={index + "card"} xs={12} sm={6} md={4} xl={3}>
                        <SubtopicCard done={subArticleSuccessLevels[selectedArticleNumber][index]}
                                      subArticleIndex={index}
                                      title={subtopic.title} content={subtopic.content}/>
                    </Grid>
                ))}</Grid>
            </Grid>
            }


            <Grid container justifyContent={"center"}>
                <Grid item xs={12} sm={6} md={"auto"}>
                <Button

                disabled={finalTestIsNotOpen}
                size={"large"}
                fullWidth={!mdUp}
                variant={"contained"}
                className="quiz-button"
                onClick={handleShowQuiz}>
                Завершити рівень
            </Button></Grid></Grid>

        </Container>
    )

}

export default Article;