import React from 'react';
import {ClickAwayListener, Grow, ListItemIcon, ListItemText, MenuItem, MenuList, Popper} from "@mui/material";
import Paper from "@mui/material/Paper";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutIcon from "@mui/icons-material/Logout";
import {IProfilePopper} from "../../types/types";



const ProfilePopper = ({openProfileMenu,anchorEl,handlePopoverClose}:IProfilePopper) => {
    return (
        <Popper   
            open={openProfileMenu}
            anchorEl={anchorEl}
            placement={'bottom-end'}
            transition
            onClose={handlePopoverClose}
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
                                <MenuItem onClick={handlePopoverClose}>
                                    <ListItemIcon>
                                        <PermIdentityIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                </MenuItem>
                                <MenuItem
                                    onClick={handlePopoverClose}>
                                    <ListItemIcon>
                                        <SettingsIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Settings</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handlePopoverClose}>
                                    <ListItemIcon>
                                        <Brightness7Icon/>
                                    </ListItemIcon>
                                    <ListItemText>Dark
                                        Mode</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handlePopoverClose}>
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
