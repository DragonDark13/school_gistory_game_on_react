import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import {alpha, Container, Grid, LinearProgress, useMediaQuery} from "@mui/material";
import './profile_page.scss'
import UserProfileSettings from "./UserProfileSettings";
import {Helmet} from "react-helmet-async";
import {ProfilePageProps} from "../../types/types";
import {useTheme} from "@mui/system";
import {makeStyles} from "tss-react/mui";
import {amber, blueGrey, deepOrange, lightBlue} from "@mui/material/colors";


const useStyles = makeStyles()((theme) => ({

    levelCounter: {
        background: theme.palette.primary.light,
    },


}))


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

    const {cx, classes} = useStyles();

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

    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Container className={"profile_container"}>
            <Helmet>
                <title>Профіль</title>
            </Helmet>
            <Grid spacing={mdUp ? 2 : 0} container direction={mdUp ? "row-reverse" : "row"}>
                <Grid item xs={12} lg={9}>
                    <Paper className={"profile_block"} elevation={3}>
                        <Avatar className={"profile_block_avatar"} alt={username} src={avatar}
                                sx={{width: 100, height: 100, margin: 'auto'}}/>
                        <Typography variant={mdUp ? "h4" : "h5"}  className={"username"} >
                            {username}
                        </Typography>
                        <Grid gap={2} className={"level_container"} container alignItems={"center"}
                              justifyContent={"center"}>
                            <Grid item>
                                {/*<KeyboardDoubleArrowUpIcon className={"block_icon"}/>*/}
                                <Avatar className={cx(classes.levelCounter)}> {lessonsVisited}</Avatar>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Рівень
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container alignItems={"center"} justifyContent={"center"}>
                            <Paper className={"time_location_container"}>
                                <Grid item container xs={"auto"} alignItems={"center"}>
                                    <Grid item xs={12} lg={"auto"}>
                                        <Typography className={"time_label"}>Локація у часі:</Typography>
                                    </Grid>
                                    <Grid item xs={12} lg={"auto"}>
                                        <Typography className={"time"} variant={"h6"} color="text.secondary"
                                                    sx={{marginTop: '5px'}}>
                                            {historyList[lessonsVisited].date}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </Grid>

                        <Grid className={"profile_progress_panel_container"} container alignItems={"center"}
                              justifyContent={"center"} spacing={mdUp ? 2 : 0}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant={"h5"}>Прогресс на поточному рівні</Typography>
                                <Typography variant={"h6"} color="text.secondary">{progressAnswer + "%"}</Typography>

                                <LinearProgress
                                    color={"primary"}
                                    value={progressAnswer}
                                    variant={"determinate"}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <Typography variant={"h5"}>Загальгний прогресс</Typography>
                                <Typography variant={"h6"} color="text.secondary">{progress + "%"}</Typography>

                                <LinearProgress
                                    color={"primary"}
                                    value={progress}
                                    variant={"determinate"}
                                />
                            </Grid>
                        </Grid>


                        <div className="achievement_container">
                            <Typography variant={"h5"}>
                                Ваші знахідки
                            </Typography>

                            <Grid container className={"achievement_icon_list"}>

                                {achievementIconArray.map((achievement, index) => (
                                    <Grid key={index + "test"} item xs={6} sm={4} xl={3}>
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
                        </div>

                    </Paper>
                </Grid>

                <Grid item xs={12} lg={3}>
                    {(!mdUp && !openSettings) && <Button
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
                    {(openSettings || mdUp) && (
                        <Paper className={"profile_block profile_block_settings"} elevation={3}>
                            {!mdUp && <Grid container justifyContent={"flex-end"}>
                                <Grid item>
                                    <Button onClick={handleCloseSettings}>Close Settings</Button>
                                </Grid>
                            </Grid>}
                            <UserProfileSettings/>
                        </Paper>
                    )}

                    <Grid container justifyContent={"flex-end"}>
                        <Grid item lg={12}>
                            <Button fullWidth variant="outlined" color={"secondary"}>
                                Видалити профіль
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>


            {/* Modal for Settings */}


        </Container>
    );
};

export default ProfilePage;
