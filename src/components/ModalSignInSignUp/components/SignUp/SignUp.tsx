import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ISignInForms} from "../../../../types/types";
import {useEffect, useState} from "react";
import axiosClient from "../../../../axios";
import {Alert} from "@mui/material";
import {useAuth} from "../../../AuthContext/AuthContext";
import {useNavigate} from "react-router-dom";
import {validateEmail, validatePassword,  validateUsername} from "../../../../utils/utils";


export default function SignUp({setShowSignInForm, setShowSignUpForm, goToHistoryTimeLine}: ISignInForms) {
    const {register, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userName, setUserName] = useState('');
    const [errorText, setErrorText] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [emailErrorState, setEmailErrorState] = useState<boolean>(false)
    const [emailErrorText, setEmailErrorText] = useState<string>("")
    const [allowExtraEmails, setAllowExtraEmails] = useState(false);
    const [passwordErrorState, setPasswordErrorState] = useState<boolean>(false);
    const [passwordErrorText, setPasswordErrorText] = useState<string>('');
    const [userNameErrorState, setUserNameErrorState] = useState<boolean>(false);
    const [userNameErrorText, setUserNameErrorText] = useState<string>('');



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmailErrorState(false);
        setPasswordErrorState(false);
        setUserNameErrorState(false); // Додано для перевірки імені користувача

        if (!validateEmail(email, setEmailErrorText, setEmailErrorState)) return;

        if (!validateUsername(userName, setUserNameErrorText, setUserNameErrorState)) return;

        if (!userName || !email || !password || !password2) {
            setErrorText('All fields are required.');
            return;
        }

        if (!validatePassword(password, setPasswordErrorText, setPasswordErrorState)) return;



        if (password !== password2) {
            setErrorText('Passwords do not match.');
            return;
        }

        if (!allowExtraEmails) {
            setErrorText('You must agree to receive inspiration, marketing promotions, and updates via email.');
            return;
        }

        try {
            await register(email, password, userName);
            console.log('Registration successful.');
            setSuccess('Registration successful.');
            setErrorText(null);
        } catch (error) {
            if (error instanceof Error) {
                setErrorText(error.message || 'An errorText occurred');
            } else {
                setErrorText('An unexpected errorText occurred');
            }
            setSuccess(null);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            setShowSignUpForm(false)

            if (!goToHistoryTimeLine) {
                navigate("/profile");
            } else {
                navigate("/timeline");
            }
        }
    }, [isAuthenticated, navigate]);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    {errorText && <Alert severity="error">{errorText}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="given-name"
                                name="userName"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                autoFocus
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                error={userNameErrorState}
                                helperText={userNameErrorState && userNameErrorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={emailErrorState}
                                helperText={emailErrorState && emailErrorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={passwordErrorState}
                                helperText={passwordErrorState && passwordErrorText}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password2"
                                label="Repeat Password"
                                type="password"
                                id="password2"
                                autoComplete="new-password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                error={passwordErrorState}
                                helperText={passwordErrorState && passwordErrorText}
                            />

                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                required={true}
                                control={<Checkbox checked={allowExtraEmails}
                                                   onChange={(e) => setAllowExtraEmails(e.target.checked)}
                                                   value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 1}}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}