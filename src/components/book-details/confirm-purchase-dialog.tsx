import { SetStateAction } from "react"

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  CardMedia,
  Divider,
  TextField,
  Typography,
} from "@mui/material"

import { Book, UserProfile } from "src/types/data-types"

interface ConfirmPurchaseDialogProps {
  isModalOpen: boolean
  handleCloseModal: () => void
  book: Book
  quantity: number
  userProfile: UserProfile | null
  isPlacingOrder: boolean
  handleConfirmBuy: () => Promise<void>
  setUserProfile: (value: SetStateAction<UserProfile | null>) => void
}

const ConfirmPurchaseDialog = ({
  isModalOpen,
  handleCloseModal,
  book,
  quantity,
  userProfile,
  isPlacingOrder,
  handleConfirmBuy,
  setUserProfile,
}: ConfirmPurchaseDialogProps) => (
  <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth='xs' fullWidth>
    <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
      <CheckCircleOutlineIcon
        color='success'
        sx={{ marginRight: 1, fontSize: 30 }}
      />
      Confirm Purchase
    </DialogTitle>
    <DialogContent>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <CardMedia
          component='img'
          alt={book.title}
          height='150'
          image={book.coverImage}
          sx={{ objectFit: "cover", borderRadius: 2, mb: 2 }}
        />
        <Typography variant='h6' fontWeight='bold'>
          {book.title}
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
          by {book.author}
        </Typography>
        <Divider sx={{ my: 2, width: "100%" }} />
        <Typography variant='body1'>Quantity: {quantity}</Typography>
        <Typography variant='body1' gutterBottom>
          Total: ₹ {(book.price * quantity).toFixed(2)}
        </Typography>
      </Box>
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
    <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
      <Button onClick={handleCloseModal} variant='outlined' color='error'>
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

export default ConfirmPurchaseDialog
