import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useAuth} from "../../../AuthContext/AuthContext";
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ISignInForms} from "../../../../types/types";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({

    signInContainer: {
        marginTop: "8rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            marginTop: "1rem",
            paddingBottom: "1rem",
        },
    }

}))


export default function SignIn({setShowSignInForm, setShowSignUpForm, goToHistoryTimeLine}: ISignInForms) {

    const gotoSignUp = () => {
        setShowSignInForm(false)
        setShowSignUpForm(true)
    }

    const navigate = useNavigate();

    const {login, isAuthenticated} = useAuth();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [emailErrorState, setEmailErrorState] = useState<boolean>(false)
    const [emailErrorText, setEmailErrorText] = useState<string>("")
    const [passwordErrorState, setPasswordErrorState] = useState<boolean>(false)
    const [passwordErrorText, setPasswordErrorText] = useState<string>("")

    const {cx, classes} = useStyles();


    const validateEmail = () => {
        // Email validation logic
        // Check if the user has entered both fields correctly
        if ("" === email || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailErrorState(true)
        }

        if ("" === email) {
            setEmailErrorText("Please enter your email")
            return false
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailErrorText("Please enter a valid email")
            return false
        }

        return true
    };

    const validatePassword = () => {
        // Password validation logic
        if ("" === password || password.length < 7) {
            setPasswordErrorState(true)
        }

        if ("" === password) {
            setPasswordErrorText("Please enter a password")
            return false
        }

        if (password.length < 7) {
            setPasswordErrorText("The password must be 8 characters or longer")
            return false
        }

        return true

    };

    const onLogInButtonClick =  async (e: React.FormEvent) =>{
        e.preventDefault();
        setEmailErrorState(false);
        setPasswordErrorState(false);

        if (!validateEmail()) return;
        if (!validatePassword()) return;

        await login(email, password);
    };

    useEffect(() => {
        if (isAuthenticated) {
            setShowSignInForm(false)

            if (!goToHistoryTimeLine) {
                navigate("/profile");
            } else {
                navigate("/timeline");
            }
        }
    }, [isAuthenticated, navigate]);


    return (
        <Container component="main" maxWidth="xs">
            <Box
                className={cx(classes.signInContainer)}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        error={emailErrorState}
                        helperText={emailErrorState && emailErrorText}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={({target: {value}}) => setEmail(value)}
                    />
                    <TextField
                        margin="normal"
                        error={passwordErrorState}
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={passwordErrorState && passwordErrorText}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={onLogInButtonClick}
                        sx={{mt: 3, mb: 1}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs={12}>
                            <Button color={"secondary"} sx={{mt: 1, mb: 1}} fullWidth variant={"contained"}>
                                Forgot password?
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color={"secondary"} onClick={gotoSignUp} sx={{mt: 1, mb: 1}} fullWidth
                                    variant={"contained"}>
                                {"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}