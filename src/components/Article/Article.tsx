import React, {useEffect, useState} from "react";
import {Button, Container, Grid, LinearProgress, Typography, useMediaQuery} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./article.scss"
import myImage from "../../static/image/city.jpg";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import SubtopicCard from "./components/SubtopicCard/SubtopicCard";
import {IArticleContentArrayItem, IArticleProps} from "../../types/types";
import {useTheme} from "@mui/system";
import {useAuth} from "../AuthContext/AuthContext";
import {contentRenderFunction} from "../../utils/utils";
import axios from "axios";


const Article: React.FC<IArticleProps> = ({
                                              historyList,
                                              setSelectedArticle,
                                              subArticleSuccessLevels,
                                              setSelectedSubArticle
                                          }) => {
    const {selectedArticle} = useParams();
    const [currentArticleContent, setCurrentArticleContent] = useState<null | IArticleContentArrayItem[]>(null);
    const [subTopicsArray, setSubTopicsArray] = useState([]);

    const navigate = useNavigate();

    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);

    useEffect(() => {

        if (selectedArticleNumber) {
            setSelectedArticle(selectedArticleNumber);
        }

    }, [selectedArticleNumber])

    const handleShowQuiz = () => {
        navigate(`/test/${selectedArticleNumber}`);
    }

    const article = historyList[selectedArticleNumber];


    const totalSubtopics = article.subtopics ? article.subtopics.length : 0;
    const completedSubtopics = subArticleSuccessLevels.length > 0 ? subArticleSuccessLevels[selectedArticleNumber].filter(done => done).length : 0;
    const completionPercentage = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;
    const finalTestIsNotOpen = article.subtopics !== undefined && !subArticleSuccessLevels[selectedArticleNumber].every(done => done);


    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const {isAuthenticated} = useAuth();


    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");

        }
    }, [isAuthenticated])

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


    useEffect(() => {
        const fetchDataArticleContent = async () => {
            try {
                const response = await
                    axios.get(`https://zelse.asuscomm.com/SchoolHistoryGame/ep/maincontent/${selectedArticleNumber}/`);
                setCurrentArticleContent(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchDataSubTopicsArray = async () => {
            try {
                const response =
                    await axios.get(`https://zelse.asuscomm.com/SchoolHistoryGame/ep/subtwithcontent/${selectedArticleNumber}`);
                setSubTopicsArray(response.data.subtopics);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (selectedArticleNumber && currentArticleContent === null) {
            fetchDataArticleContent();
        }

        if (selectedArticleNumber && subTopicsArray.length === 0) {
            fetchDataSubTopicsArray();
        }

    }, [selectedArticleNumber]);


    console.log("subTopicsArray:::", subTopicsArray);

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

            <Typography textAlign={"center"} variant={"h6"} className={"lesson"}>Lesson</Typography>
            <Typography textAlign={"center"} className={"date"} variant={"h5"}>{article.date}</Typography>

            <Typography textAlign={"center"} className={"title"} variant={"h4"}>{article.text}</Typography>

            <Grid container justifyContent={"center"}>
                <Grid item xs={"auto"}>
                    <Button className={"start_button_top"}
                            onClick={() => handleGoToSubArticleTest(selectedArticleNumber)} variant={"contained"}>Start
                        Tests</Button>
                </Grid>
            </Grid>

            <img src={myImage} alt=""/>
            <div
                className={"content_container"}>{currentArticleContent && contentRenderFunction(currentArticleContent)}</div>


            {/* Display subtopics as cards */}
            {(subTopicsArray.length > 0) &&
            <Grid className={"subtopic_card_list"} container justifyContent={"center"}>

                <Grid item xs={12} sm={6} md={6} xl={6}>
                    <Typography variant={"h6"}>Пройдіть додаткові завдання перед головним тестом</Typography>
                    {/* Display the progress bar */}
                </Grid>

                <Grid className={"additional_test_progress_container"} container justifyContent={"center"}>
                    <Grid item xs={12} sm={6} md={6} xl={4}>
                        <LinearProgress color={"primary"} variant="determinate" value={completionPercentage}/>

                        {/* Display the progress percentage */}
                        <Typography variant="body2" gutterBottom>
                            Виконано: {completedSubtopics} із {totalSubtopics} ({completionPercentage.toFixed(2)}%)
                        </Typography>

                    </Grid>
                </Grid>

                <Grid item container xs={12} spacing={2}>
                    {subTopicsArray.map((subtopic, index) => (
                    <Grid item key={index + "card"} xs={12} sm={6} md={4} xl={3}>
                        <SubtopicCard done={subArticleSuccessLevels.length>0 ? subArticleSuccessLevels[selectedArticleNumber][index] : 0}
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