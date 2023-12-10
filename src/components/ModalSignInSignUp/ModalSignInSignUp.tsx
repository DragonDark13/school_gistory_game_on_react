import React from 'react';
import PropTypes from 'prop-types';
import {Dialog, IconButton, Slide, Toolbar} from "@mui/material";
import MyAppBar from "../MyAppBar/MyAppBar";
import CloseIcon from "@mui/icons-material/Close";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {TransitionProps} from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


interface IModalSignInSignUp {
    openModal: boolean
    handleCloseModal: () => void
    showSignInForm: boolean
    showSignUpForm: boolean
    setShowSignInForm: (value: boolean) => void;
    setShowSignUpForm: (value: boolean) => void;
}


const ModalSignInSignUp = ({
                               openModal,
                               handleCloseModal,
                               showSignInForm,
                               showSignUpForm,
                               setShowSignUpForm,
                               setShowSignInForm
                           }: IModalSignInSignUp) => {
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
            <SignIn setShowSignUpForm={setShowSignUpForm} setShowSignInForm={setShowSignInForm}/>}
            {showSignUpForm &&
            <SignUp setShowSignInForm={setShowSignInForm} setShowSignUpForm={setShowSignUpForm}/>}

        </Dialog>

    );
}

export default ModalSignInSignUp;