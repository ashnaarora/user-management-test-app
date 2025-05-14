import { Button, Fade, Modal, Box, Typography, Paper, TextField, Alert } from "@mui/material";
import CreateUserForm from "../CreateUserForm/createUserForm";
import { useState } from "react";
import { createUser } from "../../api/user-api";
import { UserTable } from "../UserTable/userTable";
import { ToastNotification } from "../ToastNotification/toastNotification";

export const HomePage = () => {

    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [refreshUsers, setRefreshUsers] = useState(0);
    const [notificationState, setNotificationState] = useState<{ open: boolean, message: string, severity: 'success' | 'error' | 'warning' | 'info' }>({
        open: false,
        message: '',
        severity: 'info',
      });

    const showAddUserForm = () => {
        setShowAddUserModal(true);
    }

    const handleCancel = () => {
        setShowAddUserModal(false);
    }

    const handleSubmit = async (userData: { firstName: string, lastName: string, email: string }) => {
        try {
            const response = await createUser(userData);

            if (!response.ok) {
                const errorData = await response.json();
                setNotificationState(prev => ({ ...prev, 
                    open: true, 
                    message: `Error creating user: ${errorData.errors ? errorData.errors.map((e: any) => e.msg).join(', ') : response.statusText}`, 
                    severity: 'error' 
                }));
                return;
            }

            setNotificationState(prev => ({ ...prev, open: true, message: 'User created successfully!', severity: 'success' }));
            setRefreshUsers(prev => prev + 1);

        } catch (error) {
            setNotificationState(prev => ({ ...prev, open: true, message: 'An error occurred while trying to create the user. Please try again in sometime.', severity: 'error' }));
           return;
        }

        setShowAddUserModal(false);
    }

    return (
        <>
            <Box className="homePageContainer">
                <Box className="tableContainer">
                <Typography variant="h4" fontWeight={700}>Users</Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 3 }}>
                     Displays list of enrolled users in the system
                </Typography>
                <Paper elevation={2} sx={{ borderRadius: 3, p: 3 }}>
                    <Box className="button-row">
                        <Button variant="contained" color="primary" sx={{ textTransform: 'capitalize' }} onClick={showAddUserForm}>
                            Add New User
                        </Button>
                    </Box>
                    <UserTable refreshUsers={refreshUsers} />
                </Paper>
                </Box>
            </Box>

            <ToastNotification open={notificationState.open} 
                message={notificationState.message} 
                onClose={() => setNotificationState(prev => ({ ...prev, open: false }))} 
                severity={notificationState.severity}
            />          

            <Modal
                open={showAddUserModal}
                onClose={handleCancel}
                aria-labelledby="create-user-modal-title"
                aria-describedby="create-user-modal-description"
                closeAfterTransition
            >
                <Fade in={showAddUserModal}>
                    <Box className="modal-container">
                        <CreateUserForm onSubmit={handleSubmit} onCancel={handleCancel} />
                    </Box>
                </Fade>
            </Modal>

        </>
    );
}