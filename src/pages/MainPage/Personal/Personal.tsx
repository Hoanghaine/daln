import React, { useState } from 'react'
import {
  Box,
  Typography,
  Stack,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Chip,
  Rating,
} from '@mui/material'
import {
  useGetOwnPostsQuery,
  useGetPatientProfileQuery,
  useDeletePostMutation,
  useGetPatientSchedulesQuery,
  useChangePasswordMutation,
  useRateDoctorMutation,
  useChangeStatusScheduleMutation,
} from '../../../redux/api/api.caller'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddPost from '../../MainPage/Forum/AddPost/AddPost'
import ConfirmDeleteDialog from '../../../components/ConfirmDialogs/ConfirmDeleteDialog'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PreviewIcon from '@mui/icons-material/Preview'
import CreateIcon from '@mui/icons-material/Create'
import CloseIcon from '@mui/icons-material/Close'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import { useNavigate } from 'react-router-dom'
import { IPost } from '../../../types/posts'
import EditPostDialog from '../../../components/Post/EditPostDialog'
import { Height } from '@mui/icons-material'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box role='tabpanel' hidden={value !== index} sx={{ padding: 2 }}>
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

export default function Personal() {
  const [editingPost, setEditingPost] = useState<IPost | null>(null)
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null)
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [tabIndex, setTabIndex] = useState(0)
  const [page, setPage] = useState<number>(0)
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
  const [showAddPost, setShowAddPost] = useState(false)
  const [changePassword, { isLoading }] = useChangePasswordMutation()
  const [deletePost] = useDeletePostMutation()
  const [openRatingDialog, setOpenRatingDialog] = useState(false)
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [rating, setRating] = useState<number | null>(null)
  const [review, setReview] = useState<string>('')
  const navigate = useNavigate()
  const {
    data: appointmentsData,
    isLoading: isAppointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useGetPatientSchedulesQuery()

  const {
    data,
    error,
    isLoading: isPatientProfileLoading,
  } = useGetPatientProfileQuery()
  const {
    data: postData,
    isLoading: isPostLoading,
    isError,
    refetch,
  } = useGetOwnPostsQuery({
    page,
    size: 10,
  })
  const [changeStatusSchedule] = useChangeStatusScheduleMutation()
  const [rateDoctor] = useRateDoctorMutation()
  if (isPatientProfileLoading) {
    return <CircularProgress />
  }
  if (isPostLoading) {
    return <CircularProgress />
  }
  if (isPatientProfileLoading || isAppointmentsLoading) {
    return <CircularProgress />
  }

  if (error || appointmentsError) {
    return <div>Error loading profile or appointments</div>
  }
  if (error) {
    return <div>Error loading profile</div>
  }
  const patientProfile = data?.data

  const handleEditPost = (post: IPost) => {
    setEditingPost({ ...post }) // Sao chép dữ liệu của bài viết
  }

  // Khi đóng dialog
  const handleCloseEditDialog = () => {
    setEditingPost(null) // Đảm bảo xóa sạch thông tin khi không cần thiết
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
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleMoveToPost = (postId: number) => {
    navigate(`/forum/${postId}`)
  }
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentPassword === newPassword) {
      toast.error('Không được để mật khẩu mới trùng với mật khẩu cũ!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'top-right',
      })
      return
    }
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
      }).unwrap()
      if (response.data) {
        toast.success('Đổi mật khẩu mới thành công!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'top-right',
        })
        setCurrentPassword('')
        setNewPassword('')
      }
    } catch (error: any) {
      // Kiểm tra phản hồi lỗi từ API
      if (error?.data?.error === 'Invalid password') {
        toast.error('Mật khẩu cũ sai!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'top-right',
        })
      } else {
        toast.error('Không được để mật khẩu mới trùng với mật khẩu cũ!', {
          theme: 'colored',
          autoClose: 2000,
          position: 'top-right',
        })
      }
    }
  }
  const handleOpenRatingDialog = (doctorId: number) => {
    setSelectedDoctorId(doctorId)
    setOpenRatingDialog(true)
  }

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false)
    setRating(null)
    setReview('')
  }
  const handleChangeStatus = async (scheduleId: number, newStatus: string) => {
    try {
      await changeStatusSchedule({
        scheduleId,
        status: newStatus,
      }).unwrap()

      refetchAppointments()
    } catch (err) {
      console.error('Error changing status', err)
    }
  }
  const handleRatingSubmit = async (scheduleId: number) => {
    const feedbackData = {
      doctorId: selectedDoctorId,
      rating: rating || 0,
      review,
    }
    try {
      const response = await rateDoctor(feedbackData)
      console.log(response)
      toast.success('Đánh giá thành công!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right',
      })
      handleChangeStatus(scheduleId, 'COMPLETED')
      handleCloseRatingDialog()
    } catch (error) {
      toast.error('Đánh giá thất bại!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right',
      })
      handleCloseRatingDialog()
    }
  }

  const currentDate = new Date()
  const statusColors = {
    PENDING: '#9e9e9e', // Gray
    CONFIRMED: '#4caf50', // Green
    CANCELLED: '#f44336', // Red
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        display: 'flex',
        gap: '20px',
      }}
    >
      <ToastContainer />
      <Stack
        alignItems='center'
        spacing={2}
        sx={{
          mb: 3,
          height: '100%',
          bgcolor: '#ffff',
          borderRadius: 2,
          width: '20%',
          padding: 3,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          orientation='vertical'
          centered
          sx={{
            width: '100%',
            p: 0,
            mb: 3,
            backgroundColor: '#ffffff',
            borderRadius: 2,
          }}
        >
          <Tab label='Thông tin cá nhân' sx={{ width: '100%' }} />
          <Tab label='Lịch hẹn' />
          <Tab label='Bài viết cá nhân' />
          <Tab label='Đổi mật khẩu' />
        </Tabs>
      </Stack>

      <Box
        sx={{
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: 2,
          height: '100%',
          p: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Tab Content */}
        <TabPanel value={tabIndex} index={0}>
          <Typography variant='h5' sx={{ mb: 3, textAlign: 'center' }}>
            Thông tin cá nhân
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              width: '100%',
              minHeight: '400px',
            }}
          >
            <Box
              component={'img'}
              src={
                patientProfile?.avatar ??
                'https://www.w3schools.com/howto/img_avatar.png'
              } // Placeholder for missing avatar
              sx={{
                width: 200,
                height: 200,
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
            <Stack flexDirection={'row'} gap={3}>
              <Stack flexDirection={'column'}>
                <Typography variant='h6'>
                  <strong>Tên:</strong> {patientProfile?.name}
                </Typography>
                <Typography variant='h6'>
                  <strong>Ngày sinh:</strong> {patientProfile?.dob}
                </Typography>
                <Typography variant='h6'>
                  <strong>Địa chỉ:</strong> {patientProfile?.address}
                </Typography>
              </Stack>

              <Stack flexDirection={'column'}>
                <Typography variant='h6'>
                  <strong>Email:</strong> {patientProfile?.email}
                </Typography>

                <Typography variant='h6'>
                  <strong>Số điện thoại:</strong> {patientProfile?.phone}
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant='contained'
              color='primary'
              startIcon={<EditIcon />}
              sx={{
                alignSelf: 'flex-start',
                justifySelf: 'flex-end',
              }}
            >
              Sửa thông tin
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Box
            sx={{
              minHeight: '400px',
            }}
          >
            <Typography variant='h5' sx={{ mb: 2, textAlign: 'center' }}>
              Lịch hẹn
            </Typography>
            <Stack spacing={2}>
              {appointmentsData?.data.elements.length === 0 ? (
                <Typography>Không có lịch hẹn nào.</Typography>
              ) : (
                appointmentsData?.data.elements.map(
                  (appointment: any, index: number) => {
                    const appointmentDate = new Date(
                      appointment.appointmentDate,
                    )
                    const endDate = new Date(
                      appointmentDate.getTime() + 3 * 60 * 60 * 1000,
                    )
                    return (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: '#ffffff',
                          borderRadius: 2,
                          p: 2,
                          border: `2px solid ${
                            statusColors[
                              appointment.status as keyof typeof statusColors
                            ]
                          }`,
                          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <Stack
                          flexDirection={'row'}
                          alignItems={'center'}
                          gap={2}
                        >
                          <Typography>
                            <strong>Bác sĩ:</strong> {appointment.name}
                          </Typography>
                          <Typography>
                            <strong>Ngày:</strong> {appointment.appointmentDate}
                          </Typography>
                          <Typography>
                            <strong>Ghi chú:</strong> {appointment.notes}
                          </Typography>
                        </Stack>
                        <Typography
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 1,
                          }}
                        >
                          Trạng thái:{' '}
                          <Chip
                            label={appointment.status}
                            sx={{
                              borderRadius: 2,
                              ml: 1,
                              mt: 1,
                              width: '110px',
                              backgroundColor:
                                statusColors[
                                  appointment.status as keyof typeof statusColors
                                ],
                              color: 'white',
                            }}
                          />
                        </Typography>
                        {endDate < currentDate &&
                          appointment.status !== 'COMPLETED' && (
                            <Button
                              startIcon={<ThumbsUpDownIcon />}
                              variant='contained'
                              color='primary'
                              onClick={() =>
                                handleOpenRatingDialog(appointment.userId)
                              }
                              sx={{ mt: 2 }}
                            >
                              Đánh giá bác sĩ
                            </Button>
                          )}
                      </Box>
                    )
                  },
                )
              )}
            </Stack>
            <Dialog open={openRatingDialog} onClose={handleCloseDialog}>
              <DialogTitle>Đánh giá bác sĩ</DialogTitle>
              <DialogContent>
                <Typography component='legend'>Đánh giá</Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  max={5}
                />
                <TextField
                  label='Cảm nhận của bạn'
                  multiline
                  rows={4}
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseRatingDialog} color='secondary'>
                  Hủy
                </Button>
                <Button
                  onClick={() => handleRatingSubmit(selectedDoctorId)}
                  variant='contained'
                  color='primary'
                >
                  Gửi
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Box
            sx={{
              padding: '16px',
              minHeight: '400px',
            }}
          >
            <ToastContainer />
            <ConfirmDeleteDialog
              open={openConfirmDialog}
              onClose={handleCloseConfirmDialog}
              onConfirm={handleDelete}
              title='Xác nhận xóa'
              message='Bạn có chắc chắn muốn xóa bài viết này không? Thao tác này không thể hoàn tác.'
            />

            <Dialog
              open={showAddPost}
              onClose={handleClose}
              maxWidth='sm'
              fullWidth
            >
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

            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              mb={1}
            >
              <Typography variant='h5' mb={2} textAlign={'center'}>
                Bài viết của tôi
              </Typography>
              {postData?.data.elements.length !== 0 ? (
                <Button
                  startIcon={<CreateIcon />}
                  variant='contained'
                  onClick={() => setShowAddPost(true)}
                >
                  Đăng bài viết mới
                </Button>
              ) : (
                ''
              )}
            </Stack>
            {postData?.data.elements.length === 0 ? (
              <Stack
                flexDirection={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={2}
              >
                <Typography>Chưa có bài viết nào</Typography>
                <Button
                  startIcon={<CreateIcon />}
                  variant='contained'
                  onClick={() => setShowAddPost(true)}
                >
                  Tạo bài viết mới ngay
                </Button>
              </Stack>
            ) : (
              <TableContainer
                sx={{
                  borderRadius: '16px',
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
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: 'white',
                        }}
                      >
                        Thumbnail
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: 'white',
                        }}
                      >
                        Tiêu đề
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: 'white',
                        }}
                      >
                        Danh mục
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: 'white',
                        }}
                      >
                        Thời gian tạo
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: 'white',
                        }}
                      ></TableCell>{' '}
                      {/* Empty header for action buttons */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {postData?.data.elements.map(post => (
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
                              onClick={() => handleMoveToPost(post.id)}
                            />
                            <EditIcon
                              sx={{
                                cursor: 'pointer',
                                fontSize: '26px',
                                color: '#65AD45',
                              }}
                              onClick={() => handleEditPost(post)}
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
            )}
            {editingPost && (
              <EditPostDialog
                post={editingPost}
                onClose={handleCloseEditDialog}
                refetch={refetch} // Hàm tải lại dữ liệu sau khi chỉnh sửa
              />
            )}
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
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <Box
            sx={{
              minHeight: '400px',
            }}
          >
            <Typography variant='h5' sx={{ mb: 3, textAlign: 'center' }}>
              Đổi mật khẩu
            </Typography>
            <Stack
              spacing={2}
              component='form'
              onSubmit={handleChangePassword}
              width={'500px'}
              margin={'0 auto'}
            >
              <TextField
                label='Mật khẩu hiện tại'
                type='password'
                variant='outlined'
                fullWidth
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
              <TextField
                label='Mật khẩu mới'
                type='password'
                variant='outlined'
                fullWidth
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                onClick={handleChangePassword}
              >
                Đổi mật khẩu
              </Button>
            </Stack>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  )
}
