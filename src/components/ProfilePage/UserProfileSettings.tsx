import React, {useState} from 'react';
import {
    Paper,
    Typography,
    Grid,
    Button,
    TextField,
    useMediaQuery,
    Select,
    MenuItem,
    InputLabel,
    FormControl, Autocomplete
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {useTheme} from "@mui/system";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";

const UserProfileSettings: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('JohnDoe'); // Початкові значення
    const [email, setEmail] = useState('john@example.com');
    const [password, setPassword] = useState('********');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Додайте логіку для збереження змінений даних
    };

    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    const [selectedCountry, setSelectedCountry] = useState({
        label: "Ukrainian",
        value: "UK"
    });

    const selectCountryHandler = (value: { label: string; value: string } | null) => {
        if (value) {
            setSelectedCountry(value);
        }
    };

    // Have to register the languages you want to use
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);

    const countryObj = countries.getNames("en", {select: "official"});

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: key
        };
    });

    return (
        <React.Fragment>
            <div className={"field_container"}>

                <TextField label={"UserName:"} disabled={!isEditing} fullWidth value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>


                <TextField label={"Email:"} disabled={!isEditing} fullWidth value={email}
                           onChange={(e) => setEmail(e.target.value)}/>


                <TextField label={"Password:"} disabled={!isEditing} fullWidth type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>


                {/*<TextField label={"Country:"} disabled={!isEditing} fullWidth value={country}*/}
                {/*           onChange={(e) => setCountry(e.target.value)}/>*/}

                <Autocomplete
                    disabled={!isEditing}
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    options={countryArr}
                    value={selectedCountry}
                    onChange={(event: any, newValue: { label: string; value: string } | null) => {
                        selectCountryHandler(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} fullWidth label="Country:"/>}
                />

                {/*<FormControl focused fullWidth>*/}
                {/*    <InputLabel id="demo-simple-select-helper-label">Country:</InputLabel>*/}
                {/*    <Select*/}
                {/*        label="Country"*/}
                {/*        labelId="demo-simple-select-helper-label"*/}
                {/*        fullWidth*/}
                {/*        value={selectedCountry}*/}
                {/*        onChange={(e) => selectCountryHandler(e.target.value)}*/}
                {/*    >*/}
                {/*        {!!countryArr?.length &&*/}
                {/*        countryArr.map(({label, value}) => (*/}
                {/*            <MenuItem key={value} value={value}>*/}
                {/*                {label}*/}
                {/*            </MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

            </div>

            <Grid container justifyContent={!mdUp ? "flex-end" : "flex-start"}>
                <Grid item xs={6} lg={12}>
                    {isEditing ? (
                        <Button fullWidth variant={"contained"} color={"primary"} onClick={handleSaveClick}
                                startIcon={<SaveIcon/>}>
                            Save
                        </Button>
                    ) : (
                        <Button fullWidth variant={"contained"} color={"primary"} onClick={handleEditClick}
                                startIcon={<EditIcon/>}>
                            Edit
                        </Button>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default UserProfileSettings;
