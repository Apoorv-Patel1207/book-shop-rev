import { Snackbar, Alert, AlertColor } from "@mui/material";

interface SnackbarAlertProps {
  open: boolean;
  message: string;
  type: AlertColor;
  onClose: () => void;
}

const SnackbarAlert = (props: SnackbarAlertProps) => {
  const { open, message, type, onClose } = props;
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;