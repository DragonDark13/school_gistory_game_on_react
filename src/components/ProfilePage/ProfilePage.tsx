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
import {Grid, LinearProgress, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {HistoricalEvent} from '../HistoryTimeline/HistoryTimeline';
import './profile_page.scss'
import UserProfileSettings from "./UserProfileSettings";

interface ProfilePageProps {
    username: string;
    avatar: string;
    lessonsVisited: number;
    achievementLevel: string;
    achievements: string[];
    historyList: HistoricalEvent[]
}

const ProfilePage: React.FC<ProfilePageProps> = ({
                                                     username,
                                                     avatar,
                                                     lessonsVisited,
                                                     achievementLevel,
                                                     achievements,
                                                     historyList,
                                                 }) => {
    const [openSettings, setOpenSettings] = useState(false);

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    const progress = Math.round(historyList.length / 100 * lessonsVisited);
    const progressAnswer = 30;

    let achievementIconArray = [
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
        <EmojiEvents fontSize={"large"}/>,
    ]

    const achievementActiveCount = 3;

    return (
        <div className={"profile_container"}>
            <Paper className={"profile_block"} elevation={3}>
                <Avatar className={"profile_block_avatar"} alt={username} src={avatar}
                        sx={{width: 100, height: 100, margin: 'auto'}}/>
                <Typography variant="h5" component="div" sx={{marginTop: '10px'}}>
                    {username}
                </Typography>
                <Grid gap={2} container alignItems={"center"} justifyContent={"center"}>
                    <Grid item>
                        {/*<KeyboardDoubleArrowUpIcon className={"block_icon"}/>*/}
                        <Avatar> {lessonsVisited}</Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" color="text.secondary">
                            Рівень
                        </Typography>
                    </Grid>
                </Grid>

                <Typography>Локація у часі</Typography>
                <Typography variant={"h6"} color="text.secondary" sx={{marginTop: '5px'}}>
                    {historyList[lessonsVisited].date}
                </Typography>

                <Typography>Загальгний прогресс</Typography>
                <Typography variant={"h6"} color="text.secondary">{progressAnswer + "%"}</Typography>

                <LinearProgress
                    color={"primary"}
                    value={progressAnswer}
                    variant={"determinate"}
                />


                <Typography>Загальгний прогресс</Typography>
                <Typography variant={"h6"} color="text.secondary">{progress + "%"}</Typography>

                <LinearProgress
                    color={"primary"}
                    value={progress}
                    variant={"determinate"}
                />

                <Typography>
                    Ваші знахідки
                </Typography>

                <Grid container className={"achievement_icon_list"}>
                    {achievementIconArray.map((achievement, index) => (
                        <Grid title={historyList[index].achieved} key={index + "test"} item xs={6}>
                            <Paper variant={"outlined"}>
                                {/*<ListItemIcon>*/}
                                <EmojiEvents color={achievementActiveCount > index ? "primary" : "disabled"}
                                             fontSize={"large"}/>
                                {/*</ListItemIcon>*/}
                                <Typography>
                                    {historyList[index].achieved}
                                </Typography>

                                {/*<ListItemText secondary={historyList[index].achieved}*/}
                                {/*              title={historyList[index].achieved}/>*/}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>


            </Paper>


            {!openSettings && <Button
                className={"settings_button"}
                fullWidth
                variant="outlined"
                color={"primary"}
                onClick={handleOpenSettings}
                startIcon={<SettingsIcon/>}
            >
                Налаштування
            </Button>
            }

            {/* Modal for Settings */}
            {openSettings && (
                <Paper className={"profile_block profile_block_settings"} elevation={3}>
                     <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Button onClick={handleCloseSettings}>Close Settings</Button>
                        </Grid>
                    </Grid>
                    <UserProfileSettings/>
                </Paper>
            )}

            <Grid container justifyContent={"flex-end"}>
                <Grid item>
                    <Button variant="outlined" color={"secondary"}>
                        Видалити профіль
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProfilePage;
