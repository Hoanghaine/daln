import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'
import {
  useUpdatePostMutation,
  useGetTagsQuery,
} from '../../redux/api/api.caller'
import { IPost } from '../../types/posts'
import 'quill/dist/quill.snow.css' // Or another Quill theme if preferred
import Quill from 'quill'
import { useRef } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import useStyles from '../../pages/MainPage/Forum/AddPost/AddPost.style'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function EditPostDialog({
  post,
  onClose,
  refetch,
}: {
  post: IPost
  onClose: () => void
  refetch: () => void
}) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [tagId, setTagId] = useState(0)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const quillRef = useRef<HTMLDivElement | null>(null) // Ref for Quill container
  const quillInstance = useRef<any>(null) // Store Quill instance
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  const [updatePost] = useUpdatePostMutation()
  const {
    data: tagsData,
    isLoading: isTagsLoading,
    isError,
  } = useGetTagsQuery()
  const isQuillInitialized = useRef(false)

  useEffect(() => {
    console.log('Post:', post)
    if (tagsData) {
      const currentTag = tagsData?.data.elements.filter(
        tag => tag.tagName === post?.tag,
      )
      if (currentTag.length > 0) {
        setTagId(currentTag[0].id)
      }
    }
    setImageFile(null)
    setImagePreview(post.thumbnail)
    const initializeQuill = () => {
      if (quillRef.current && !quillInstance.current) {
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

        quillInstance.current.on('text-change', () => {
          const updatedContent = quillInstance.current.root.innerHTML
          setContent(updatedContent)
        })
      }

      // Đặt nội dung ban đầu
      if (quillInstance.current) {
        quillInstance.current.root.innerHTML = post?.content || ''
      }
    }

    if (isDialogOpen) {
      setTimeout(() => {
        initializeQuill()
      }, 0)
    }

    return () => {
      if (!isDialogOpen && quillInstance.current) {
        console.log('Resetting Quill content')
        quillInstance.current.root.innerHTML = ''
      }
    }
  }, [tagsData, post, isDialogOpen])

  const classes = useStyles()
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file) // Update the image file state
      setImagePreview(URL.createObjectURL(file)) // Update the image preview state
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('tagId', tagId.toString())
    console.log('Image file:', imageFile)
    try {
      const response = await updatePost({
        postId: post.id,
        title,
        content,
        tagId,
        thumbnail: imageFile,
      }).unwrap()
      if (response) {
        toast.success('Tạo bài viết mới thành công!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'bottom-right',
        })
      }
      onClose()
      refetch()
    } catch (error) {
      alert('Cập nhật thất bại, vui lòng thử lại!')
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false)
        onClose()
      }}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '16px',
        }}
      >
        <TextField
          label='Tiêu đề'
          fullWidth
          value={title}
          onChange={e => setTitle(e.target.value)}
          margin='dense'
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
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setIsDialogOpen(false)
            onClose()
          }}
        >
          Hủy
        </Button>
        <Button onClick={handleUpdate} variant='contained' color='primary'>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditPostDialog
