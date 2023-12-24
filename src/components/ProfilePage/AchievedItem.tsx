import React from 'react';
import {Grid,  Icon} from "@mui/material";
import Paper from "@mui/material/Paper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import {IAchievedItem} from "../../types/types";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';


const BootstrapTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} arrow classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}));



const AchievedItem = ({description, active, name, icon}: IAchievedItem) => {

    const Icon = icon;
    return (
        <Grid item xs={6} sm={4} xl={3}>
            <Paper variant={"outlined"}>
                {/*<ListItemIcon>*/}

                <BootstrapTooltip sx={{display: {xs: "none", md: "block"}}} className={"tooltip_my"}
                                  placement={"top-start"}
                                  title={description}>
                    <HelpOutlineIcon className={"tooltip_icon"}
                                     color={"disabled"}
                                     fontSize={"small"}/>
                </BootstrapTooltip>

                <div className={"achievement_icon_container"}>
                    <Icon fontSize={"large"} color={active ? "primary" : "disabled"} />
                </div>

                {/*</ListItemIcon>*/}
                <Typography className={"name"} variant={"body2"}>
                    {name}
                </Typography>
                <Typography
                    variant={"subtitle2"}> {!active ? "Incomplete" : "Complete"}</Typography>

                {/*<ListItemText secondary={historyList[index].achieved}*/}
                {/*              title={historyList[index].achieved}/>*/}
            </Paper>
        </Grid>

    );
};

export default AchievedItem;
