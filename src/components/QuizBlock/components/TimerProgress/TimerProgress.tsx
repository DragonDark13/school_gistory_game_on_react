import React from 'react';
import {CircularProgress, Typography} from "@mui/material";
interface ITimerProgress {
    remainingTime:number,
    maxTimeStatic:number,
}
const TimerProgress = ({maxTimeStatic,remainingTime}:ITimerProgress) => {
    return (
        <div className={"timer_progress"}>
            {/* Your other JSX components */}
            <CircularProgress
                variant="determinate"
                value={(remainingTime / maxTimeStatic) * 100} // Calculate the progress value
                color="secondary" // Change the color of the progress indicator
                thickness={5} // Adjust the thickness of the progress indicator
                size={60} // Set the size of the progress indicator
            />
            <Typography color={"secondary"} variant={"h6"}>{remainingTime}</Typography>
        </div>

    );
};


export default TimerProgress;
