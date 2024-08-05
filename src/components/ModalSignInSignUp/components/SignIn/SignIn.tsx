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
import {emailPattern, validateEmail, validatePassword, validateUsername} from "../../../../utils/utils";
import {Alert} from "@mui/material";

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
    const [error, setError] = useState<string | null>(null);


    const {cx, classes} = useStyles();


    const onLogInButtonClick = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailErrorState(false);
        setPasswordErrorState(false);

        // Валідація email
        if (!validateEmail(email, setEmailErrorText, setEmailErrorState)) return;

        // Валідація пароля
        if (!validatePassword(password, setPasswordErrorText, setPasswordErrorState)) return;


        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
        // Логін
        try {
            await login(email, password);
        } catch (error) {
            console.error('Login error:', error);
            // Додати обробку помилок для логіну
        }
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
                    {error && <Alert severity="error">{error}</Alert>}

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