import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import {
  useAddPostMutation,
  useGetTagsQuery,
} from '../../../../redux/api/api.caller'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import useStyles from './AddPost.style'
import 'quill/dist/quill.snow.css' // Or another Quill theme if preferred
import Quill from 'quill'

import { useEffect, useRef } from 'react'

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
  const quillRef = useRef<HTMLDivElement | null>(null) // Ref for Quill container
  const quillInstance = useRef<any>(null) // Store Quill instance
  const [addPost, { isLoading, isSuccess }] = useAddPostMutation()

  const {
    data: tagsData,
    isLoading: isTagsLoading,
    isError,
  } = useGetTagsQuery()

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
      const quillContent = quillInstance.current?.root.innerHTML
      const response = await addPost({
        title,
        content: quillContent,
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

  const classes = useStyles()
  useEffect(() => {
    if (quillRef.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: 'snow',
        placeholder: 'Viết nội dung bài viết...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      })

      // Set the default content if needed
      quillInstance.current.on('text-change', () => {
        setContent(quillInstance.current.root.innerHTML) // Set content state
      })
    }
  }, [])
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

          <Box>
            <div ref={quillRef} style={{ height: '200px' }} />
          </Box>
          <FormControl fullWidth>
            <InputLabel id='tag-select-label'>Chọn tag</InputLabel>
            <Select
              labelId='tag-select-label'
              id='tag-select'
              value={tagId}
              label='Chọn tag'
              onChange={e => setTagId(Number(e.target.value))}
              required
            >
              {tagsData?.data.elements.map((tag: any) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.tagName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
