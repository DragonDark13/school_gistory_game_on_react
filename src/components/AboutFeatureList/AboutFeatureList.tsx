import React from 'react';
import {List, ListItem, Typography, Paper, Grid} from '@mui/material';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import "./about_feature_list.scss"
import Container from "@mui/material/Container";
import {makeStyles} from "tss-react/mui";
import {amber, blueGrey, deepOrange, lightBlue} from "@mui/material/colors";
import GroupIcon from '@mui/icons-material/Group'; // Import the GroupIcon


const featureList = [
    {
        name: 'interactiveLessons',
        title: 'Інтерактивні Уроки',
        description: 'Долучайтеся до захоплюючих інтерактивних уроків з історії, які допоможуть вам краще зрозуміти та запам\'ятати ключові події минулого.'
    },
    {
        name: 'testingAndAchievements',
        title: 'Тестування та Досягнення',
        description: 'Пройдіть тести для перевірки своїх знань і заробіть досягнення. Докажіть, що ви відмінний історик!'
    },
    {
        name: 'historicalEventsOverview',
        title: 'Огляд Історичних Подій',
        description: 'Ознайомтеся з датами та фактами великих історичних подій через цікавий огляд історії.'
    },
    {
        name: 'profile',
        title: 'Профіль та Спільнота',
        description: 'Створіть свій профіль, відстежуйте свій прогрес'
    },
    {
        name: 'freeAccess',
        title: 'Безкоштовний Доступ',
        description: 'Додаток надає безкоштовний доступ до основних функцій, забезпечуючи доступність навчання для всіх.'
    },
    {
        name: 'community',
        title: 'Спільнота',
        description: 'Змагайтесь з іншими участниками',
    },

];

const useStyles = makeStyles()((theme) => ({

    aboutFeatureListContainer: {
        background: theme.palette.background.paper,
    },

    itemColor1: {

        "& .icon_container": {
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
        }

    },
    itemColor2: {

        "& .icon_container": {
            background: theme.palette.secondary.light,
            color: theme.palette.secondary.main,
        }

    },
    itemColor3: {

        "& .icon_container": {
            background: amber[100],
            color: amber[700],
        }

    },
    itemColor4: {

        "& .icon_container": {
            background: deepOrange[100],
            color: deepOrange[700],
        }

    },
    itemColor5: {

        "& .icon_container": {
            background: lightBlue[100],
            color: lightBlue[700],
        }

    },
    itemColor6: {

        "& .icon_container": {
            background: blueGrey[100],
            color: blueGrey[700],
        }

    }

}));


const AboutFeatureList = () => {

    const {cx, classes} = useStyles();

    const getIcon = (iconClass: string) => {
        switch (iconClass) {
            case 'interactiveLessons':
                return <LocalLibraryIcon/>;
            case 'testingAndAchievements':
                return <AssignmentIcon/>;
            case 'historicalEventsOverview':
                return <EventNoteIcon/>;
            case 'profile':
                return <AccountCircleIcon/>;
            case 'freeAccess':
                return <LockOpenIcon/>;
            case 'community':
                return <GroupIcon/>; // Use the GroupIcon for the 'community' class
            default:
                return null;
        }
    };

    const getItemColorClass = (iconClass: string) => {
        switch (iconClass) {
            case 'interactiveLessons':
                return classes.itemColor1;
            case 'testingAndAchievements':
                return classes.itemColor2;
            case 'historicalEventsOverview':
                return classes.itemColor4;
            case 'profile':
                return classes.itemColor3;
            case 'freeAccess':
                return classes.itemColor5;
            case 'community':
                return classes.itemColor6; // Use the GroupIcon for the 'community' class
            default:
                return null;
        }
    };


    return (
        <div className={cx(classes.aboutFeatureListContainer, "about_feature_list_container")}>
            <Container>
                <List disablePadding className={"about_feature_list"}>
                    {featureList.map((feature, index) => (
                        <ListItem className={cx(getItemColorClass(feature.name))} disableGutters disablePadding
                                  title={feature.description} key={index + "feature.title"}>
                            {/*<ListItemIcon>{feature.icon}</ListItemIcon>*/}
                            {/*<ListItemText*/}
                            {/*    primary={}*/}
                            {/*/>*/}
                            <Paper elevation={3}>
                                <Grid alignItems={"center"} gap={3} container>
                                    <Grid>
                                        <Paper className={"icon_container"}
                                               elevation={0}>{getIcon(feature.name)}</Paper></Grid>
                                    <Grid>
                                        <Typography variant={"subtitle1"}>{feature.title}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </ListItem>
                    ))}
                </List></Container></div>
    );
};

export default AboutFeatureList;
