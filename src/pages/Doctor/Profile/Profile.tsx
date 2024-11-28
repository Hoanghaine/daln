import React from 'react'
import {
  CircularProgress,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  Slide,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Dialog,
} from '@mui/material'
import {
  useGetDoctorProfileQuery,
  useUpdateProfileDoctorMutation,
} from '../../../redux/api/api.caller'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import EditIcon from '@mui/icons-material/Edit'
import LazyLoading from '../../../components/LazyLoading'
import { useState } from 'react'
import { get } from 'http'
// import 'swiper/css/bundle'
const Profile = () => {
  const { data, error, isLoading, refetch } = useGetDoctorProfileQuery()
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateProfileDoctorMutation()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [avatar, setAvatar] = useState(null)

  const doctorProfile = data?.data

  // Mở dialog
  const handleOpen = () => {
    setFormData({ ...doctorProfile }) // Khởi tạo form với dữ liệu hiện tại
    setOpen(true)
  }

  // Đóng dialog
  const handleClose = () => setOpen(false)

  // Xử lý thay đổi form
  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Xử lý thay đổi file avatar
  const handleAvatarChange = e => {
    setAvatar(e.target.files[0])
  }

  // Submit form
  const handleSubmit = async () => {
    const updatedFields = { ...formData }
    if (avatar) {
      updatedFields.avatar = avatar
    }

    try {
      const response = await updateProfile(updatedFields).unwrap()
      if (response) {
        toast.success('Cập nhật thông tin thành công!', {
          theme: 'colored',
          autoClose: 3000,
          position: 'top-right',
        })
        const userInfo = localStorage.getItem('userInfo')
        const userInfoObj = userInfo ? JSON.parse(userInfo) : {}

        // Cập nhật avatar vào localStorage
        if (avatar) {
          userInfoObj.avatar = URL.createObjectURL(avatar) // Cập nhật đường dẫn avatar
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfoObj))
        refetch()
        setOpen(false)
      }
    } catch (error) {
      console.error('Lỗi cập nhật:', error)
      alert('Cập nhật thất bại.')
    }
  }

  if (isLoading) return <CircularProgress />
  if (error) return <Typography>Error loading profile</Typography>
  return (
    <Box
      sx={{
        width: '100%',
        padding: '16px',
      }}
    >
      <ToastContainer />

      <Box sx={{ flex: 1 }}>
        <Stack
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              mb: 2,
              gap: 5,
            }}
          >
            <Box
              component={'img'}
              alt={doctorProfile?.name}
              src={doctorProfile?.avatar ?? '/default-avatar.png'} // Placeholder for missing avatar
              sx={{
                width: 250,
                height: 250,
                borderRadius: '8px',
                objectFit: 'cover',
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            />
            <Box>
              <Typography variant='h5'>{doctorProfile?.name}</Typography>
              <Stack
                direction='row'
                spacing={5}
                mt={1}
                sx={{
                  color: '#000',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <Typography variant='body1'>
                    <strong>Chuyên môn:</strong> {doctorProfile?.specialization}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Chức vị:</strong> {doctorProfile?.degree}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Kinh nghiệm:</strong> {doctorProfile?.experience}{' '}
                    years
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Đánh giá:</strong> {doctorProfile?.avgRating}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  <Typography variant='body1'>
                    <strong>Email:</strong> {doctorProfile?.email}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Phone:</strong> {doctorProfile?.phone}
                  </Typography>
                  <Typography variant='body1'>
                    <strong>Địa chỉ:</strong> {doctorProfile?.address}
                  </Typography>
                </Box>
              </Stack>
            </Box>{' '}
          </Box>
          <Button
            variant='contained'
            startIcon={<EditIcon />}
            onClick={handleOpen}
          >
            Sửa thông tin
          </Button>
        </Stack>
        <Divider />
        <Box>
          <Typography variant='h6' fontWeight={'bold'}>
            About me:
          </Typography>
          <Box
            component='div'
            sx={{
              lineHeight: '1.5',
              display: '-webkit-box',
              WebkitLineClamp: 10, // Hiển thị tối đa 3 dòng
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            dangerouslySetInnerHTML={{ __html: doctorProfile?.about ?? '' }}
          />
        </Box>
        <Divider />
        <Box sx={{ marginTop: '16px', width: '100%' }}>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant='h6' gutterBottom fontWeight={'bold'}>
              Certificates
            </Typography>
          </Stack>
          {doctorProfile?.certificates.length === 0 ? (
            <Typography variant='body1'>No certificates yet</Typography>
          ) : (
            <Box
              sx={{
                width: '1200px',
                height: '100%',
                border: '1px solid #ccc',
                position: 'relative',
                margin: 'auto',
              }}
            >
              <Swiper
                pagination={{ dynamicBullets: true }}
                modules={[Pagination, Autoplay]}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: true,
                }}
                className='mySwiper'
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid #ccc',
                }}
              >
                {doctorProfile?.certificates.map((cert, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      component='img'
                      src={cert}
                      alt={`Certificate ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '500px',
                        objectFit: 'cover',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} p={1}>
            <TextField
              label='Tên'
              name='name'
              value={formData.name || ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label='Email'
              name='email'
              value={formData.phone || ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label='Email'
              name='email'
              value={formData.email || ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label='Date of Birth'
              type='date'
              InputLabelProps={{ shrink: true }}
              variant='outlined'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
            />
            <TextField
              label='Địa chỉ'
              name='address'
              value={formData.address || ''}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label='Experience Years'
              type='number'
              variant='outlined'
              name='experienceYears'
              value={formData.experience || ''}
              onChange={handleChange}
            />
            <TextField
              label='Chuyên môn'
              name='specialization'
              value={formData.specialization || ''}
              onChange={handleChange}
              fullWidth
            />
            <Button variant='outlined' component='label'>
              Upload Avatar
              <input type='file' hidden onChange={handleAvatarChange} />
            </Button>
            {avatar && (
              <Typography variant='body2' color='text.secondary'>
                {avatar.name}
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isUpdating}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            disabled={isUpdating}
          >
            {isUpdating ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Profile
