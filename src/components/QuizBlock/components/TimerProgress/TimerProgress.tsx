import React, {useEffect, useState, memo} from 'react';
import {CircularProgress, Typography} from "@mui/material";
import set = Reflect.set;

interface ITimerProgress {
    maxTimeStatic: number,
    answerChosen: boolean,
    setTimeIsFinished: (arg0: boolean) => void;
}

const TimerProgress = memo(({
                                maxTimeStatic,
                                answerChosen,
                                setTimeIsFinished
                            }: ITimerProgress) => {
    const [remainingTime, setRemainingTime] = useState(maxTimeStatic);


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        console.log("startTimer");
        // Timer effect
        const startTimer = () => {
            timer = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timer); // Clear the timer when it reaches 0
                        return 0;
                    } else {
                        return prevTime - 1; // Decrement the remaining time
                    }
                });
            }, 1000);
        };

        if (!answerChosen) {
            // Run the timer only if answerChosen is false
            console.log("Run the timer ")
            startTimer();
            setTimeIsFinished(false)
        } else {
            clearInterval(timer);
        }
        // startTimer()
        // Cleanup function
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };

    }, [answerChosen]); // Runs whenever answerChosen changes; // Runs whenever answerChosen changes; // Runs once when the component mounts

    useEffect(() => {
        if (remainingTime === 0) {
            setTimeIsFinished(true);
        }
    }, [remainingTime])


    // useEffect(() => (
    //
    // )[remainingTime])

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
});


export default TimerProgress;
