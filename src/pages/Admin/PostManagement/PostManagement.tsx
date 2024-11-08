import React, { useState } from 'react'
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
} from '@mui/material'

const PostManagement = () => {
  // State quản lý bài viết và chi tiết bài viết được chọn
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Tôi cảm thấy rất căng thẳng',
      author: 'Nguyễn Văn A',
      content:
        'Tôi đang gặp phải nhiều áp lực công việc và không biết phải làm gì...',
      date: '2024-11-01',
    },
    {
      id: 2,
      title: 'Con tôi có dấu hiệu tự kỉ',
      author: 'Trần Thị B',
      content: 'Con tôi ít giao tiếp với bạn bè và có nhiều hành vi lạ...',
      date: '2024-11-02',
    },
    // Thêm nhiều bài viết khác ở đây
  ])

  const [selectedPost, setSelectedPost] = useState<Post | null>(null) // Lưu thông tin bài viết được chọn để hiển thị popup

  // Hàm mở popup xem chi tiết
  interface Post {
    id: number
    title: string
    author: string
    content: string
    date: string
  }

  const handleViewPost = (post: Post) => {
    setSelectedPost(post)
  }

  // Hàm đóng popup
  const handleCloseDialog = () => {
    setSelectedPost(null)
  }

  return (
    <Box
      sx={{
        padding: '16px',
      }}
    >
      <Typography variant='h5' mb={2}>
        Quản lý bài viết
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '16px',
          border: '1px solid #e0e0e0',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                Tiêu đề
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                Tác giả
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                Ngày đăng
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map(post => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => handleViewPost(post)}
                  >
                    Xem chi tiết
                  </Button>
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
                <strong>Ngày đăng:</strong> {selectedPost.date}
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
