import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  Avatar,
  Stack,
} from '@mui/material'
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from '../../../redux/api/api.caller'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LazyLoading from '../../../components/LazyLoading'
import PreviewIcon from '@mui/icons-material/Preview'
import CreateIcon from '@mui/icons-material/Create'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import { IPost } from '../../../types/posts'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddPost from '../../MainPage/Forum/AddPost/AddPost'
import ConfirmDeleteDialog from '../../../components/ConfirmDialogs/ConfirmDeleteDialog'

const PostManagement = () => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)
  const [page, setPage] = useState<number>(0)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [showAddPost, setShowAddPost] = useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const { data, isLoading, isError, refetch } = useGetPostsQuery({
    page,
    size: 10,
  })
  const [deletePost] = useDeletePostMutation()

  if (isLoading) return <LazyLoading />
  if (isError || !data?.data.elements.length) {
    return (
      <Typography variant='h6' color='error'>
        Error fetching posts or no posts available.
      </Typography>
    )
  }

  // Hàm mở popup xem chi tiết
  const handleViewPost = (post: IPost) => {
    setSelectedPost(post)
  }

  // Hàm đóng popup
  const handleCloseDialog = () => {
    setSelectedPost(null)
  }
  const handleOpenConfirmDialog = (postId: number) => {
    setSelectedPostId(postId)
    setOpenConfirmDialog(true)
  }

  // Đóng hộp thoại xác nhận
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
    setSelectedPostId(null)
  }
  const handleDelete = async () => {
    if (selectedPostId) {
      try {
        console.log('selectedPostId', selectedPostId)
        const response = await deletePost(selectedPostId).unwrap()
        if (response.data) {
          toast.success('Xóa bài viết thành công!', {
            theme: 'colored',
            autoClose: 2000,
            position: 'top-right',
          })

          refetch() // Tải lại danh sách bài viết sau khi xóa
        }
      } catch (error) {
        toast.error('Xóa bài viết thất bại!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'top-right',
        })
      } finally {
        handleCloseConfirmDialog() // Đóng hộp thoại sau khi xóa
      }
    }
  }

  const handleAddPostSuccess = () => {
    toast.success('Tạo bài viết mới thành công!', {
      theme: 'colored',
      autoClose: 2000,
      position: 'top-right',
    })
    refetch() // Re-fetch posts after successful addition
    setShowAddPost(false) // Optionally hide AddPost form after submission
  }
  const handleClose = () => {
    setShowAddPost(false) // Close the dialog when "Cancel" is clicked
  }

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box
      sx={{
        padding: '16px',
      }}
    >
      <ToastContainer />
      <ConfirmDeleteDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleDelete}
        title = 'Xác nhận xóa'
        message = 'Bạn có chắc chắn muốn xóa bài viết này không? Thao tác này không thể hoàn tác.'
      />

      <Dialog open={showAddPost} onClose={handleClose} maxWidth='sm' fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderBottom: '1px solid #D6D9DD',
          }}
        >
          <Typography
            variant='h6'
            color='initial'
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Tạo bài viết
          </Typography>
          <CloseIcon
            sx={{
              cursor: 'pointer',
              backgroundColor: '#D6D9DD',
              padding: '2px',
              borderRadius: '50%',
            }}
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <AddPost onAddPostSuccess={handleAddPostSuccess} />
        </DialogContent>
      </Dialog>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5' mb={2}>
          Quản lý bài viết
        </Typography>
        <Button
          startIcon={<CreateIcon />}
          variant='contained'
          onClick={() => setShowAddPost(true)}
        >
          Đăng bài viết mới
        </Button>
      </Stack>
      <TableContainer
        sx={{
          borderRadius: '16px ',
          border: '1px solid #65AD45',
        }}
      >
        <Table>
          <TableHead
            sx={{
              fontWeight: 'bold',
              backgroundColor: '#65AD45',
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                Thumbnail
              </TableCell>
              <TableCell
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                Tiêu đề
              </TableCell>
              <TableCell
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                Danh mục
              </TableCell>
              <TableCell
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '16px',
                }}
              >
                Thời gian tạo
              </TableCell>
              <TableCell
                sx={{
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: 'white',
                  fontSize: '16px',
                }}
              ></TableCell>{' '}
              {/* Empty header for action buttons */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.elements.map(post => (
              <TableRow key={post.id}>
                <TableCell>
                  <Avatar
                    src={post.thumbnail}
                    variant='square'
                    sx={{ width: 100, height: 70 }}
                  />
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.tag}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Box display='flex' flexDirection='column' gap={1}>
                    <PreviewIcon
                      sx={{
                        cursor: 'pointer',
                        fontSize: '26px',
                        color: '#65AD45',
                      }}
                      onClick={() => handleViewPost(post)}
                    />

                    <DeleteIcon
                      sx={{
                        cursor: 'pointer',
                        fontSize: '26px',
                        color: 'red',
                      }}
                      onClick={() => handleOpenConfirmDialog(post.id)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup xem chi tiết bài viết */}
      <Dialog open={!!selectedPost} onClose={handleCloseDialog}>
        <DialogTitle>Chi tiết bài viết</DialogTitle>
        <DialogContent>
          {selectedPost && (
            <div>
              <DialogContentText>
                <strong>Tiêu đề:</strong> {selectedPost.title}
              </DialogContentText>
              <DialogContentText>
                <strong>Tác giả:</strong> {selectedPost.author}
              </DialogContentText>
              <DialogContentText>
                <strong>Nội dung:</strong> {selectedPost.content}
              </DialogContentText>
              <DialogContentText>
                <strong>Ngày đăng:</strong>{' '}
                {new Date(selectedPost.createdAt).toLocaleDateString()}
              </DialogContentText>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PostManagement
