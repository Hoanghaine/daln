import { useState } from 'react'
import { Box, Button, TextField, Typography, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAddPostMutation } from '../../../../redux/api/api.caller'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CustomizedMenu from './CustomizedMenu'
import useStyles from './AddPost.style'
import Textarea from '@mui/joy/Textarea'
export default function AddPost({
  onAddPostSuccess,
}: {
  onAddPostSuccess: () => void
}) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [tagId, setTagId] = useState<number>(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const [addPost, { isLoading, isSuccess }] = useAddPostMutation()
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] // Get the new file

    // If a file is selected, replace the existing one
    if (file) {
      setImageFile(file) // Update the image file state
      setImagePreview(URL.createObjectURL(file)) // Update the image preview state
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!imageFile) {
      alert('Please upload an image.')
      return
    }

    try {
      const response = await addPost({
        title,
        content,
        tagId,
        image: imageFile,
      }).unwrap()
      if (response) {
        onAddPostSuccess() // Call the callback to refetch posts
      }
    } catch (error) {
      console.error('Failed to add post:', error)
    }
  }
  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('') // Clear image preview when user wants to choose again
  }

  const classes = useStyles()
  return (
    <Box
      sx={{
        margin: '0 auto',
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '8px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            placeholder='Nhập tiêu đề bài viết...'
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            fullWidth
          />
          <Textarea
            placeholder='Viết nội dung bài viết...'
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            minRows={2}
            maxRows={6}
          />

          <CustomizedMenu setTagId={setTagId} />

          <div className={classes.imageSection}>
            <input
              accept='image/*'
              style={{ display: 'none' }}
              id='upload-file-input'
              type='file'
              onChange={handleFileChange}
            />
            <label htmlFor='upload-file-input' className={classes.uploadLabel}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt='Selected'
                  className={classes.selectedImage}
                />
              ) : (
                <div className={classes.uploadPlaceholder}>
                  <CloudUploadIcon sx={{ fontSize: 48, color: '#4E8D7C' }} />
                  <Typography variant='body1' sx={{ marginTop: '8px' }}>
                    Upload Image
                  </Typography>
                </div>
              )}
            </label>
          </div>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Post'}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
