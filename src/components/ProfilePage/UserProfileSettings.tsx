import React, {useContext, useState} from 'react';
import {
    Grid,
    Button,
    TextField,
    useMediaQuery,
    Autocomplete
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {useTheme} from "@mui/system";
import countries from "i18n-iso-countries";
// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import {UserContext} from "../MyProviders/MyProviders";
import {useAuth} from "../AuthContext/AuthContext";

const UserProfileSettings=React.memo(() => {

    const {currentUser} = useContext(UserContext);
    const {updateProfile} = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState(currentUser.user_name);
    const [email, setEmail] = useState(currentUser.email);
    const [country, setCountry] = useState(currentUser.country);
    const [selectedCountry, setSelectedCountry] = useState({label: "Ukrainian", value: "UK"});
    const theme = useTheme();

    const mdUp = useMediaQuery(theme.breakpoints.up('md'))

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        await updateProfile(userName, email, selectedCountry.value);
    };

    const selectCountryHandler = (value: { label: string; value: string } | null) => {
        if (value) {
            setSelectedCountry(value);
        }
    };

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


                {/*<TextField label={"Password:"} disabled={!isEditing} fullWidth type="password" value={password}*/}
                {/*           onChange={(e) => setPassword(e.target.value)}/>*/}

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
});

export default UserProfileSettings;
