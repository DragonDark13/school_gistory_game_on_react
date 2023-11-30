import {PaletteMode} from "@mui/material";


const getDesignTokens = (mode: PaletteMode) => ({

    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: {
                    main: '#923d31',
                    light: '#d46d5c',
                    dark: '#431e19'
                },
                secondary: {
                    main: '#318692',
                    dark: '#27636d',
                    light: '#5ad2e1',
                    contrastText: '#ffffff'
                },
                background: {
                    default: '#fff2d5',
                    paper: "#fff"
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

    typography: {
        subtitle1:{
            fontWeight:"bold",
        }
    }
});

export default getDesignTokens;

