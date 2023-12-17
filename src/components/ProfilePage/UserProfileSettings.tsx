import React, {useState} from 'react';
import {Paper, Typography, Grid, Button, TextField, useMediaQuery} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {useTheme} from "@mui/system";

const UserProfileSettings: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('JohnDoe'); // Початкові значення
    const [email, setEmail] = useState('john@example.com');
    const [password, setPassword] = useState('********');
    const [country, setCountry] = useState('Country');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Додайте логіку для збереження змінений даних
    };

    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <React.Fragment>
            <div className={"field_container"}>

                <TextField label={"UserName:"} disabled={!isEditing} fullWidth value={userName}
                           onChange={(e) => setUserName(e.target.value)}/>


                <TextField label={"Email:"} disabled={!isEditing} fullWidth value={email}
                           onChange={(e) => setEmail(e.target.value)}/>


                <TextField label={"Password:"} disabled={!isEditing} fullWidth type="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>


                <TextField label={"Country:"} disabled={!isEditing} fullWidth value={country}
                           onChange={(e) => setCountry(e.target.value)}/>

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
