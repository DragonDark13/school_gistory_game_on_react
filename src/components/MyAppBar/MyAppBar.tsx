import React from 'react';
import {AppBar, AppBarProps} from '@mui/material';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
    customAppBar: {
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.primary.light,
        // Додайте інші глобальні стилі за вашими потребами
    },
}));

interface MyAppBarProps extends AppBarProps {
    // Додайте додаткові пропси за вашими потребами
}

function MyAppBar({children, ...props}: MyAppBarProps) {
    const {cx, classes} = useStyles();


    return (
        <AppBar elevation={8} className={cx(classes.customAppBar)} {...props}>
            {children}
        </AppBar>
    );
}

export default MyAppBar;
