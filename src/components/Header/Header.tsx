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
    MenuItem
} from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Header: React.FC = (): React.ReactElement => {

    // const {theme, setTheme} = useContext(ThemeContext)
    const {language} = useContext(LanguageContext)

    const themeDefault = useTheme();
    const smUp = useMediaQuery(themeDefault.breakpoints.up('sm'));

    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<AppBar position="static">
        <Container>
            <Toolbar>
                {smUp && <WelcomePanel/>}


                <IconButton  onClick={colorMode.toggleColorMode} >
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

                <IconButton color="inherit" title={"Увійти"} >
                    <LoginIcon/>
                </IconButton>

                <IconButton color="inherit" title={"Профіль"}>
                    <AccountCircleIcon/>
                </IconButton>

                {/*<Button variant="contained">Увійти</Button>*/}
                {/*<Button variant="contained">Профіль</Button>*/}
            </Toolbar>
        </Container>
    </AppBar>)

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
