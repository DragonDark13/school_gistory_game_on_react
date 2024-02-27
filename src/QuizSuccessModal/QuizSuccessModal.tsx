import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";


interface IQuizSuccessModal {
    handleClose: ()=> void;
    openModal: boolean;
}

const QuizSuccessModal = ({openModal,handleClose}: IQuizSuccessModal) => {


    return (
        <Dialog open={openModal} onClose={handleClose}>
            <DialogTitle>Success!</DialogTitle>
            <DialogContent>
                <p>Congratulations! You've successfully completed the quiz.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={handleClose} color="primary">
                    Next
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuizSuccessModal;
