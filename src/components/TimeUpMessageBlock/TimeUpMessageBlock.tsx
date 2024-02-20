import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


    const phrasesTimeUp = [
        "Time's up.",
        "Out of time.",
        "Your time has expired.",
        "Time expired.",
        "Time is over."
    ];

const TimeUpMessageBlock = () => {
    // Вибираємо випадкову фразу для повідомлення про завершення часу
    const timeUpPhrase = phrasesTimeUp[Math.floor(Math.random() * phrasesTimeUp.length)];

    return (
        <Grid container alignItems={"center"} columnSpacing={1}>
            <Grid item xs={"auto"}>
                <AccessTimeIcon fontSize={"large"} color={"error"}/>
            </Grid>
            <Grid item xs={"auto"}>
                <Typography className={"random_phrase"} variant={"h5"}>
                    {timeUpPhrase}
                </Typography>
            </Grid>
        </Grid>
    );

};

export default TimeUpMessageBlock;
