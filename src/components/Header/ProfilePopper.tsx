import React from 'react';
import {ClickAwayListener, Grow, ListItemIcon, ListItemText, MenuItem, MenuList, Popper} from "@mui/material";
import Paper from "@mui/material/Paper";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import {IProfilePopper} from "../../types/types";
import {Link as RouterLink} from "react-router-dom";


const ProfilePopper = ({
                           openProfileMenu,
                           anchorEl,
                           handlePopoverClose,
                           logoutOnClick,
                           toggleColorModeFunc
                       }: IProfilePopper) => {

// openProfileMenu=true;
    return (
        <Popper
            className={"header_profile_popover"}
            open={openProfileMenu}
            anchorEl={anchorEl}
            placement={'bottom-end'}
            transition
            disablePortal
        >
            {({TransitionProps, placement}) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handlePopoverClose}>
                            <MenuList
                                id="composition-menu"
                                aria-labelledby="composition-button"
                            >

                                <MenuItem component={RouterLink}
                                          to={"/profile"}>
                                    <ListItemIcon>
                                        <PermIdentityIcon/>

                                    </ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handlePopoverClose}>
                                    <ListItemIcon>
                                        <SettingsIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Settings</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={toggleColorModeFunc}>
                                    <ListItemIcon>
                                        <Brightness7Icon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        Dark Mode
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem onClick={logoutOnClick}>
                                    <ListItemIcon>
                                        <LogoutIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Logout
                                    </ListItemText></MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};


export default ProfilePopper;
