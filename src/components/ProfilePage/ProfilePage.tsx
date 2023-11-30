import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import CommentIcon from '@mui/icons-material/Comment';
import {Link} from 'react-router-dom';

interface ProfilePageProps {
    username: string;
    avatar: string;
    lessonsVisited: number;
    achievementLevel: string;
    achievements: string[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({
                                                     username,
                                                     avatar,
                                                     lessonsVisited,
                                                     achievementLevel,
                                                     achievements,
                                                 }) => {
    const [openSettings, setOpenSettings] = useState(false);

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    return (
        <div style={{padding: '20px'}}>
            <Paper elevation={3} style={{padding: '20px', textAlign: 'center'}}>
                <Avatar alt={username} src={avatar} sx={{width: 100, height: 100, margin: 'auto'}}/>
                <Typography variant="h5" component="div" sx={{marginTop: '10px'}}>
                    {username}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{marginTop: '5px'}}>
                    {achievementLevel}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{marginTop: '5px'}}>
                    Lessons Visited: {lessonsVisited}
                </Typography>
                <Badge badgeContent={achievements.length} color="primary" sx={{marginTop: '10px'}}>
                    <EmojiEvents/>
                </Badge>
                <Badge color="secondary" sx={{marginTop: '10px'}}>
                    <HistoryIcon/>
                </Badge>
                <Badge color="info" sx={{marginTop: '10px'}}>
                    <CommentIcon/>
                </Badge>
                <Button
                    variant="outlined"
                    color={"primary"}
                    onClick={handleOpenSettings}
                    startIcon={<SettingsIcon/>}
                    sx={{marginTop: '20px'}}
                >
                    Settings
                </Button>
            </Paper>

            {/* Modal for Settings */}
            {openSettings && (
                <div>
                    {/* Add your settings modal content here */}
                    <Button onClick={handleCloseSettings}>Close Settings</Button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
