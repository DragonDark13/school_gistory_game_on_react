import React from "react";
import {Button, Container, Grid, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./article.scss"
import myImage from "../../static/image/city.jpg";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet-async";


interface ArticleProps {
    // selectedArticle: number | null,
    handleShowQuiz: () => void
    handleCloseArticle: () => void
}

const Article: React.FC<ArticleProps> = ({handleCloseArticle, handleShowQuiz}) => {
    const {selectedArticle} = useParams();
    console.log(typeof selectedArticle);

    const navigate = useNavigate();

    const selectedArticleNumber = parseInt(selectedArticle || '0', 10);
    console.log(typeof selectedArticleNumber);

    handleShowQuiz = () => {
        navigate(`/test/${selectedArticleNumber}`);
    }


    return (
        <Container>
            <Helmet>
                <title> {`Тема ${selectedArticleNumber}`}</title>
            </Helmet>
            <Grid className={"back_button_container"} container>
                <Grid item>
                    <Button component={RouterLink} to={"/timeline"} color={"secondary"} startIcon={<ArrowBackIosIcon/>}
                            className="close-button">
                        До Часопростору
                    </Button>
                </Grid>
            </Grid>


            <Typography className={"title"} variant={"h4"}>Тема {selectedArticleNumber}</Typography>

            <img src={myImage} alt=""/>
            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>


            <Button variant={"contained"} className="quiz-button" onClick={handleShowQuiz}>
                Пройти тест
            </Button>

        </Container>
    )

}

export default Article;