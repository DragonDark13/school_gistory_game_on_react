import React from "react";
import {Button, Typography} from "@mui/material";

interface ArticleProps {
    selectedArticle: number | null,
    handleShowQuiz: () => void
    handleCloseArticle: () => void
}

const Article: React.FC<ArticleProps> = ({handleCloseArticle, selectedArticle, handleShowQuiz}) => {

    return (<div>
            <Typography variant={"h3"}>Theme{selectedArticle}</Typography>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <Button variant={"contained"} className="quiz-button" onClick={handleShowQuiz}>
                Пройти тест
            </Button>
            <Button variant={"contained"} className="close-button" onClick={handleCloseArticle}>
                Закрити
            </Button>
        </div>
    )

}

export default Article;