// QuizActions.tsx
import React from "react";
import {Button, Grid} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Link as RouterLink} from "react-router-dom";

const QuizActions: React.FC<{ handleRetakeQuiz: () => void, selectedArticleNumber: number, smUp: boolean }> = ({
                                                                                                                   handleRetakeQuiz,
                                                                                                                   selectedArticleNumber,
                                                                                                                   smUp
                                                                                                               }) => (
    <Grid flexDirection={smUp ? "row-reverse" : "row"} spacing={2} container justifyContent={"space-between"}>
        <Grid item xs={12} sm={"auto"}>
            <Button size={"large"} fullWidth endIcon={<ReplayIcon/>} variant={"contained"} onClick={handleRetakeQuiz}>Пройти
                ще раз</Button>
        </Grid>
        <Grid item xs={12} sm={"auto"}>
            <Button variant={"outlined"} color={"secondary"} size={"large"} fullWidth component={RouterLink}
                    to={`/article/${selectedArticleNumber}`} startIcon={<ArrowBackIosIcon/>}>
                До бібліотеки
            </Button>
        </Grid>
    </Grid>
);

export default QuizActions;
