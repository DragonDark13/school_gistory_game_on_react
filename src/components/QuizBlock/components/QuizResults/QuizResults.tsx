import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    LinearProgress,
    Typography,
    useTheme
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {Link as RouterLink} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {QuizResultsProps} from "../../../../types/types";

const QuizResults: React.FC<{ props: QuizResultsProps }> = ({props}) => {
    const {
        results,
        percentCompleted,
        nextLevelAvailable,
        handleRetakeQuiz,
        currentUser,
        selectedArticleNumber,
        historyList,
        testType,
    } = props;

    const resultIcon = (result: boolean) => {

        if (result) {
            return <CheckCircleIcon color={"success"}/>
        } else return <DoNotDisturbOnIcon color={"error"}/>

    }

    const theme = useTheme();


    return (
        <div className={"finished_container"}>
            <Typography className={"title"} variant={"h4"}>Ваші Результати:</Typography>
            <Grid container justifyContent={"center"}>
                <Grid item xs={12} sm={8} md={5}>
                    <Card className={"result_test_card"}>
                        <CardHeader title={`${results.correct}/${results.correct + results.incorrect}`}
                                    subheader={resultIcon(nextLevelAvailable)}/>
                        <CardContent>
                            <LinearProgress defaultValue={0} color={"success"} value={percentCompleted} variant={"determinate"}/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {nextLevelAvailable ? (
                <div>
                    <Grid className={"icon_container"} container justifyContent={"center"}>
                        <Grid item>
                            <StarIcon fontSize={"large"} color={"success"} className={"pulse"}/>
                        </Grid>
                    </Grid>

                    {testType === "article" && (
                        <Grid container justifyContent={"center"}>
                            <Grid item xs={12} md={6}>
                                <Card sx={{background: theme.palette.secondary.light}}>
                                    <CardContent>
                                        <Typography>Вітаю, <Typography component={"span"}
                                                                       variant={"subtitle1"}>{currentUser ? currentUser.user_name : "Невідомий"}</Typography>,
                                            ви досягли наступного рівня. Тепер ви можете відправитися у наступний пункт
                                            нашої подорожі у часі.</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button component={RouterLink} to={`/article/${selectedArticleNumber + 1}`}
                                                fullWidth startIcon={<ArrowForwardIosIcon/>} color={"secondary"}
                                                variant={"contained"} size={"large"}>
                                            {selectedArticleNumber ? historyList[selectedArticleNumber + 1].date : "Помилка у машині часу"}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    )}
                </div>
            ) : (
                <React.Fragment>
                    <Typography className={"textMessage"}>Не сумуйте. Підготуйтесь та спробуйте знову</Typography>
                    <Grid flexDirection={"row-reverse"} spacing={2} container justifyContent={"space-between"}>
                        <Grid item xs={12} sm={"auto"}>
                            <Button size={"large"} fullWidth endIcon={<ReplayIcon/>} variant={"contained"}
                                    onClick={handleRetakeQuiz}>Пройти ще раз</Button>
                        </Grid>
                        <Grid item xs={12} sm={"auto"}>
                            <Button variant={"outlined"} color={"secondary"} size={"large"} fullWidth
                                    component={RouterLink}
                                    to={`/article/${selectedArticleNumber}`} startIcon={<ArrowBackIosIcon/>}>
                                До бібліотеки
                            </Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            )}
        </div>
    )
};

export default QuizResults;
