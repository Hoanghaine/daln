import React from 'react'
import {
  CircularProgress,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
} from '@mui/material'
import { useGetDoctorProfileQuery } from '../../../redux/api/api.caller'
import { Swiper, SwiperSlide } from 'swiper/react'
import EditIcon from '@mui/icons-material/Edit'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
// import 'swiper/css/bundle'
const Profile: React.FC = () => {
  const { data, error, isLoading } = useGetDoctorProfileQuery()
  // Hiển thị trạng thái loading
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>Error loading profile</div>
  }

  // Lấy dữ liệu từ response
  const doctorProfile = data?.data

  return (
    <Box sx={{ padding: '16px', display: 'flex', position: 'relative' }}>
      <Button
        variant='contained'
        startIcon={<EditIcon />}
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
        }}
      >
        Sửa thông tin
      </Button>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            justifyContent: 'flex-start',
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
          </Box>
        </Box>
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
        <Box sx={{ marginTop: '16px' }}>
          <Typography variant='h6' gutterBottom fontWeight={'bold'}>
            Certificates
          </Typography>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className='mySwiper'
            style={{
              width: '80%',
              border: '1px solid #ccc',
            }}
          >
            {doctorProfile?.certificates?.slice(0, 3).map((cert, index) => (
              <SwiperSlide key={index}>
                <Box
                  component='img'
                  src={cert}
                  alt={`Certificate ${index}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '300px',
                    objectFit: 'cover',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
