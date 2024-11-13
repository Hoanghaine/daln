import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import AddPost from './AddPost' // Assuming AddPost is the form component you created

const AddPostDialog: React.FC = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      {/* Button to open the AddPost dialog */}
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Add Post
      </Button>

      {/* The dialog containing the AddPost form */}
      <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          {/* AddPost form component */}
          <AddPost onClose={handleClose} />
        </DialogContent>
        <DialogActions>
          {/* Close button for the dialog */}
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddPostDialog
