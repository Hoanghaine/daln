import React from 'react'
import {
  CircularProgress,
  Box,
  Typography,
  Divider,
  Stack,
  Button,
  Slide,
} from '@mui/material'
import { useGetDoctorProfileQuery } from '../../../redux/api/api.caller'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import EditIcon from '@mui/icons-material/Edit'
import LazyLoading from '../../../components/LazyLoading'
import Slideshow from '../../../components/mainPage/Slideshow'
// import 'swiper/css/bundle'
const Profile = () => {
  const { data, error, isLoading } = useGetDoctorProfileQuery()
  // Hiển thị trạng thái loading
  if (isLoading) {
    ;<LazyLoading />
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return <div>Error loading profile</div>
  }

  // Lấy dữ liệu từ response
  const doctorProfile = data?.data
  console.log(doctorProfile)
  return (
    <Box
      sx={{
        width: '100%',
        padding: '16px',
      }}
    >
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
          <Button variant='contained' startIcon={<EditIcon />} sx={{}}>
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
    </Box>
  )
}

export default Profile
