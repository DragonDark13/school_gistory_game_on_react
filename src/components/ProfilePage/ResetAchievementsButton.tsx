import React, {useContext, useState} from "react";
import {ProfilePageProps} from "../../types/types";
import {useAuth} from "../AuthContext/AuthContext";
import {UserContext} from "../MyProviders/MyProviders";
import {Alert, Box, Button} from "@mui/material";
import axiosClient from "../../axios";


const ResetAchievementsButton: React.FC = () => {
    const {setCurrentUser} = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const resetAchievements = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axiosClient.post('/api/user/reset-achievements', {},
                {
                    headers: {'Authorization': `Bearer ${token}`}
                }
            );
            setCurrentUser(response.data.user_data)
            setSuccess(response.data.message);
            setError(null);
        } catch (error:any) {
            setError(error.response?.data.message || 'An error occurred');
            setSuccess(null);
        }
    };

    return (
        <Box sx={{mt: 3}}>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Button
                variant={"outlined"}
                color="secondary"
                onClick={resetAchievements}
                sx={{mt: 3, mb: 2}}
            >
                Reset to Initial Level
            </Button>
        </Box>
    );
}

export default ResetAchievementsButton