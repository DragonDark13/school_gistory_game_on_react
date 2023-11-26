import {Paper, Typography} from "@mui/material";
import LogoIcon from "../../icon/Logo";
import React from "react";
import "./about.scss"
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({

    aboutLogoIcon: {
        color: theme.palette.secondary.dark,
        background:theme.palette.secondary.light,
        boxShadow:theme.shadows[5],
    },
}));


const AboutProject = () => {




    const {cx, classes} = useStyles();

    return (
        <div className={"about"}>
            <LogoIcon className={cx(classes.aboutLogoIcon, "about_logo")}/>
            <Typography className={"big_title"} component={"h1"} variant={"h3"}>
                Шкала Історіі
            </Typography>
            <Typography className={"subtitle"} variant={"h6"}>Грай та Навчайся</Typography>

            <Typography  >
                <Typography variant={"subtitle1"} component={"span"}>"Шкала Історіі: Грай та Навчайся"</Typography> - це інноваційний веб-додаток, спрямований на учнів, який робить
                процес вивчення історії захоплюючим та ефективним. Додаток пропонує вам:
            </Typography>


        </div>

    )


}

export default AboutProject;