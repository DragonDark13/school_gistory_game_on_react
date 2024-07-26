import React, { useState } from "react";
import { Button, TextField, FormHelperText, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import axiosClient from "../../axios";

const ChangePasswordForm = React.memo(() => {
    const [isEditing, setIsEditing] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setPasswordError("All fields are required");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setPasswordError("New passwords do not match");
            return;
        }

        setPasswordError('');

        try {
            const token = localStorage.getItem('token'); // Зчитування токена з localStorage
            const response = await axiosClient.post('/change-password', {
                currentPassword,
                newPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Додавання заголовка авторизації
                }
            });

            if (response.status === 200 && response.data.success) {
                alert('Password changed successfully');
                // Optionally clear fields after success
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setPasswordError('Failed to change password: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Change password error:', error);
            setPasswordError('Failed to change password: ' + (error.response?.data?.message || 'Network error'));
        }
    };

    return (
        <React.Fragment>
            <div className="field_container">
                <TextField
                    label="Current Password:"
                    disabled={!isEditing}
                    fullWidth
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    error={!!passwordError} // Indicate error state
                    helperText={passwordError} // Display error message
                    required // Make field required
                />

                <TextField
                    label="New Password:"
                    disabled={!isEditing}
                    fullWidth
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={!!passwordError} // Indicate error state
                    helperText={passwordError} // Display error message
                    required // Make field required
                />

                <TextField
                    label="Confirm New Password:"
                    disabled={!isEditing}
                    fullWidth
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    error={!!passwordError} // Indicate error state
                    helperText={passwordError} // Display error message
                    required // Make field required
                />
            </div>

            <Grid container spacing={2} alignItems="center">
                {passwordError && (
                    <Grid item xs={12}>
                        <FormHelperText error>{passwordError}</FormHelperText>
                    </Grid>
                )}

                <Grid item xs={12}>
                    {isEditing ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleChangePassword}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleEditClick}
                            startIcon={<EditIcon />}
                        >
                            Change Password
                        </Button>
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
});

export default ChangePasswordForm;
