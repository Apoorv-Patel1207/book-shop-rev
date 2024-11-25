import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from "@mui/material"

interface ConfirmPurchaseDialogProps {
  isClearCartModalOpen: boolean
  handleCloseClearCartModal: () => void
  handleConfirmClearCart: () => void
}

const ClearCartDialog = (props: ConfirmPurchaseDialogProps) => {
  const {
    isClearCartModalOpen,
    handleCloseClearCartModal,
    handleConfirmClearCart,
  } = props
  return (
    <Dialog open={isClearCartModalOpen} onClose={handleCloseClearCartModal}>
      <DialogTitle>Clear Cart</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to clear the cart?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseClearCartModal} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfirmClearCart} color='secondary'>
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ClearCartDialog
