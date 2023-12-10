import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dialog, IconButton, Slide, Toolbar} from "@mui/material";
import MyAppBar from "../MyAppBar/MyAppBar";
import CloseIcon from "@mui/icons-material/Close";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {TransitionProps} from "@mui/material/transitions";
import {useAuth} from "../AuthContext/AuthContext";
import {IModalSignInSignUp} from "../../types/types";

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

    return (
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
            <SignIn goToHistoryTimeLine={goToHistoryTimeLine} setShowSignUpForm={setShowSignUpForm} setShowSignInForm={setShowSignInForm}/>}
            {showSignUpForm &&
            <SignUp setShowSignInForm={setShowSignInForm} setShowSignUpForm={setShowSignUpForm}/>}

        </Dialog>

    );
}

export default ModalSignInSignUp;