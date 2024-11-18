import { Snackbar, Alert, AlertColor } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  type: AlertColor; // 'success', 'error', 'info', 'warning'
  onClose: () => void;
}

const SnackbarAlert = ({
  open,
  message,
  type,
  onClose,
}: SnackbarAlertProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
