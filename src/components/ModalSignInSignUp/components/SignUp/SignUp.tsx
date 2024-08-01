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


export default function SignUp({setShowSignInForm, setShowSignUpForm, goToHistoryTimeLine}: ISignInForms) {
    const {register, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [emailErrorState, setEmailErrorState] = useState<boolean>(false)
    const [emailErrorText, setEmailErrorText] = useState<string>("")
    const [allowExtraEmails, setAllowExtraEmails] = useState(false);


    const validateEmail = () => {
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


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEmailErrorState(false);

        if (!validateEmail()) return;

        if (!userName || !email || !password || !password2) {
            setError('All fields are required.');
            return;
        }

        if (password !== password2) {
            setError('Passwords do not match.');
            return;
        }

        if (!allowExtraEmails) {
            setError('You must agree to receive inspiration, marketing promotions, and updates via email.');
            return;
        }

        try {
            await register(email, password, userName);
            setSuccess('Registration successful.');
            setError(null);
        } catch (error) {
            setError(error.message || 'An error occurred');
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                {error && <Alert severity="error">{error}</Alert>}
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
        </Container>
    );
}