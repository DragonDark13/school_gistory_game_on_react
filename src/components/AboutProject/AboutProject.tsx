import {Button, Typography} from "@mui/material";
import LogoIcon from "../../icon/Logo";
import React, {useEffect} from "react";
import "./about.scss"
import {makeStyles} from "tss-react/mui";
import {Link as RouterLink} from "react-router-dom";
import ModalSignInSignUp from "../ModalSignInSignUp/ModalSignInSignUp";
import {useAuth} from "../AuthContext/AuthContext";

const useStyles = makeStyles()((theme) => ({

    aboutLogoIcon: {
        color: theme.palette.secondary.dark,
        background: theme.palette.secondary.light,
        boxShadow: theme.shadows[5],
    },
}));

interface IAboutProject {
    handleClickOpenModalSignIn: () => void;
}


const AboutProject: React.FC<IAboutProject> = ({handleClickOpenModalSignIn}) => {

    const {cx, classes} = useStyles();

    const {isAuthenticated} = useAuth();

    const [openModal, setOpenModal] = React.useState(false);
    const [showSignInForm, setShowSignInForm] = React.useState(false)
    const [showSignUpForm, setShowSignUpForm] = React.useState(false)

    const handleClickOpenModal = () => {
        setOpenModal(true);
        setShowSignInForm(true);
    };


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            setOpenModal(false);
        }
    }, [isAuthenticated]);

    return (
        <div className={"about"}>
            <LogoIcon className={cx(classes.aboutLogoIcon, "about_logo")}/>
            <Typography className={"big_title"} component={"h1"} variant={"h3"}>
                Шкала Історіі
            </Typography>
            <Typography className={"subtitle"} variant={"h6"}>Грай та Навчайся</Typography>


            <Button className={"start_button"} onClick={handleClickOpenModalSignIn} fullWidth
                    size={"large"}
                    variant={"contained"}>Почати</Button>

            <Typography>
                <Typography variant={"subtitle1"} component={"span"}>"Шкала Історіі: Грай та Навчайся"</Typography> - це
                інноваційний веб-додаток, спрямований на учнів, який робить
                процес вивчення історії захоплюючим та ефективним. Додаток пропонує вам:
            </Typography>

        </div>

    )


}

export default AboutProject;