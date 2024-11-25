import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  TextField,
  DialogActions,
  Button,
} from "@mui/material"
import { SetStateAction } from "react"
import { UserProfile } from "src/types/data-types"

interface CartConfirmPurchaseDailogProps {
  isCheckoutModalOpen: boolean
  handleCloseCheckoutModal: () => void
  totalCost: number
  userProfile: UserProfile | null
  setUserProfile: (value: SetStateAction<UserProfile | null>) => void
  handleConfirmBuy: () => Promise<void>
  isPlacingOrder: boolean
}

const CartConfirmPurchaseDailog = (props: CartConfirmPurchaseDailogProps) => {
  const {
    isCheckoutModalOpen,
    handleCloseCheckoutModal,
    totalCost,
    userProfile,
    setUserProfile,
    handleConfirmBuy,
    isPlacingOrder,
  } = props
  return (
    <Dialog open={isCheckoutModalOpen} onClose={handleCloseCheckoutModal}>
      <DialogTitle>Confirm Checkout</DialogTitle>
      <DialogContent>
        <Typography>
          Please confirm your details before proceeding. Your total is Rs{" "}
          {totalCost.toFixed(2)}.
        </Typography>
        <Box
          component='form'
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label='Name'
            variant='outlined'
            fullWidth
            value={userProfile?.name || ""}
            onChange={(e) =>
              setUserProfile((prev) =>
                prev ? { ...prev, name: e.target.value } : null,
              )
            }
          />
          <TextField
            label='Mobile Number'
            variant='outlined'
            fullWidth
            value={userProfile?.phone || ""}
            onChange={(e) =>
              setUserProfile((prev) =>
                prev ? { ...prev, phone: e.target.value } : null,
              )
            }
          />
          <TextField
            label='Address'
            variant='outlined'
            fullWidth
            multiline
            rows={3}
            value={userProfile?.address || ""}
            onChange={(e) =>
              setUserProfile((prev) =>
                prev ? { ...prev, address: e.target.value } : null,
              )
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCheckoutModal} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={handleConfirmBuy}
          variant='contained'
          color='primary'
          sx={{ ml: 1 }}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Confirm Buy"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CartConfirmPurchaseDailog
