import React from 'react';
import {List, ListItem, Typography, Paper, Grid, Hidden, alpha} from '@mui/material';
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
        title: 'Особистий профіль',
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
            background: alpha(theme.palette.primary.light, 0.3),
            color: alpha(theme.palette.primary.main, 0.5),
        }

    },
    itemColor2: {

        "& .icon_container": {
            background: alpha(theme.palette.secondary.light, 0.3),
            color: alpha(theme.palette.secondary.main, 0.5),
        }

    },
    itemColor3: {

        "& .icon_container": {
            background: alpha(amber[700], 0.3),
            color: alpha(amber[700], 0.5),
        }

    },
    itemColor4: {

        "& .icon_container": {
            background: alpha(deepOrange[700], 0.3),
            color: alpha(deepOrange[700], 0.5),
        }

    },
    itemColor5: {

        "& .icon_container": {
            background: alpha(lightBlue[700], 0.3),
            color: alpha(lightBlue[700], 0.5),
        }

    },
    itemColor6: {

        "& .icon_container":
            {
                background: alpha(blueGrey[500], 0.3),
                color: alpha(blueGrey[700], 0.5),
            }

    }

}))

interface IFeaturedListItemContent {
    title: string,
    name: string
    description: string
}


const FeaturedListItemContent = ({name, title, description}: IFeaturedListItemContent) => {

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

    return (
        <Paper className={"about_feature_item_container"} elevation={0} variant={"outlined"}>
            <Grid alignItems={"center"} columnSpacing={1} container>
                <Grid item xs={"auto"} sm={"auto"}>
                    <Paper elevation={0}   className={"icon_container"}
                           >
                        {getIcon(name)}</Paper></Grid>
                <Grid item xs={"auto"} sm={9} md={8}>
                    <Typography variant={"subtitle1"}>{title}</Typography>
                    {/*<Hidden smDown><Typography>{description}</Typography></Hidden>*/}
                </Grid>
            </Grid>
        </Paper>
    )

}


const AboutFeatureList = () => {

    const {cx, classes} = useStyles();


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
                <Hidden smUp>
                    <List disablePadding className={"about_feature_list"}>
                        {featureList.map((feature, index) => (
                            <ListItem className={cx(getItemColorClass(feature.name))} disableGutters disablePadding
                                      title={feature.description} key={index + "feature.title"}>
                                <FeaturedListItemContent description={feature.description} name={feature.name}
                                                         title={feature.title}/>
                            </ListItem>
                        ))}
                    </List>
                </Hidden>
                <Hidden smDown>
                    <Grid container rowSpacing={4} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {featureList.map((feature, index) => (
                            <Grid item sm={6} xl={4} className={cx(getItemColorClass(feature.name))}
                                  title={feature.description} key={index + "feature.title"}>
                                <FeaturedListItemContent description={feature.description} name={feature.name}
                                                         title={feature.title}/>
                            </Grid>
                        ))}
                    </Grid>
                </Hidden>
            </Container>
        </div>
    );
};

export default AboutFeatureList;
