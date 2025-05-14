import { Alert, Snackbar } from "@mui/material";


interface ToastNotificationProps {
    open: boolean;
    message: string;
    onClose: () => void;
    severity: "success" | "error" | "warning" | "info";
}

export const ToastNotification = ({ open, message, onClose, severity = "info" }: ToastNotificationProps) => {
   
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical : 'top', horizontal : 'right' }}>
        <Alert
            onClose={onClose}
            severity={severity}
            variant="filled"
            sx={{ width: '100%' }}
        >
            {message}
        </Alert>
    </Snackbar>
    )
}
