import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dialog, IconButton, Slide, Toolbar, useMediaQuery} from "@mui/material";
import MyAppBar from "../MyAppBar/MyAppBar";
import CloseIcon from "@mui/icons-material/Close";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {TransitionProps} from "@mui/material/transitions";
import {useAuth} from "../AuthContext/AuthContext";
import {IModalSignInSignUp} from "../../types/types";
import {useTheme} from "@mui/system";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ModalSignInSignUp = ({
                               setOpenModal,
                               openModal,
                               handleCloseModal,
                               showSignInForm,
                               showSignUpForm,
                               setShowSignUpForm,
                               setShowSignInForm,
                               goToHistoryTimeLine
                           }: IModalSignInSignUp) => {

    const {isAuthenticated} = useAuth();


    useEffect(() => {
        if (isAuthenticated) {
            setOpenModal(false);
        }
    }, [isAuthenticated]);


    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const toolbar = <Toolbar sx={{"justifyContent": "end"}}>
        <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
        >
            <CloseIcon/>
        </IconButton>
    </Toolbar>;

    return (
        <Dialog
            fullScreen={!smUp}
            open={openModal}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
        >

            {!smUp ?
                <MyAppBar position={"static"}>
                    {toolbar}
                </MyAppBar>
                :
                <React.Fragment>
                    {toolbar}
                </React.Fragment>
            }


            {showSignInForm &&
            <SignIn goToHistoryTimeLine={goToHistoryTimeLine} setShowSignUpForm={setShowSignUpForm}
                    setShowSignInForm={setShowSignInForm}/>}
            {showSignUpForm &&
            <SignUp goToHistoryTimeLine={goToHistoryTimeLine} setShowSignInForm={setShowSignInForm}
                    setShowSignUpForm={setShowSignUpForm}/>}

        </Dialog>

    );
}

export default ModalSignInSignUp;