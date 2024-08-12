import {Button, Grid, Typography} from "@mui/material";
import LogoIcon from "../../icon/Logo";
import React, {useEffect} from "react";
import "./about.scss"
import {makeStyles} from "tss-react/mui";
import {useAuth} from "../AuthContext/AuthContext";
import {IHandleClickOpenModalSignIn} from "../../types/types";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles()((theme) => ({

    aboutLogoIcon: {
        color: theme.palette.secondary.dark,
        background: theme.palette.secondary.light,
        boxShadow: theme.shadows[5],
    },
}));

interface IAboutProject extends IHandleClickOpenModalSignIn {
}


const AboutProject: React.FC<IAboutProject> = ({handleClickOpenModalSignIn}) => {

    const {isAuthenticated} = useAuth();

    const navigate = useNavigate();

    const goToTimeline = () => {
        navigate("/timeline");
    }


    const {cx, classes} = useStyles();
    return (
        <div className={"about"}>
            <LogoIcon className={cx(classes.aboutLogoIcon, "about_logo")}/>
            <Typography className={"big_title"} component={"h1"} variant={"h3"}>
                Шкала ІсторіЇ
            </Typography>
            <Typography className={"subtitle"} variant={"h6"}>Грай та Навчайся</Typography>


            <Grid container justifyContent={"center"}>
                <Grid item xs={12} sm={9} md={6} xl={3}>
                    <Button
                        className={"start_button"} onClick={isAuthenticated ? goToTimeline : handleClickOpenModalSignIn}
                        fullWidth
                        size={"large"}
                        variant={"outlined"}>Почати
                        <span></span><span></span><span></span><span></span>
                    </Button>
                </Grid>
            </Grid>

            <Grid container justifyContent={"center"}>
                <Grid item xs={12} sm={9} md={6} xl={5}>
                    <Typography>
                        <Typography variant={"subtitle1"} component={"span"}>"Шкала Історіі: Грай та
                            Навчайся"</Typography> - це
                        інноваційний веб-додаток, спрямований на учнів, який робить
                        процес вивчення історії захоплюючим та ефективним. Додаток пропонує вам:
                    </Typography>
                </Grid>
            </Grid>

        </div>

    )


}

export default AboutProject;