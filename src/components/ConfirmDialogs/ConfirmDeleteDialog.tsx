import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Button,
} from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

interface ConfirmDeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{
          p: '8px 16px',
          display: 'flex',
          borderTop: '10px solid red',
          borderBottom: '1px solid #D6D9DD',
          alignItems: 'center',
        }}
      >
        <DialogContentText
          sx={{
            padding: '16px',
            color: '#000',
          }}
        >
          <ErrorIcon sx={{ color: 'red', fontSize: '70px' }} />
        </DialogContentText>
        <DialogContentText
          sx={{
            padding: '16px ',
            color: '#000',
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            {title}
          </Typography>
          <Typography variant='body1'>{message}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Hủy
        </Button>
        <Button onClick={onConfirm} color='secondary' variant='contained'>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog
