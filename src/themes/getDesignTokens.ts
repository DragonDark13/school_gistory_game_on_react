import {amber, deepOrange, grey} from "@mui/material/colors";
import {PaletteMode} from "@mui/material";


const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: '#923d31',
                    light: '#b14b39',
                    dark: '#7d3127'
                },
                secondary: {
                    main: '#318692',
                    dark: '#27636d',
                    light: '#318f9b',
                    contrastText: '#ffffff'
                },
                background: {
                    default: '#fff2d5'
                },
                text: {
                    primary: '#000000',
                    secondary: '#112a46'
                }
            }
            : {
                // palette values for dark mode
                primary: {
                    main: '#44a061',
                    light: '#4fbb71',
                    dark: '#43af68',
                    contrastText: '#ffffff'
                },
                secondary: {
                    main: '#47acd4',
                    dark: '#214452',
                    light: '#60d6ff',
                    contrastText: '#000000'
                },
                background: {
                    default: '#2d5575',
                    paper: '#182c3d'
                },
                text: {
                    primary: '#ffffff'
                }
            }),
    },
});

export default getDesignTokens;

