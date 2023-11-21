import React, {ReactNode, useContext, useState} from "react";
import {THeaderProps} from "./Header.types";
import {ColorModeContext, LanguageContext, ThemeContext, UserContext} from "../../App";
import {
    AppBar,
    Container,
    Toolbar,
    Button,
    useTheme,
    useMediaQuery,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Dialog, Slide
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useAuth} from "../AuthContext/AuthContext";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import {makeStyles} from 'tss-react/mui';
import MyAppBar from "../MyAppBar/MyAppBar";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles()((theme) => ({
    customAppBar: {
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.light,
        // Додайте інші глобальні стилі за вашими потребами
    },
}));

const Header: React.FC = (): React.ReactElement => {

    // const {theme, setTheme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const themeDefault = useTheme();
    const smUp = useMediaQuery(themeDefault.breakpoints.up('sm'));

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

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


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {cx, classes} = useStyles();


    return (<MyAppBar position={"static"} className={cx(classes.customAppBar)}>
        <Container>
            <Toolbar sx={{"justifyContent": "space-between"}}>
                {smUp && <WelcomePanel/>}


                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>


                {/*<label>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        checked={theme === 'dark'}*/}
                {/*        onChange={(e) => {*/}
                {/*            setTheme(e.target.checked ? 'dark' : 'light')*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    Use dark mode*/}
                {/*</label>*/}
                {/*{!smUp &&*/}
                {/*<p>language: {language}*/}
                {/*</p>}*/}

                {/*<Button*/}
                {/*    color="secondary"*/}
                {/*    id="basic-button"*/}
                {/*    aria-controls={open ? 'basic-menu' : undefined}*/}
                {/*    aria-haspopup="true"*/}
                {/*    aria-expanded={open ? 'true' : undefined}*/}
                {/*    onClick={handleClick}*/}
                {/*>*/}
                {/*    Dashboard*/}
                {/*</Button>*/}

                {/*<Menu*/}
                {/*    id="basic-menu"*/}
                {/*    anchorEl={anchorEl}*/}
                {/*    open={open}*/}
                {/*    onClose={handleClose}*/}
                {/*    MenuListProps={{*/}
                {/*        'aria-labelledby': 'basic-button',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                {/*    <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                {/*    <MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                {/*</Menu>*/}

                {isAuthenticated ?
                    <IconButton color="inherit" title={"Профіль"}>
                        <AccountCircleIcon/>
                    </IconButton> :
                    <IconButton onClick={handleClickOpenModal} color="inherit" title={"Увійти"}>
                        <LoginIcon/>
                    </IconButton>
                }

                <Dialog
                    fullScreen
                    open={openModal}
                    onClose={handleCloseModal}
                    TransitionComponent={Transition}
                >
                    <MyAppBar position={"static"}>
                        <Toolbar sx={{"justifyContent": "end"}}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleCloseModal}
                                aria-label="close"
                            >
                                <CloseIcon/>
                            </IconButton>
                        </Toolbar>
                    </MyAppBar>
                    {showSignInForm &&
                    <SignIn setShowSignUpForm={setShowSignUpForm} setShowSignInForm={setShowSignInForm}/>}
                    {showSignUpForm &&
                    <SignUp setShowSignInForm={setShowSignInForm} setShowSignUpForm={setShowSignUpForm}/>}

                </Dialog>


                {/*<Button variant="contained">Увійти</Button>*/}
                {/*<Button variant="contained">Профіль</Button>*/}
            </Toolbar>
        </Container>
    </MyAppBar>)

}


function WelcomePanel() {
    const {currentUser} = useContext(UserContext);

    return (
        <Panel title="Welcome">
            {currentUser !== null ? (
                <Greeting/>
            ) : (
                <LoginForm/>
            )}
        </Panel>
    );
}


function Greeting() {
    const {currentUser} = useContext(UserContext);
    if (currentUser !== null) {
        return (
            <p>You logged in as {currentUser.name}.</p>
        )
    } else {
        return null;
    }

}

function LoginForm() {
    const {setCurrentUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const canLogin = firstName !== '' && lastName !== '';
    return (
        <>
            <label>
                First name{': '}
                <input
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Last name{': '}
                <input
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
            </label>
            <Button
                disabled={!canLogin}
                onClick={() => {
                    setCurrentUser({
                        name: firstName + ' ' + lastName
                    });
                }}
            >
                Log in
            </Button>
            {!canLogin && <i>Fill in both fields.</i>}
        </>
    );
}

interface PanelProps {
    title: string;
    children: ReactNode;
}

interface ButtonProps {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

function Panel({title, children}: PanelProps) {
    const theme = useContext(ThemeContext);
    const className = 'panel-' + theme;
    return (
        <section className={className}>
            <h1>{title}</h1>
            {children}
        </section>
    );
}

// function Button({children, disabled, onClick}: ButtonProps) {
//     const theme = useContext(ThemeContext);
//     const className = 'button-' + theme;
//     return (
//         <button
//             className={className}
//             disabled={disabled}
//             onClick={onClick}
//         >
//             {children}
//         </button>
//     );
// }

function UserAchievementsList() {
    return (<ul>

    </ul>)
}

export default Header;
