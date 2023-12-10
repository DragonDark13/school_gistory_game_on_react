import Container from '@mui/material/Container/Container';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Grid, IconButton, Link} from "@mui/material";
import "./footer.scss"
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({

    footer: {
        background: theme.palette.secondary.dark,
    },

    linkStyle: {
        color: theme.palette.secondary.contrastText,
    }
}));


const Footer = () => {

    const {cx, classes} = useStyles();


    let arrayIcon = [<FacebookIcon fontSize={"large"}/>, <InstagramIcon fontSize={"large"}/>,
        <LinkedInIcon fontSize={"large"}/>, <TelegramIcon fontSize={"large"}/>]

    return (
        <footer className={cx(classes.footer, "footer")}>
            <Container>
                <Grid justifyContent={"center"} container spacing={2}>


                    {arrayIcon.map((icon, index) => (
                        <Grid key={index + "icon"} item xs={"auto"}>
                            <IconButton className={cx(classes.linkStyle,"linkStyle")}>{icon}</IconButton>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </footer>
    )
};

export default Footer;