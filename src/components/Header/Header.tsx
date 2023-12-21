import React, { useContext} from "react";
import {
    Container,
    Toolbar,
    useTheme,
    useMediaQuery,
    IconButton,
    Typography,
    Link,

} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useAuth} from "../AuthContext/AuthContext";
import {makeStyles} from 'tss-react/mui';
import MyAppBar from "../MyAppBar/MyAppBar";
import LogoIcon from "../../icon/Logo"
import "./header.scss"
import Grid from "@mui/material/Grid";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {ColorModeContext, LanguageContext} from "../MyProviders/MyProviders";
import {IHandleClickOpenModalSignIn} from "../../types/types";
import ProfilePopper from "./ProfilePopper";


const useStyles = makeStyles()((theme) => ({
    customAppBar: {
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.light,
        // Додайте інші глобальні стилі за вашими потребами
    },

    headerLogoIcon: {
        color: theme.palette.background.default,
    },

    headerLogoText: {
        color: theme.palette.background.default,

        "& .first": {
            color: theme.palette.primary.dark,
        }
    }


}));

interface IHeader extends IHandleClickOpenModalSignIn {
}


const Header: React.FC<IHeader> = ({handleClickOpenModalSignIn}) => {

    // const {theme, setTheme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)
    console.log(language);
    const themeDefault = useTheme();
    const smUp = useMediaQuery(themeDefault.breakpoints.up('sm'));

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEl);

    let {isAuthenticated, logout} = useAuth();


    const {cx, classes} = useStyles();

    const navigate = useNavigate();


    const logoutOnClick = () => {
        logout()
        navigate("/");
    }

    const toggleColorModeFunc = () => {
        colorMode.toggleColorMode();
    }


    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openProfileMenu = Boolean(anchorEl);


    return (
        <React.Fragment>
            <MyAppBar position={"static"} className={cx(classes.customAppBar, "header")}>
                <Container>
                    <Toolbar disableGutters sx={{"justifyContent": "space-between"}}>

                        <Grid container justifyContent={"space-between"}>
                            <Grid item xs={"auto"}>
                                <Link component={RouterLink} underline={"none"} to="/">
                                <Grid gap={2} container alignItems={"center"}>
                                    <Grid item>
                                        <LogoIcon className={cx(classes.headerLogoIcon, "logo_icon")}/></Grid>
                                    <Grid item>
                                        <Typography className={cx(classes.headerLogoText)}
                                                    variant={"h5"}>
                                            <span className={"first"}>Вчись</span><span>Грай</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                            </Grid>
                            <Grid container item  xs={"auto"} alignItems={"center"}>
                                {!smUp &&
                                <IconButton onClick={toggleColorModeFunc}>
                                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                                </IconButton>
                                }
                                {isAuthenticated ?
                                    <React.Fragment>
                                        <div
                                            onMouseEnter={handlePopoverOpen}
                                            onMouseLeave={handlePopoverClose}
                                        >
                                            <RouterLink to={"/profile"}>
                                                <IconButton
                                                    className={cx(classes.headerLogoIcon)} title={"Профіль"}>
                                                    <AccountCircleIcon fontSize={smUp ? "large" : "medium"}/>
                                                </IconButton>


                                            </RouterLink>

                                            {smUp &&
                                            <ProfilePopper
                                                toggleColorModeFunc={toggleColorModeFunc}
                                                logoutOnClick={logoutOnClick}
                                                anchorEl={anchorEl}
                                                handlePopoverClose={handlePopoverClose}
                                                openProfileMenu={openProfileMenu}/>
                                            }

                                        </div>
                                        {!smUp &&
                                        <IconButton onClick={logoutOnClick} className={cx(classes.headerLogoIcon)}
                                                    title={"Вийти"}>
                                            <LogoutIcon/>
                                        </IconButton>}
                                    </React.Fragment>
                                    :
                                    <IconButton onClick={handleClickOpenModalSignIn}
                                                className={cx(classes.headerLogoIcon)}
                                                title={"Увійти"}>
                                        <LoginIcon/>
                                    </IconButton>
                                }
                            </Grid>
                        </Grid>


                        {/*<Button variant="contained">Увійти</Button>*/}
                        {/*<Button variant="contained">Профіль</Button>*/}
                    </Toolbar>
                </Container>
            </MyAppBar>


        </React.Fragment>)

}


export default Header;
