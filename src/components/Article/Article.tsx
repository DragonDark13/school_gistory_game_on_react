import React from "react";
import {Button, Container, Grid, LinearProgress, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./article.scss"
import myImage from "../../static/image/city.jpg";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {HistoricalEvent} from "../HistoryTimeline/HistoryTimeline";
import SubtopicCard from "../SubtopicCard/SubtopicCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


interface ArticleProps {
    historyList: HistoricalEvent[],
    setSelectedArticle: (arg0: number) => void;
    subArticleSuccessLevels: boolean[];

}

const Article: React.FC<ArticleProps> = ({historyList, setSelectedArticle, subArticleSuccessLevels}) => {
    const {selectedArticle} = useParams();

    const navigate = useNavigate();

    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);
    setSelectedArticle(selectedArticleNumber);

    const handleShowQuiz = () => {
        navigate(`/test/${selectedArticleNumber}`);
    }

    const article = historyList[selectedArticleNumber];

    console.log("subArticleSuccessLevels----->", subArticleSuccessLevels);


    const totalSubtopics = article.subtopics ? article.subtopics.length : 0;
    const completedSubtopics = subArticleSuccessLevels.filter(done => done).length;
    const completionPercentage = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;


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
            {(article.subtopics && article.subtopics.length === subArticleSuccessLevels.length) &&
            <Grid className={"subtopic_card_list"} container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h6"}>Пройдіть додаткові завдання перед головним тестом</Typography>
                    {/* Display the progress bar */}
                    <LinearProgress color={"primary"} variant="determinate" value={completionPercentage}/>

                    {/* Display the progress percentage */}
                    <Typography variant="body2" gutterBottom>
                        Виконано: {completedSubtopics} із {totalSubtopics} ({completionPercentage.toFixed(2)}%)
                    </Typography>
                </Grid>
                {article.subtopics.map((subtopic, index) => (
                    <Grid item key={index + "card"} xs={12} md={4}>
                        <SubtopicCard done={subArticleSuccessLevels[index]} subArticleIndex={index}
                                      title={subtopic.title} content={subtopic.content}/>
                    </Grid>
                ))}
            </Grid>
            }


            <Button disabled={article.subtopics !== undefined && !subArticleSuccessLevels.every(done => done)}
                    size={"large"} fullWidth variant={"contained"}
                    className="quiz-button"
                    onClick={handleShowQuiz}>
                Головний тест
            </Button>

        </Container>
    )

}

export default Article;