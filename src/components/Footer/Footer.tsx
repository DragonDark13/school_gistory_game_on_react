import Container from '@mui/material/Container/Container';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {Grid, IconButton} from "@mui/material";
import "./footer.scss"
import {makeStyles} from "tss-react/mui";
import GoogleIcon from '@mui/icons-material/Google';


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


    let arrayIcon = [
        {
            icon: <FacebookIcon fontSize={"large"}/>,
            href: "https://www.facebook.com/dragondark13"
        },
        {
            icon: <InstagramIcon fontSize={"large"}/>,
            href: "https://www.instagram.com/zachkevich/"
        },
        {
            icon: <LinkedInIcon fontSize={"large"}/>,
            href: "https://www.linkedin.com/in/alexandrzachkevich/"
        },
        {
            icon: <TelegramIcon fontSize={"large"}/>,
            href: "https://t.me/AlexandrZachkevich"
        },
        {
            icon: <GoogleIcon fontSize={"large"}/>,
            href: "mailto:aleksdark13@gmail.com"
        }
        ]

    return (
        <footer className={cx(classes.footer, "footer")}>
            <Container>
                <Grid justifyContent={"center"} container spacing={2}>


                    {arrayIcon.map(({icon,href}, index) => (
                        <Grid key={index + "icon"} item xs={"auto"}>
                            <IconButton target={"_blank"} href={href} className={cx(classes.linkStyle, "linkStyle")}>{icon}</IconButton>
                        </Grid>
                    ))}

                </Grid>
            </Container>
        </footer>
    )
};

export default Footer;