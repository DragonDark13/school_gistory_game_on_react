import React, {useState} from 'react';
import {Paper, Typography, Grid, Button, TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

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

    return (
        <React.Fragment>
            <div className={"field_container"}>
                <Typography>UserName: {isEditing ?
                    <TextField fullWidth value={userName} onChange={(e) => setUserName(e.target.value)}/> : userName}</Typography>
                <Typography>Email: {isEditing ?
                    <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)}/> : email}</Typography>
                <Typography>Password: {isEditing ? <TextField fullWidth type="password" value={password}
                                                              onChange={(e) => setPassword(e.target.value)}/> : '********'}</Typography>
                <Typography>Country: {isEditing ?
                    <TextField fullWidth value={country} onChange={(e) => setCountry(e.target.value)}/> : country}</Typography>
            </div>

            <Grid container justifyContent="flex-end">
                <Grid item xs={6}>
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
