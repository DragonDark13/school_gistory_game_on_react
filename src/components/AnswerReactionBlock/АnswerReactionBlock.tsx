import React from 'react';
import {Grid, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


  const phrasesSucess = [
        "Well done!",
        "Excellent job!",
        "Congratulations!",
        "Bravo!",
        "Fantastic!"
    ];

    const phrasesError = [
        "Incorrect.",
        "Wrong answer.",
        "Try again.",
        "Not quite.",
        "That's incorrect."
    ]

interface IAnswerReactionBlock {
    currentAnswerStatus:boolean
}


const AnswerReactionBlock =({currentAnswerStatus}:IAnswerReactionBlock) => {
    console.log("currentAnswerStatus",currentAnswerStatus);
    const successPhrase = phrasesSucess[Math.floor(Math.random() * phrasesSucess.length)];

    // Вибираємо випадкову фразу для невдачної відповіді
    const errorPhrase = phrasesError[Math.floor(Math.random() * phrasesError.length)];

    return (
        <Grid container alignItems={"center"} columnSpacing={1}>
            <Grid item xs={"auto"}>
                {currentAnswerStatus ? ( // Перевіряємо, чи відповідь правильна
                    <CheckCircleIcon fontSize={"large"} color={"success"}/>
                ) : (
                    <CancelIcon fontSize={"large"} color={"error"}/>
                )}
            </Grid>
            <Grid item xs={"auto"}>
                <Typography className={"random_phrase"} variant={"h5"}>
                    {currentAnswerStatus ? successPhrase : errorPhrase}
                </Typography>
            </Grid>
        </Grid>
    );

};


export default AnswerReactionBlock;
